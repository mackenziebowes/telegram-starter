import { Hono } from "hono";
import { client } from "~/library/services/discord";
import { registerCommands } from "~/library/services/discord/commands";

const app = new Hono();

// Get Discord bot status
app.get("/status", async (c) => {
  const isReady = client.isReady();
  const username = isReady ? client.user?.username : null;
  const guilds = isReady ? client.guilds.cache.size : 0;
  
  return c.json({
    status: isReady ? "online" : "offline",
    username,
    guilds,
    uptime: client.uptime,
  });
});

// Register commands manually
app.post("/register-commands", async (c) => {
  try {
    await registerCommands();
    return c.json({ success: true, message: "Commands registered successfully" });
  } catch (error) {
    return c.json({ success: false, message: "Failed to register commands", error: String(error) }, 500);
  }
});

// Get list of connected guilds (servers)
app.get("/guilds", async (c) => {
  if (!client.isReady()) {
    return c.json({ success: false, message: "Bot is not ready" }, 503);
  }
  
  const guilds = [...client.guilds.cache.values()].map(guild => ({
    id: guild.id,
    name: guild.name,
    memberCount: guild.memberCount,
    joined: guild.joinedAt,
  }));
  
  return c.json({ success: true, guilds });
});

export default app;