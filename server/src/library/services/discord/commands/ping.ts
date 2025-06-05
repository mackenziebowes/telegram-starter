import { CommandInteraction } from 'discord.js';

export const data = {
  name: 'ping',
  description: 'Replies with Pong!',
};

export async function execute(interaction: CommandInteraction) {
  const startTime = Date.now();
  await interaction.reply('Pinging...');
  const endTime = Date.now();
  const ping = endTime - startTime;
  
  await interaction.editReply(`Pong! Latency: ${ping}ms`);
}