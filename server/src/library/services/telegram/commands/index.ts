import { pingCommand } from './ping';
import { serverCommand } from './server';
import { Context } from 'telegraf';

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
  // Add more commands here
];

export default commands;