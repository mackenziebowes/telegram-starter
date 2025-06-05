import { Hono } from "hono";
import { cors } from "hono/cors";
import { prettyJSON } from "hono/pretty-json";
import { init, env } from "~/library/helpers/env";
import sona from "~/routes/sona";
import vona from "~/routes/vona";
import { logger } from "~/library/middleware/logger";
import { initTelegramBot } from "~/library/services/telegram";
import { registerCommands } from "~/library/services/telegram/registerCommands";
import { loadConfig } from "~/utils/config";

// Initialize environment
init();

// Create Hono app
const app = new Hono();

app.use(prettyJSON());
app.use("/*", logger);

function getOrigin() {
	if (env.mode.get() == "prod") {
		return env.cors_origin.get();
	}
	return "http://localhost:3000";
}

app.use(
	"/*",
	cors({
		origin: getOrigin(),
		allowHeaders: [
			"ui-access-token",
			"Content-Type",
			"Authorization",
			"Accept",
		],
		allowMethods: ["POST", "GET", "OPTIONS"],
		exposeHeaders: ["Content-Length"],
		maxAge: 600,
		credentials: true,
	})
);

// Route definitions
app.route("/vona/*", vona);
app.route("/sona/*", sona);

// Initialize Telegram bot and server
async function startServer() {
	try {
		// Load configuration
		const config = await loadConfig();

		// Initialize Telegram bot
		const telegramBot = initTelegramBot();

		// Register Telegram commands if enabled
		if (config.features.autoRegisterCommands) {
			await registerCommands(telegramBot);
		}

		console.log("Telegram bot initialized successfully!");

		// Return server configuration
		return {
			port: config.server.port || 3050,
			fetch: app.fetch,
		};
	} catch (error) {
		console.error("Failed to start server:", error);
		// Return basic server config if Telegram initialization fails
		return {
			port: 3050,
			fetch: app.fetch,
		};
	}
}

// Use top-level await for cleaner code (Bun supports this)
const serverConfig = await startServer();
export default serverConfig;
