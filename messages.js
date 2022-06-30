const prefix = "habibi";
const { dbcommands, dbNames } = require("./commands/db");
let dbkeys = [];
dbNames().then((x) => (dbkeys = x));

const commands = ["prayer", "verse"];

async function handleMessages(message) {
  if (!message.content.includes(prefix) || message.author.bot) return;
  let command = message.content.replace(prefix, "").trimStart().toLowerCase();
  console.log(command);
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
  else if (command.includes("jazak"))
    message.reply(
      ["Wa Jazakum my habibi", "Wa Iyakum habibi"][
        Math.floor(Math.random() * 2)
      ]
    );
  else if (searchdb) {
    dbcommands(message, command, key);
  } else if (searchCommands) {
    const X = require(`./commands/${key}`);
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
}

module.exports = handleMessages;
