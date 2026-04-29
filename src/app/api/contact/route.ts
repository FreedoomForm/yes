import { NextResponse } from "next/server";
import fs from 'fs';
import path from 'path';

const TELEGRAM_BOT_TOKEN = "8345021383:AAFhAMfb-TDK3dc4nGsagl-IyXqW9wPjHMo";
const CHAT_IDS_FILE = path.join(process.cwd(), 'chat_ids.json');

interface TelegramUpdate {
  update_id: number;
  message?: {
    chat: {
      id: number;
      type: string;
    };
    from?: {
      id: number;
      is_bot: boolean;
      first_name: string;
    };
    text?: string;
  };
}

interface FormData {
  name: string;
  phone: string;
  message: string;
}

// Read saved chat IDs from file
function getSavedChatIds(): number[] {
  try {
    if (fs.existsSync(CHAT_IDS_FILE)) {
      const data = fs.readFileSync(CHAT_IDS_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error("Error reading chat IDs file:", error);
  }
  return [];
}

// Save chat IDs to file
function saveChatIds(chatIds: number[]): void {
  try {
    fs.writeFileSync(CHAT_IDS_FILE, JSON.stringify(chatIds, null, 2));
  } catch (error) {
    console.error("Error saving chat IDs file:", error);
  }
}

// Get chat IDs from Telegram API and save them
async function fetchAndSaveChatIds(): Promise<number[]> {
  try {
    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getUpdates`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (!data.ok) {
      console.error("Telegram API error:", data);
      return getSavedChatIds();
    }

    const updates: TelegramUpdate[] = data.result || [];
    const newChatIds = new Set<number>();

    updates.forEach((update) => {
      if (update.message?.chat?.id) {
        newChatIds.add(update.message.chat.id);
      }
    });

    // Merge with saved chat IDs
    const savedIds = getSavedChatIds();
    const allIds = new Set([...savedIds, ...Array.from(newChatIds)]);
    const finalIds = Array.from(allIds);

    // Save if we have new IDs
    if (finalIds.length > 0) {
      saveChatIds(finalIds);
    }

    return finalIds;
  } catch (error) {
    console.error("Error fetching chat IDs:", error);
    return getSavedChatIds();
  }
}

async function sendTelegramMessage(
  chatId: number,
  text: string
): Promise<boolean> {
  try {
    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: text,
          parse_mode: "HTML",
        }),
      }
    );

    const data = await response.json();
    return data.ok;
  } catch (error) {
    console.error(`Error sending to chat ${chatId}:`, error);
    return false;
  }
}

export async function POST(request: Request) {
  try {
    const body: FormData = await request.json();

    const { name, phone, message } = body;

    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: "Все поля обязательны для заполнения" },
        { status: 400 }
      );
    }

    // Get chat IDs (from API + saved)
    const chatIds = await fetchAndSaveChatIds();

    if (chatIds.length === 0) {
      return NextResponse.json(
        { error: "Сначала отправьте /start боту в Telegram" },
        { status: 400 }
      );
    }

    // Format message for Telegram
    const telegramMessage = `
<b>Новое сообщение с сайта Century Intelligence</b>

<b>Имя:</b> ${name}
<b>Телефон:</b> ${phone}
<b>Сообщение:</b>
${message}
    `.trim();

    // Send message to all chat IDs
    const results = await Promise.all(
      chatIds.map((chatId) => sendTelegramMessage(chatId, telegramMessage))
    );

    const successCount = results.filter(Boolean).length;

    if (successCount > 0) {
      return NextResponse.json({
        success: true,
      });
    } else {
      return NextResponse.json(
        { error: "Не удалось отправить сообщение" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Внутренняя ошибка сервера" },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Refresh chat IDs when GET is called
  const chatIds = await fetchAndSaveChatIds();
  return NextResponse.json({
    message: "Contact API endpoint. Use POST to submit form data.",
    chatIdsCount: chatIds.length,
  });
}
