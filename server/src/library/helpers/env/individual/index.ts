import HASH_KEY from "./HASH_KEY";
import HASH_IV from "./HASH_IV";
import JWT_SECRET from "./JWT_SECRET";
import MODE from "./MODE";
import CORS_ORIGIN from "./CORS_ORIGIN";
import EMAIL_HOST from "./EMAIL_HOST";
import EMAIL_PASSWORD from "./EMAIL_PASSWORD";
import EMAIL_USER from "./EMAIL_USER";
import DISCORD_TOKEN from "./DISCORD_TOKEN";
import DISCORD_CLIENT_ID from "./DISCORD_CLIENT_ID";

const env = {
	HASH_KEY: HASH_KEY.get,
	hash_key: HASH_KEY,
	HASH_IV: HASH_IV.get,
	hash_iv: HASH_IV,
	JWT_SECRET: JWT_SECRET.get,
	jwt_secret: JWT_SECRET,
	MODE: MODE.get,
	mode: MODE,
	CORS_ORIGIN: CORS_ORIGIN.get,
	cors_origin: CORS_ORIGIN,
	EMAIL_HOST: EMAIL_HOST.get,
	email_host: EMAIL_HOST,
	EMAIL_PASSWORD: EMAIL_PASSWORD.get,
	email_password: EMAIL_PASSWORD,
	EMAIL_USER: EMAIL_USER.get,
	email_user: EMAIL_USER,
	DISCORD_TOKEN: DISCORD_TOKEN.get,
	discord_token: DISCORD_TOKEN,
	DISCORD_CLIENT_ID: DISCORD_CLIENT_ID.get,
	discord_client_id: DISCORD_CLIENT_ID,
};

export default env;
