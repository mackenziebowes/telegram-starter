import { REST, Routes } from "discord.js";
import { env } from "~/library/helpers/env";
import { commandsData } from "./commands";

// Function to register slash commands with Discord API
export async function registerCommands() {
	const rest = new REST({ version: "10" }).setToken(env.DISCORD_TOKEN());

	try {
		console.log("Started refreshing application (/) commands.");

		// Register commands globally
		await rest.put(Routes.applicationCommands(env.DISCORD_CLIENT_ID()), {
			body: commandsData,
		});

		console.log("Successfully reloaded application (/) commands.");
	} catch (error) {
		console.error("Error registering commands:", error);
	}
}
