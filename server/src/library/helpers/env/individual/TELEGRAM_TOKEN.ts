import { ENVExport, ENVVal } from "~/types/env";

function TELEGRAM_TOKEN(): string {
	if (TELEGRAM_TOKEN_val === undefined) {
		console.error("TELEGRAM_TOKEN not set");
		process.exit(1);
	}
	return TELEGRAM_TOKEN_val;
}

function init() {
	TELEGRAM_TOKEN_val = process.env.TELEGRAM_TOKEN;
}

let TELEGRAM_TOKEN_val: ENVVal;

export default {
	val: TELEGRAM_TOKEN_val,
	get: TELEGRAM_TOKEN,
	init: init,
} as ENVExport;
