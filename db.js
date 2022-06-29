const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://ted:Meoww_01@cluster0.30jgo.mongodb.net/MuzlemBot")
  .then(() => console.log("Connected to mongodb"));

const Schema = new mongoose.Schema({
  name: String,
  verse: [String],
});

const Reminder = mongoose.model("Reminder", Schema);

async function getDocNames() {
  const result = await Reminder.find().select({ name: 1, _id: 0 });
  const arr = [];
  result.forEach((item) => {
    arr.push(item.name);
  });
  return arr;
}

async function createReminder(key, command) {
  const reminder = new Reminder({
    name: key,
    verse: [command],
  });
  const result = await reminder.save();
  console.log(reminder);
}

async function getReminder(keyword) {
  const reminder = await Reminder.find({ name: keyword }).select({
    verse: 1,
    _id: 0,
  });
  const arr = reminder[0].verse;
  let verse = arr[Math.floor(Math.random() * arr.length)];
  console.log(verse);
  return verse;
}

async function addReminder(keyword, verse) {
  const reminder = await Reminder.updateOne(
    { name: keyword },
    {
      $push: {
        verse: verse,
      },
    }
  );
  console.log(reminder);
}

async function dbcommands(message, command, key) {
  if (key == "create") {
    command = command.replace(key, "").trim();
    let name = command.split(" ")[0];
    command = command.replace(name, "").trim();
    createReminder(name, command);
    return;
  }
  if (command.includes("update")) {
    command = command.replace("update", "").replace(key, "").trim();
    addReminder(key, command);
    return;
  }
  let v = await getReminder(key);

  message.channel.send(
    "Habibi remember Allah says in the glorious Quran '" + v + "'"
  );
}

exports.dbcommands = dbcommands;
exports.dbNames = getDocNames;
