# Telegram Bot Starter Kit

A ready-to-deploy Telegram bot server built with Hono and TypeScript.

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed
- A Telegram bot token from BotFather

### Setup Telegram Bot

1. Open Telegram and search for [@BotFather](https://t.me/botfather)
2. Send `/newbot` to create a new bot
3. Follow the instructions to choose a name and username for your bot
4. Copy your bot token from the success message

### Installation

1. Clone this repository:

```sh
git clone https://github.com/mackenziebowes/telegram-starter.git
cd telegram-starter/server
```

2. Install dependencies:

```sh
bun install
```

3. Create a `config.json` file based on the example:

```sh
cp config.example.json config.json
```

4. Edit the `config.json` file with your Telegram bot token and username:

```json
{
	"telegram": {
		"token": "YOUR_TELEGRAM_BOT_TOKEN",
		"botUsername": "YOUR_TELEGRAM_BOT_USERNAME"
	}
}
```

### Start the Server

```sh
bun run dev
```

## Bot Link

To get the link to your bot, run:

```sh
bun run generate:invite
```

## Features

- Built-in command registration
- Simple API for command handling
- Environment variable management
- Configuration via config.json
- API endpoints for bot management

## API Endpoints

- `GET /vona/telegram/status` - Get bot status
- `POST /vona/telegram/register-commands` - Register commands manually

## Architecture Overview

- Server uses Hono framework with two route namespaces:
  - `/sona/*` - Public routes for authentication flows
  - `/vona/*` - Protected routes requiring authentication

## Adding New Commands

1. Create a new command file in the commands directory:

```typescript
// src/library/services/telegram/commands/your-command.ts
import { Context } from "telegraf";
import { TelegramCommand } from "./index";

export const yourCommand: TelegramCommand = {
	name: "your-command",
	description: "Your command description",

	async execute(ctx: Context) {
		await ctx.reply("Your command response");
	},
};
```

2. Register your command in the commands index file:

```typescript
// src/library/services/telegram/commands/index.ts
import { pingCommand } from "./ping";
import { serverCommand } from "./server";
import { yourCommand } from "./your-command";
import { Context } from "telegraf";

// Command interface
export interface TelegramCommand {
	name: string;
	description: string;
	execute: (ctx: Context) => Promise<void>;
}

// Export array of commands
const commands: TelegramCommand[] = [
	pingCommand,
	serverCommand,
	yourCommand,
	// Add more commands here
];

export default commands;
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
