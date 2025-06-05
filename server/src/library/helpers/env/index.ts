import env from "./individual";

export function init() {
	env.hash_key.init();
	env.hash_iv.init();
	env.jwt_secret.init();
	env.mode.init();
	env.cors_origin.init();
	env.email_host.init();
	env.email_password.init();
	env.email_user.init();
	env.telegram_token.init();
	env.telegram_bot_username.init();
}

export { env };