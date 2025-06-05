import { Client, Events } from 'discord.js';
import commands from './commands';

// Setup command handling for the client
export function setupCommandHandler(client: Client) {
  // Handle interaction events (slash commands)
  client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;
    const command = commands.get(commandName);

    if (!command) {
      console.error(`Command ${commandName} not found`);
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(`Error executing command ${commandName}:`, error);
      
      // Send error message to user if the reply hasn't been sent yet
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({ 
          content: 'There was an error executing this command!', 
          ephemeral: true 
        });
      } else {
        await interaction.reply({ 
          content: 'There was an error executing this command!', 
          ephemeral: true 
        });
      }
    }
  });
}