import * as pingCommand from './ping';
import * as serverCommand from './server';
import { Collection } from 'discord.js';

// Create a collection for commands
const commands = new Collection<string, any>();

// Add commands to the collection
commands.set(pingCommand.data.name, pingCommand);
commands.set(serverCommand.data.name, serverCommand);

// Export the commands data for registration
export const commandsData = [
  pingCommand.data,
  serverCommand.data,
  // Add more command data here
];

export default commands;