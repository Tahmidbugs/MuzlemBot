const { Client, Intents, MessageEmbed } = require("discord.js");

const handleMessages = require("./messages");

const bot = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

const token =
  "OTkwNjM1ODU5ODEwMzjE3.GWHve8.Ar_gDK0JEHY6KhoR-WUjl7isbfZ-K1IYfYmYUg";

bot.login(token);
bot.on("ready", () => {
  console.log("Bot is live! ");
});

bot.on("messageCreate", handleMessages);
