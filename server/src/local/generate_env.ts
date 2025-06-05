import crypto from "node:crypto";
import fs from "node:fs/promises";
import { generateIV } from "./generate_iv";

async function generateENV() {
	const hash_iv = generateIV();
	let partial = "ODS/AUTH" + hash_iv;
	const hash_key = crypto.hash("sha256", partial);
	partial = "ODS/JWT" + hash_iv;
	const jwt_secret = crypto.hash("sha256", partial);
	const mode = "DEVELOPMENT";
	const cors_origin = "http://localhost:3000";
	const email_host = "mail.mackenziebowes.com";
	const email_user = "mackenzie";
	const email_password = "null";
	const telegram_token = "YOUR_TELEGRAM_BOT_TOKEN"; // Replace with your Telegram bot token
	const telegram_bot_username = "YOUR_TELEGRAM_BOT_USERNAME"; // Replace with your Telegram bot username

	const envContent = `
HASH_KEY="${hash_key}"
HASH_IV="${hash_iv}"
JWT_SECRET="${jwt_secret}"
MODE="${mode}"
CORS_ORIGIN="${cors_origin}"
EMAIL_HOST="${email_host}"
EMAIL_USER="${email_user}"
EMAIL_PASSWORD="${email_password}"
TELEGRAM_TOKEN="${telegram_token}"
TELEGRAM_BOT_USERNAME="${telegram_bot_username}"
`.trim();

	await fs.writeFile(".env.generated", envContent, "utf8");
}

generateENV();