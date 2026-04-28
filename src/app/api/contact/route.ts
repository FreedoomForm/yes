import { NextResponse } from "next/server";

const TELEGRAM_BOT_TOKEN = "8345021383:AAFhAMfb-TDK3dc4nGsagl-IyXqW9wPjHMo";

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
  email: string;
  message: string;
}

async function getTelegramChatIds(): Promise<number[]> {
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
      return [];
    }

    const updates: TelegramUpdate[] = data.result || [];
    const chatIds = new Set<number>();

    updates.forEach((update) => {
      if (update.message?.chat?.id) {
        chatIds.add(update.message.chat.id);
      }
    });

    return Array.from(chatIds);
  } catch (error) {
    console.error("Error fetching chat IDs:", error);
    return [];
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

    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Все поля обязательны для заполнения" },
        { status: 400 }
      );
    }

    // Get all chat IDs of users who have started the bot
    const chatIds = await getTelegramChatIds();

    if (chatIds.length === 0) {
      return NextResponse.json(
        { error: "Нет пользователей, запустивших бота" },
        { status: 400 }
      );
    }

    // Format message for Telegram
    const telegramMessage = `
<b>Новое сообщение с сайта Century Intelligence</b>

<b>Имя:</b> ${name}
<b>Email:</b> ${email}
<b>Сообщение:</b>
${message}
    `.trim();

    // Send message to all chat IDs
    const results = await Promise.all(
      chatIds.map((chatId) => sendTelegramMessage(chatId, telegramMessage))
    );

    const successCount = results.filter(Boolean).length;
    const failCount = results.length - successCount;

    if (successCount > 0) {
      return NextResponse.json({
        success: true,
        message: `Сообщение отправлено ${successCount} получателю(ям)${failCount > 0 ? `, не удалось отправить ${failCount}` : ""}`,
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
  return NextResponse.json({
    message: "Contact API endpoint. Use POST to submit form data.",
  });
}
