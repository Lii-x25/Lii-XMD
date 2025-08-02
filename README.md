Łii-MD WhatsApp Bot by KEL_LI⁰⁰⁷

A powerful WhatsApp automation bot featuring:

✅ Anti-ban / stealth features

🧠 Integrated AI models (GPT-4, DeepSeek, Veo3)

🔥 Anti-delete (status, messages, view-once)

🎧 Play YouTube songs

📽 Download YouTube videos

🔐 Offline mode / Fake crash

🛡️ Group protection simulation

💬 Custom command prefix

🧪 Hacker-themed menu

🟢 Always-on with auto-relink support

---

🚀 SETUP GUIDE

🔧 Requirements

Node.js 18+

Git

PM2 (or Heroku/Docker/Bothosting)

Baileys library

📥 Installation

git clone https://github.com/yourname/lii-md-bot.git
cd lii-md-bot
npm install

🧠 AI Keys (Optional)

Create a .env file for API keys:

OPENAI_API_KEY=your_openai_key
DEEPSEEK_API_KEY=your_deepseek_key
VEO3_API_KEY=your_veo3_key

▶️ Run the bot

node index.js

♻️ With PM2 / Bothosting Panel

npm install pm2 -g
pm2 start apps.json

---

🔐 How to Link to WhatsApp

1. Run node index.js

2. Open WhatsApp > Linked Devices > Scan QR (auto-generated in terminal)

> ⚠️ Currently, Baileys only supports QR linking. Phone-number linking is not supported.

---

☁️ Deploying Anywhere

💜 Deploy to Heroku

heroku create
git push heroku main

Ensure heroku.yml and Dockerfile exist.

🐳 Deploy via Docker

docker build -t lii-md .
docker run -d lii-md

---

📞 Custom Commands

!ping – check bot is alive

!fwd <jid> <msg> – stealth forward

!offline – fake offline mode

!kill – simulate bot crash

!play <song> – play audio

!yt <video> – download video

!menu – show all commands

---