const { Client, Intents } = require("discord.js");
const bot = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

const token =
  "OTkwNjM1ODU5ODEwMzI4NjE3.GpSEqF._nRmN7_Tsjr1hEum4Q0OkhMrhzOQpbOEkmd9n0";

bot.login(token);
bot.on("ready", () => {
  console.log("Bot is live! ");
});

const prefix = "habibi";

bot.on("messageCreate", async (message) => {
  if (!message.content.includes(prefix) || message.author.bot) return;
  const args = message.content.replace(prefix, "");
  let command = args.trimStart().toLowerCase();

  if (command.includes("assalam")) message.reply("WalaikumAssalam Habibi!");
});
