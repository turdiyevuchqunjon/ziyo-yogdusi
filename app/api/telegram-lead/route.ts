// app/api/telegram-lead/route.ts
import type { NextRequest } from "next/server";

type LeadBody = {
  fullName?: unknown;
  phone?: unknown;
  source?: unknown;
  note?: unknown;
};

function getErrorMessage(e: unknown): string {
  if (e instanceof Error) return e.message;
  if (typeof e === "string") return e;
  try {
    return JSON.stringify(e);
  } catch {
    return "Telegram route xatosi";
  }
}

function asString(v: unknown): string {
  return typeof v === "string" ? v : "";
}

function escapeHtml(s: string): string {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

export async function POST(req: NextRequest) {
  try {
    const raw = (await req.json().catch(() => ({}))) as LeadBody;

    const fullName = asString(raw.fullName);
    const phone = asString(raw.phone);
    const source = asString(raw.source);
    const note = asString(raw.note);

    const token = process.env.TELEGRAM_BOT_TOKEN ?? "";
    const chatId = process.env.TELEGRAM_CHAT_ID ?? "";
    const threadIdStr = process.env.TELEGRAM_THREAD_ID ?? ""; // ixtiyoriy

    if (!token || !chatId) {
      return new Response("TELEGRAM_BOT_TOKEN yoki TELEGRAM_CHAT_ID topilmadi.", {
        status: 500,
      });
    }

    const time = new Date().toLocaleString("uz-UZ");

    const text =
      `<b>🆕 Yangi lead</b>\n` +
      `👤 <b>Ism:</b> ${escapeHtml(fullName)}\n` +
      `📞 <b>Telefon:</b> ${escapeHtml(phone)}\n` +
      (source ? `🔗 <b>Source:</b> ${escapeHtml(source)}\n` : "") +
      (note ? `🗒️ <b>Izoh:</b> ${escapeHtml(note)}\n` : "") +
      `⏱️ <b>Vaqt:</b> ${escapeHtml(time)}`;

    const payload: Record<string, unknown> = {
      chat_id: chatId,
      text,
      parse_mode: "HTML",
      disable_web_page_preview: true,
    };

    if (threadIdStr) {
      const threadId = Number(threadIdStr);
      if (Number.isFinite(threadId) && threadId > 0) {
        payload.message_thread_id = threadId;
      }
    }

    const tg = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!tg.ok) {
      const err = await tg.text().catch(() => "");
      return new Response(`Telegram xatosi: ${err}`, { status: 502 });
    }

    return new Response("ok", { status: 200 });
  } catch (e: unknown) {
    return new Response(getErrorMessage(e), { status: 500 });
  }
}
