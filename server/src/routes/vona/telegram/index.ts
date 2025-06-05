import { Hono } from "hono";
import { bot } from "~/library/services/telegram";
import { registerCommands } from "~/library/services/telegram/registerCommands";
import { auth } from "~/library/middleware/auth";

// Create router
const app = new Hono();

// Apply auth middleware to all routes
app.use("/*", auth);

// Get bot status
app.get("/status", async (c) => {
  try {
    const botInfo = await bot.telegram.getMe();
    
    return c.json({
      status: "online",
      bot: {
        id: botInfo.id,
        username: botInfo.username,
        firstName: botInfo.first_name,
        isBot: botInfo.is_bot,
      },
    });
  } catch (error) {
    console.error("Error fetching bot status:", error);
    
    return c.json({
      status: "error",
      message: "Failed to get bot status",
    }, 500);
  }
});

// Register commands manually
app.post("/register-commands", async (c) => {
  try {
    await registerCommands(bot);
    
    return c.json({
      success: true,
      message: "Commands registered successfully",
    });
  } catch (error) {
    console.error("Error registering commands:", error);
    
    return c.json({
      success: false,
      message: "Failed to register commands",
    }, 500);
  }
});

export default app;