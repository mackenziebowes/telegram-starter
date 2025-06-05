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
	const discord_token = "YOUR_DISCORD_BOT_TOKEN"; // Replace with your Discord bot token
	const discord_client_id = "YOUR_DISCORD_CLIENT_ID"; // Replace with your Discord client ID

	const envContent = `
HASH_KEY="${hash_key}"
HASH_IV="${hash_iv}"
JWT_SECRET="${jwt_secret}"
MODE="${mode}"
CORS_ORIGIN="${cors_origin}"
EMAIL_HOST="${email_host}"
EMAIL_USER="${email_user}"
EMAIL_PASSWORD="${email_password}"
DISCORD_TOKEN="${discord_token}"
DISCORD_CLIENT_ID="${discord_client_id}"
`.trim();

	await fs.writeFile(".env.generated", envContent, "utf8");
}

generateENV();
