import { Hono } from "hono";
import { auth as AMW, type AuthEnv } from "~/library/middleware/auth";
import user from "./user";
import telegram from "./telegram";
// import auth from "./auth";

const app = new Hono();

// Routes that don't require authentication
app.route("/user", user);

// Add authentication middleware for protected routes
app.use(AMW);

// Protected routes
app.route("/telegram", telegram);

export default app;