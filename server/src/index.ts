import { Hono } from "hono";
import { cors } from "hono/cors";
import { prettyJSON } from "hono/pretty-json";
import { init, env } from "~/library/helpers/env";
import sona from "~/routes/sona";
import vona from "~/routes/vona";
import { logger } from "~/library/middleware/logger";
import { initDiscordBot } from "~/library/services/discord";
import { registerCommands } from "~/library/services/discord/commands";
import { loadConfig } from "~/utils/config";

// Initialize environment
init();

// Create Hono app
const app = new Hono();

app.use(prettyJSON());
app.use("/*", logger);

function getOrigin() {
	if (env.MODE() == "prod") {
		return env.CORS_ORIGIN();
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

// Initialize Discord bot and server
async function startServer() {
	try {
		// Load configuration
		const config = await loadConfig();
		
		// Initialize Discord bot
		const discordClient = initDiscordBot();
		
		// Register Discord commands if enabled
		if (config.features.autoRegisterCommands) {
			await registerCommands();
		}
		
		console.log('Discord bot initialized successfully!');
		
		// Return server configuration
		return {
			port: config.server.port || 3050,
			fetch: app.fetch,
		};
	} catch (error) {
		console.error('Failed to start server:', error);
		// Return basic server config if Discord initialization fails
		return {
			port: 3050,
			fetch: app.fetch,
		};
	}
}

// Use top-level await for cleaner code (Bun supports this)
const serverConfig = await startServer();
export default serverConfig;
