import { Client, Events, GatewayIntentBits } from 'discord.js';
import { env } from '~/library/helpers/env';
import { setupCommandHandler } from './commandHandler';

// Create a new client instance
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// When the client is ready, run this code
client.once(Events.ClientReady, (c) => {
  console.log(`Discord bot ready! Logged in as ${c.user.tag}`);
});

// Setup command handling
setupCommandHandler(client);

// Initialize the Discord client
export function initDiscordBot() {
  try {
    // Login to Discord with the token
    client.login(env.DISCORD_TOKEN());
    return client;
  } catch (error) {
    console.error('Error initializing Discord bot:', error);
    throw error;
  }
}

export { client };