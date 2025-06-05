import { loadConfig } from '~/utils/config';

async function generateInviteURL() {
  const config = await loadConfig();
  const clientId = config.discord.clientId;
  
  if (!clientId) {
    console.error('Error: No Discord client ID found in config.json');
    console.log('Please make sure you have set up your Discord client ID in config.json');
    process.exit(1);
  }
  
  // Generate invite URL with basic permissions needed for bot functionality
  const basePermissions = 
    (1 << 3) +  // Manage webhooks
    (1 << 5) +  // Manage server
    (1 << 7) +  // Create instant invite
    (1 << 10) + // Manage channels
    (1 << 11) + // Manage roles
    (1 << 16) + // Add reactions
    (1 << 28) + // View audit log
    (1 << 31) + // Send messages
    (1 << 32) + // Send TTS messages
    (1 << 34) + // Manage messages
    (1 << 35) + // Embed links
    (1 << 36) + // Attach files
    (1 << 37) + // Read message history
    (1 << 38) + // Mention @everyone, @here and all roles
    (1 << 39) + // Use external emojis
    (1 << 43);  // Use slash commands

  const url = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&permissions=${basePermissions}&scope=bot%20applications.commands`;
  
  console.log('\nDiscord Bot Invite URL:');
  console.log('-----------------------');
  console.log(url);
  console.log('\nUse this URL to invite your bot to a Discord server.');
}

generateInviteURL();