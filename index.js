const {
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

    // ✅ Check Prefix
    if (!msg.startsWith(customPrefix)) return;
    const cmd = msg.slice(customPrefix.length).trim().split(" ")[0].toLowerCase();

    // ✅ Commands
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
║🤖  ${customPrefix}ai <text>
║📛  ${customPrefix}bug <target>
╚═══════════════════════
🔒 *Bot by ${watermark}*
        `.trim();
        await sock.sendMessage(from, { text: menu }, { quoted: m });
        break;

      // Add more commands below
    }
  });

  // ✅ Reconnect if disconnected
  sock.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === "close") {
      const shouldReconnect =
        lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
      console.log("⛔ Disconnected. Reconnecting:", shouldReconnect);
      if (shouldReconnect) startBot();
    } else if (connection === "open") {
      console.log("✅ Bot is online");
    }
  });
}

// ✅ Run the bot
startBot();