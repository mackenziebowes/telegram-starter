import type { ENVExport } from "~/types/env";

const DISCORD_TOKEN = () => {
	if (!val) throw "DISCORD_TOKEN not set";
	return val;
};

let val: string | undefined = undefined;

const init = () => {
	env.val = import.meta.env.DISCORD_TOKEN;
	if (!env.val) throw "DISCORD_TOKEN not set";
};

const env: ENVExport = {
	get: DISCORD_TOKEN,
	val,
	init,
};

export default env;