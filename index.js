const { Client, Intents, MessageEmbed } = require("discord.js");

const { dbcommands, dbNames } = require("./db");

const bot = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

const token =
  "OTkwNjM1ODU5ODEwMzI4NjE3.Gc1bbX.MHSoH4nPzzpHb1tU7ILaSkrQnTn_gvSd2l0LJE";

bot.login(token);
bot.on("ready", () => {
  console.log("Bot is live! ");
});
const prefix = "habibi";

let dbkeys = [];
dbNames().then((x) => (dbkeys = x));

const commands = ["prayer", "salam", "verse"];

bot.on("messageCreate", async (message) => {
  if (!message.content.includes(prefix) || message.author.bot) return;
  let command = message.content.replace(prefix, "").trimStart();

  const searchdb = dbkeys.some((el) => {
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
  else if (searchdb) {
    dbcommands(message, command, key);
  } else if (searchCommands) {
    const X = require(`./${key}`);
    X(message);
  } else if (command.includes("clear")) {
    command = command.replace("clear", "").trim();
    console.log(command);
    message.channel.bulkDelete(parseInt(command));
  } else {
    message.channel.send(
      "Habibi I don't know how I can help with that. Ask Allah, surely He is the best of helpers"
    );
  }
});
