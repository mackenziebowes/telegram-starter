import type { ENVExport } from "~/types/env";

const DISCORD_CLIENT_ID = () => {
	if (!val) throw "DISCORD_CLIENT_ID not set";
	return val;
};

let val: string | undefined = undefined;

const init = () => {
	env.val = import.meta.env.DISCORD_CLIENT_ID;
	if (!env.val) throw "DISCORD_CLIENT_ID not set";
};

const env: ENVExport = {
	get: DISCORD_CLIENT_ID,
	val,
	init,
};

export default env;