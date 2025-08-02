🧠 Łii-MD - Advanced WhatsApp Multi-Device Bot

A stealth WhatsApp bot featuring antiban, anti-delete, media downloader, AI capabilities, and unlimited message forwarding with a hacker-style animated menu.


---

🚀 Features

✅ Unlimited message forwarding (even to unsaved contacts)

🛡️ Group unban and antiban fooling WhatsApp’s detection

🕵️ Anti-delete messages & statuses

🎬 YouTube video downloader

🎵 Music playback (via play command)

👁️‍🗨️ Anti view-once (status and chats)

🧠 GPT-4 / DeepSeek / Veo3 AI model integration

🧾 Hacker-themed animated menu

🛠️ Group protection tools

🤖 Offline mode simulation

📱 Customizable prefix (default: ".")

🔐 Remote relinking via phone number (Baileys-based)



---

📦 Installation

Requirements

Node.js 18+

Git

A WhatsApp number


1. Clone the project

git clone https://github.com/your-username/Lii-MD
cd Lii-MD

2. Install dependencies

npm install


---

⚙️ Configuration

Create a .env file or edit the default in index.js:

PREFIX=.
WATERMARK=KEL_LI⁰⁰⁷


---

▶️ Run the Bot Locally

node index.js

A QR code will appear in the terminal (first-time login). For remote relinking via phone number, follow Baileys’ linked device pairing guide.


---

📤 Deploy Options

🌐 Deploy to Bothosting.net

> Upload the entire bot folder into their panel, configure your panel to run npm install && node index.js.



☁️ Deploy to Heroku

1. Create heroku.yml file (already provided)


2. Create app on Heroku


3. Enable container buildpacks


4. Push via Git or connect GitHub repo



🐳 Deploy with Docker

docker build -t lii-md .
docker run -it lii-md


---

🧩 Commands Menu

Use .menu (or your custom prefix):

╔══⧉ Łii-MD Hacker Menu ⧉══
║⚡  .menu
║🔐  .antidelete
║🎵  .play <song>
║🎬  .ytmp4 <url>
║📸  .sticker
║👁️‍🗨️  .antiviewonce
║🛡️  .antiban
║🔧  .group-protect
║📶  .offline
║🤖  .ai <text>
║📛  .bug <target>
╚═══════════════════════
🔒 Bot by KEL_LI⁰⁰⁷


---

🤝 Credits

Baileys Library by @adiwajshing

OpenAI, DeepSeek, Veo3 APIs (for AI integrations)

UI Inspired by hacking terminal themes

