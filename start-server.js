const http = require('http');
const fs = require('fs');
const path = require('path');
const https = require('https');

const PORT = 3000;
const PUBLIC_DIR = '/home/z/my-project/public';

const TELEGRAM_BOT_TOKEN = '8345021383:AAFhAMfb-TDK3dc4nGsagl-IyXqW9wPjHMo';

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
};

// Telegram API functions
async function getTelegramChatIds() {
  return new Promise((resolve, reject) => {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getUpdates`;
    
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (!parsed.ok) {
            console.error('Telegram API error:', parsed);
            resolve([]);
            return;
          }
          
          const updates = parsed.result || [];
          const chatIds = new Set();
          
          updates.forEach(update => {
            if (update.message?.chat?.id) {
              chatIds.add(update.message.chat.id);
            }
          });
          
          resolve(Array.from(chatIds));
        } catch (e) {
          console.error('Error parsing Telegram response:', e);
          resolve([]);
        }
      });
    }).on('error', (e) => {
      console.error('Error fetching chat IDs:', e);
      resolve([]);
    });
  });
}

async function sendTelegramMessage(chatId, text) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      chat_id: chatId,
      text: text,
      parse_mode: 'HTML'
    });
    
    const options = {
      hostname: 'api.telegram.org',
      port: 443,
      path: `/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };
    
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve(parsed.ok);
        } catch (e) {
          resolve(false);
        }
      });
    });
    
    req.on('error', (e) => {
      console.error(`Error sending to chat ${chatId}:`, e);
      resolve(false);
    });
    
    req.write(postData);
    req.end();
  });
}

async function handleContactForm(req, res) {
  let body = '';
  
  req.on('data', chunk => {
    body += chunk.toString();
  });
  
  req.on('end', async () => {
    try {
      const data = JSON.parse(body);
      const { name, email, message } = data;
      
      if (!name || !email || !message) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Все поля обязательны для заполнения' }));
        return;
      }
      
      // Get all chat IDs
      const chatIds = await getTelegramChatIds();
      
      if (chatIds.length === 0) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Нет пользователей, запустивших бота. Сначала отправьте /start боту в Telegram.' }));
        return;
      }
      
      // Format message
      const telegramMessage = `
<b>Новое сообщение с сайта Century Intelligence</b>

<b>Имя:</b> ${name}
<b>Email:</b> ${email}
<b>Сообщение:</b>
${message}
      `.trim();
      
      // Send to all chats
      const results = await Promise.all(
        chatIds.map(chatId => sendTelegramMessage(chatId, telegramMessage))
      );
      
      const successCount = results.filter(Boolean).length;
      const failCount = results.length - successCount;
      
      if (successCount > 0) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: true,
          message: `Сообщение отправлено ${successCount} получателю(ям)${failCount > 0 ? `, не удалось отправить ${failCount}` : ''}`
        }));
      } else {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Не удалось отправить сообщение' }));
      }
    } catch (e) {
      console.error('Contact form error:', e);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Внутренняя ошибка сервера' }));
    }
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  
  // Handle API routes
  if (url.pathname === '/api/contact' && req.method === 'POST') {
    return handleContactForm(req, res);
  }
  
  if (url.pathname === '/api/contact' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Contact API endpoint. Use POST to submit form data.' }));
    return;
  }
  
  // Serve static files
  let filePath = path.join(PUBLIC_DIR, url.pathname === '/' ? '/index.html' : url.pathname);
  
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';
  
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404);
        res.end('File not found');
      } else {
        res.writeHead(500);
        res.end('Server error');
      }
    } else {
      res.writeHead(200, { 
        'Content-Type': contentType,
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      });
      res.end(content);
    }
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${PORT}/`);
  console.log(`Telegram bot integration active`);
});

// Handle errors
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
