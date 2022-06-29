const { Client, Intents } = require("discord.js");

const { getReminder, addReminder, createReminder } = require("./db");

const bot = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

const token =
  "OTkwNjM1ODU5ODEwMzI4NjE3.GRa0fm.ZIudMgBi5-kgyCS511atNgQtLvfg5QRSpQWyIQ";

bot.login(token);
bot.on("ready", () => {
  console.log("Bot is live! ");
});

const prefix = "habibi";
const dbKeys = ["sad", "lonely"];
const commands = ["prayer", "salam"];

bot.on("messageCreate", async (message) => {
  if (!message.content.includes(prefix) || message.author.bot) return;
  const args = message.content.replace(prefix, "");
  let command = args.trimStart().toLowerCase();

  const searchdb = dbKeys.some((el) => {
    if (command.includes(el)) {
      key = el;
      return el;
    }
  });

  const searchCommands = commands.some((el) => {
    if (command.includes(el)) {
      key = el;
      return el;
    }
  });

  if (command.includes("assalam")) message.reply("WalaikumAssalam Habibi!");
  else if (command.includes("add")) {
    command = command.replace("add", "").trim();
    let name = command.split(" ")[0];
    command = command.replace(name, "").trim();
    addReminder(name, command);
  } else if (searchdb) {
    let v = await getReminder(dbkey);
    message.channel.send(
      "Habibi remember Allah says in the glorious Quran '" + v + "'"
    );
  } else {
    message.channel.send(
      "Habibi I don't know how I can help with that. Ask Allah, surely He is the best of helpers"
    );
  }
});
