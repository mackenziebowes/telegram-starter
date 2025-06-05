import { CommandInteraction } from 'discord.js';

export const data = {
  name: 'server',
  description: 'Provides information about the server.',
};

export async function execute(interaction: CommandInteraction) {
  // Get the guild (server) the command was executed in
  const guild = interaction.guild;
  
  if (!guild) {
    return interaction.reply('This command can only be used in a server!');
  }
  
  // Format creation date
  const createdAt = guild.createdAt.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  // Get server info
  const serverInfo = {
    name: guild.name,
    id: guild.id,
    memberCount: guild.memberCount,
    createdAt,
    owner: (await guild.fetchOwner()).user.tag,
    channels: guild.channels.cache.size,
    roles: guild.roles.cache.size,
  };
  
  // Create a nicely formatted message
  await interaction.reply({
    content: `
**Server Information for ${serverInfo.name}**
• ID: ${serverInfo.id}
• Owner: ${serverInfo.owner}
• Created On: ${serverInfo.createdAt}
• Members: ${serverInfo.memberCount}
• Channels: ${serverInfo.channels}
• Roles: ${serverInfo.roles}
    `.trim(),
    ephemeral: true
  });
}