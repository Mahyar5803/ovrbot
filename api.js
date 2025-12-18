// این فایل برای اجرا در GitHub Pages نیست
// برای اجرای ربات تلگرام در سرویس‌های دیگر استفاده می‌شود

// Telegram Bot API endpoint
const TELEGRAM_API = `https://api.telegram.org/bot${process.env.BOT_TOKEN}`;

// GitHub Pages URL
const OCR_PAGE_URL = "https://YOUR_USERNAME.github.io/telegram-ocr-bot";

async function sendMessage(chatId, text) {
    const response = await fetch(`${TELEGRAM_API}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: chatId,
            text: text,
            parse_mode: 'HTML'
        })
    });
    return await response.json();
}

// Webhook handler
export default {
    async fetch(request, env) {
        if (request.method === 'POST') {
            const update = await request.json();
            const message = update.message;
            
            if (!message) return new Response('OK');
            
            const chatId = message.chat.id;
            const text = message.text || '';
            
            if (text === '/start' || text === '/help') {
                await sendMessage(chatId,
                    `👋 <b>به ربات OCR فارسی خوش آمدید!</b>\n\n`
                    + `📸 <b>نحوه استفاده:</b>\n`
                    + `1. این لینک را در مرورگر باز کنید:\n`
                    + `<code>${OCR_PAGE_URL}</code>\n\n`
                    + `2. در آن صفحه:\n`
                    + `   • عکس خود را آپلود کنید\n`
                    + `   • یا با دوربین عکس بگیرید\n`
                    + `   • روی "شروع استخراج متن" کلیک کنید\n\n`
                    + `3. متن استخراج شده را کپی کنید\n\n`
                    + `🎯 <b>ویژگی‌ها:</b>\n`
                    + `• کاملاً رایگان 🆓\n`
                    + `• بدون نیاز به API 🔓\n`
                    + `• پردازش در مرورگر شما 🌐\n`
                    + `• پشتیبانی از فارسی و انگلیسی 🇮🇷🇬🇧\n\n`
                    + `<i>لینک: ${OCR_PAGE_URL}</i>`
                );
            }
            
            if (message.photo) {
                await sendMessage(chatId,
                    `📸 <b>عکس دریافت شد!</b>\n\n`
                    + `متأسفانه ربات نمی‌تواند عکس‌ها را مستقیماً پردازش کند.\n\n`
                    + `📌 <b>لطفاً این کارها را انجام دهید:</b>\n`
                    + `1. عکس را در گالری خود ذخیره کنید\n`
                    + `2. به این لینک بروید:\n`
                    + `<code>${OCR_PAGE_URL}</code>\n`
                    + `3. عکس را آپلود و پردازش کنید\n\n`
                    + `🔧 <b>دلیل:</b> این ربات کاملاً رایگان است و برای پردازش عکس‌ها نیاز به سرور ندارد.`
                );
            }
            
            return new Response('OK');
        }
        
        // For GET requests, redirect to GitHub Pages
        return Response.redirect(OCR_PAGE_URL, 302);
    }
}
