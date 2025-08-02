// Łii-MD - WhatsApp Bot with Phone Number Login // Author: KEL_LI⁰⁰⁷

const { default: makeWASocket, useMultiFileAuthState, makeCacheableSignalKeyStore, fetchLatestBaileysVersion, generateRegistrationOptions, registerUser, DisconnectReason } = require('@whiskeysockets/baileys');

const readline = require('readline'); const fs = require('fs'); const P = require('pino'); const figlet = require('figlet');

const customPrefix = process.env.PREFIX || '.'; const watermark = 'KEL_LI⁰⁰⁷';

function askQuestion(query) { const rl = readline.createInterface({ input: process.stdin, output: process.stdout }); return new Promise(resolve => rl.question(query, ans => { rl.close(); resolve(ans.trim()); })); }

async function startBot() { const { state, saveCreds } = await useMultiFileAuthState('auth'); const { version } = await fetchLatestBaileysVersion();

const sock = makeWASocket({ version, printQRInTerminal: true, auth: { creds: state.creds, keys: makeCacheableSignalKeyStore(state.keys, P().info) }, logger: P({ level: 'silent' }), markOnlineOnConnect: true });

if (!fs.existsSync('./auth/creds.json')) { const phone = await askQuestion('📱 Enter your phone number (with country code): '); const reg = await generateRegistrationOptions(phone, { defaultMcc: '639', defaultMnc: '01' });

console.log('🔐 Choose verification method:\n1. SMS\n2. Voice');
const method = await askQuestion('🔢 Enter 1 or 2: ');
const type = method === '1' ? 'sms' : 'voice';
await reg.sendCode(type);
const code = await askQuestion(`🔐 Enter OTP received via ${type}: `);
await reg.register(code);
await saveCreds();
console.log('✅ Phone paired successfully.');

}

sock.ev.on('creds.update', saveCreds);

sock.ev.on('messages.upsert', async ({ messages }) => { const m = messages[0]; if (!m.message || (m.key && m.key.remoteJid === 'status@broadcast')) return;

const from = m.key.remoteJid;
const msg = m.message.conversation || m.message.extendedTextMessage?.text || '';
if (!msg.startsWith(customPrefix)) return;

const cmd = msg.slice(customPrefix.length).trim().split(' ')[0].toLowerCase();

switch (cmd) {
  case 'menu':
    const menu = `

╔══⧉ Łii-MD Hacker Menu ⧉══ ║⚡  ${customPrefix}menu ║🤖  ${customPrefix}ai <text> ║🛡️  ${customPrefix}antiban ║📛  ${customPrefix}bug <target> ╚═══════════════════════ 🔒 Bot by ${watermark} `.trim(); await sock.sendMessage(from, { text: menu }, { quoted: m }); break; } });

sock.ev.on('connection.update', async (update) => { const { connection, lastDisconnect } = update; if (connection === 'close') { const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut; console.log('❌ Disconnected. Reconnecting:', shouldReconnect); if (shouldReconnect) startBot(); } else if (connection === 'open') { console.log('✅ Bot is online'); } }); }

console.log(figlet.textSync('Łii-MD', { font: 'Slant' })); startBot();

