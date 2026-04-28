const http = require('http');
const fs = require('fs');
const path = require('path');
const https = require('https');

const PORT = 3000;
const PUBLIC_DIR = '/home/z/my-project/public';
const TELEGRAM_TOKEN = '8345021383:AAFhAMfb-TDK3dc4nGsagl-IyXqW9wPjHMo';

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
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

// Serve static file
function serveStatic(filePath, res) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';
  
  fs.readFile(filePath, (err, content) => {
    if (err) {
      console.log('File not found:', filePath);
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    } else {
      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': 'no-cache'
      });
      res.end(content);
    }
  });
}

// Telegram API
async function getChatIds() {
  return new Promise((resolve) => {
    https.get(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/getUpdates`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (!parsed.ok) return resolve([]);
          const ids = new Set();
          (parsed.result || []).forEach(u => {
            if (u.message?.chat?.id) ids.add(u.message.chat.id);
          });
          resolve([...ids]);
        } catch (e) {
          resolve([]);
        }
      });
    }).on('error', () => resolve([]));
  });
}

async function sendTelegram(chatId, text) {
  return new Promise((resolve) => {
    const body = JSON.stringify({ chat_id: chatId, text: text, parse_mode: 'HTML' });
    const req = https.request({
      hostname: 'api.telegram.org',
      port: 443,
      path: `/bot${TELEGRAM_TOKEN}/sendMessage`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data).ok); } catch { resolve(false); }
      });
    });
    req.on('error', () => resolve(false));
    req.write(body);
    req.end();
  });
}

// Handle contact form
async function handleContact(req, res) {
  let body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', async () => {
    try {
      const data = JSON.parse(body);
      const { name, email, message } = data;
      
      if (!name || !email || !message) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Заполните все поля' }));
      }
      
      const chatIds = await getChatIds();
      if (chatIds.length === 0) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Сначала отправьте /start боту в Telegram' }));
      }
      
      const msg = `<b>Новое сообщение с сайта Century Intelligence</b>\n\n<b>Имя:</b> ${name}\n<b>Email:</b> ${email}\n<b>Сообщение:</b>\n${message}`;
      
      const results = await Promise.all(chatIds.map(id => sendTelegram(id, msg)));
      const success = results.filter(Boolean).length;
      
      if (success > 0) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, message: `Отправлено ${success} получателю(ям)` }));
      } else {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Ошибка отправки' }));
      }
    } catch (e) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Ошибка сервера' }));
    }
  });
}

// Create server
const server = http.createServer((req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    
    // API routes
    if (url.pathname === '/api/contact') {
      if (req.method === 'POST') return handleContact(req, res);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ message: 'Use POST' }));
    }
    
    // Static files
    let filePath = path.join(PUBLIC_DIR, url.pathname === '/' ? '/index.html' : url.pathname);
    serveStatic(filePath, res);
  } catch (err) {
    console.error('Request error:', err);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Server Error');
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

// Keep process alive
process.stdin.resume();

process.on('uncaughtException', (err) => console.error('Error:', err));
process.on('unhandledRejection', (err) => console.error('Rejection:', err));
