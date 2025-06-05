import { ENVExport, ENVVal } from "~/types/env";

function TELEGRAM_BOT_USERNAME(): string {
	if (TELEGRAM_BOT_USERNAME_val === undefined) {
		console.error("TELEGRAM_BOT_USERNAME not set");
		process.exit(1);
	}
	return TELEGRAM_BOT_USERNAME_val;
}

function init() {
	TELEGRAM_BOT_USERNAME_val = process.env.TELEGRAM_BOT_USERNAME;
}

let TELEGRAM_BOT_USERNAME_val: ENVVal;

export default {
	val: TELEGRAM_BOT_USERNAME_val,
	get: TELEGRAM_BOT_USERNAME,
	init: init,
} as ENVExport;
