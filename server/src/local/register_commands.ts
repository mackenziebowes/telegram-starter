import { registerCommands } from "~/library/services/discord/registerCommands";
import { init } from "~/library/helpers/env";

// Initialize environment
init();

async function main() {
	try {
		console.log("Starting command registration...");
		await registerCommands();
		console.log("Command registration complete!");
	} catch (error) {
		console.error("Error registering commands:", error);
		process.exit(1);
	}
}

main();
