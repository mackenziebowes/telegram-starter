import fs from 'node:fs';
import path from 'node:path';
import { Collection } from 'discord.js';
import { fileURLToPath } from 'node:url';

// Load commands dynamically from the file system
export async function loadCommands() {
  const commands = new Collection<string, any>();
  const commandsData = [];
  
  // Get the commands directory path
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const commandsPath = path.join(__dirname, '..', 'commands');
  
  // Get all command files
  const commandFiles = fs.readdirSync(commandsPath)
    .filter(file => file.endsWith('.ts') || file.endsWith('.js'))
    .filter(file => file !== 'index.ts' && file !== 'index.js');
  
  // Load each command
  for (const file of commandFiles) {
    try {
      const filePath = path.join(commandsPath, file);
      const command = await import(filePath);
      
      // Set command in collection if it has name and execute properties
      if ('data' in command && 'execute' in command) {
        commands.set(command.data.name, command);
        commandsData.push(command.data);
      } else {
        console.warn(`The command at ${filePath} is missing required "data" or "execute" property.`);
      }
    } catch (error) {
      console.error(`Error loading command ${file}:`, error);
    }
  }
  
  return { commands, commandsData };
}

export default loadCommands;