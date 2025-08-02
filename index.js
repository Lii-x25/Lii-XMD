""const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
  makeCacheableSignalKeyStore,
  delay,
} = require("@whiskeysockets/baileys");

const P = require("pino");
const fs = require("fs");
const figlet = require("figlet");
const axios = require("axios");
const ytdl = require("ytdl-core");
const { exec } = require("child_process");

// ✅ Settings
const customPrefix = process.env.PREFIX || ".";
const watermark = "KEL_LI⁰⁰⁷";

// ✅ Print ASCII Logo
console.log(
  figlet.textSync("Łii-MD", {
    font: "Slant",
    horizontalLayout: "default",
    verticalLayout: "default",
  })
);

// ✅ Main Function
async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState("auth");
  const { version } = await fetchLatestBaileysVersion();

  const sock = makeWASocket({
    version,
    auth: {
      creds: state.creds,
      keys: makeCacheableSignalKeyStore(state.keys, P().info),
    },
    printQRInTerminal: true,
    logger: P({ level: "silent" }),
    markOnlineOnConnect: true,
  });

  sock.ev.on("creds.update", saveCreds);

  // ✅ Message Event
  sock.ev.on("messages.upsert", async ({ messages }) => {
    const m = messages[0];
    if (!m.message || m.key && m.key.remoteJid === "status@broadcast") return;

    const from = m.key.remoteJid;
    const msg = m.message.conversation || m.message.extendedTextMessage?.text || "";
    const sender = m.key.participant || m.key.remoteJid;

    if (!msg.startsWith(customPrefix)) return;
    const args = msg.slice(customPrefix.length).trim().split(" ");
    const cmd = args.shift().toLowerCase();

    switch (cmd) {
      case "menu":
        const menu = `
╔══⧉ *Łii-MD Hacker Menu* ⧉══
║⚡  ${customPrefix}menu
║🔐  ${customPrefix}antidelete
║🎵  ${customPrefix}play <song>
║🎬  ${customPrefix}ytmp4 <url>
║📸  ${customPrefix}sticker
║👁️‍🗨️  ${customPrefix}antiviewonce
║🛡️  ${customPrefix}antiban
║🔧  ${customPrefix}group-protect
║📶  ${customPrefix}offline
║📤  ${customPrefix}forward <numbers> (reply to msg)
║🤖  ${customPrefix}ai <text>
║📛  ${customPrefix}bug <target>
╚═══════════════════════
🔒 *Bot by ${watermark}*`.trim();
        await sock.sendMessage(from, { text: menu }, { quoted: m });
        break;

      case "play": {
        if (!args[0]) return sock.sendMessage(from, { text: "Enter song name" }, { quoted: m });
        let song = args.join(" ");
        // Simulated response for demonstration
        await sock.sendMessage(from, { text: `Downloading: ${song}` }, { quoted: m });
        break;
      }

      case "ytmp4": {
        if (!args[0]) return sock.sendMessage(from, { text: "Enter YouTube URL" }, { quoted: m });
        const url = args[0];
        if (!ytdl.validateURL(url)) return sock.sendMessage(from, { text: "Invalid URL" }, { quoted: m });
        const info = await ytdl.getInfo(url);
        const format = ytdl.chooseFormat(info.formats, { quality: "18" });
        await sock.sendMessage(from, { video: { url: format.url }, caption: info.videoDetails.title }, { quoted: m });
        break;
      }

      case "forward": {
        if (!m.message.extendedTextMessage?.contextInfo?.quotedMessage) return sock.sendMessage(from, { text: "Reply to a message you want to forward." }, { quoted: m });
        const quoted = m.message.extendedTextMessage.contextInfo.quotedMessage;
        const numbers = args.join("").split(/,|\s+/).filter(Boolean);
        if (numbers.length === 0) return sock.sendMessage(from, { text: "Provide numbers separated by commas or space." }, { quoted: m });
        for (const num of numbers) {
          const jid = num.includes("@s.whatsapp.net") ? num : `${num}@s.whatsapp.net`;
          try {
            await sock.sendMessage(jid, quoted);
            await delay(1000); // Delay to mimic human behavior
          } catch (e) {
            console.log("❌ Error forwarding to:", jid, e);
          }
        }
        await sock.sendMessage(from, { text: `✅ Forwarded to ${numbers.length} numbers` }, { quoted: m });
        break;
      }

      // Add your other features similarly like anti-delete, view-once, bug command, ai, etc.
    }
  });

  sock.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === "close") {
      const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
      console.log("⛔ Disconnected. Reconnecting:", shouldReconnect);
      if (shouldReconnect) startBot();
    } else if (connection === "open") {
      console.log("✅ Bot is online");
    }
  });
}

startBot();
