# Discord Bot Starter Kit

A ready-to-deploy Discord bot server built with Hono and TypeScript.

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed
- A Discord application with a bot token

### Setup Discord Bot

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a new application
3. Navigate to the "Bot" tab and create a bot
4. Copy your bot token and client ID

### Installation

1. Clone this repository:

```sh
git clone https://github.com/mackenziebowes/discord-starter.git
cd discord-starter/server
```

2. Install dependencies:

```sh
bun install
```

3. Create a `config.json` file based on the example:

```sh
cp config.example.json config.json
```

4. Edit the `config.json` file with your Discord bot token and client ID:

```json
{
	"discord": {
		"token": "YOUR_DISCORD_BOT_TOKEN",
		"clientId": "YOUR_DISCORD_CLIENT_ID"
	}
}
```

### Start the Server

```sh
bun run dev
```

## Bot Invitation

To invite your bot to a server, use this URL (replace YOUR_CLIENT_ID):

```sh
bun run generate:invite
```

## Features

- Built-in slash command registration
- Express-like API for command handling
- Environment variable management
- Configuration via config.json
- API endpoints for bot management

## API Endpoints

- `GET /vona/discord/status` - Get bot status
- `GET /vona/discord/guilds` - Get list of connected Discord servers
- `POST /vona/discord/register-commands` - Register slash commands manually

## Architecture Overview

- Server uses Hono framework with two route namespaces:
  - `/sona/*` - Public routes for authentication flows
  - `/vona/*` - Protected routes requiring authentication

## Adding New Commands

1. Edit the commands.ts file to add new slash commands:

```typescript
// src/library/services/discord/commands.ts
const commands = [
	{
		name: "ping",
		description: "Replies with Pong!",
	},
	{
		name: "your-command",
		description: "Your command description",
		options: [
			{
				name: "option-name",
				description: "Option description",
				type: 3, // STRING type
				required: true,
			},
		],
	},
];
```

2. Handle the command in index.ts:

```typescript
// src/library/services/discord/index.ts
client.on(Events.InteractionCreate, async (interaction) => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === "ping") {
		await interaction.reply("Pong!");
	} else if (commandName === "your-command") {
		const option = interaction.options.getString("option-name");
		await interaction.reply(`You provided: ${option}`);
	}
});
```

## Deployment

The server is designed to be easily deployed to any Node.js hosting platform:

1. Build the project (if needed):

```sh
bun build src/index.ts --outdir ./dist
```

2. Deploy the built files along with your config.json to your hosting provider

## License

MIT
