const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://ted:Meoww_01@cluster0.30jgo.mongodb.net/MuzlemBot")
  .then(() => console.log("Connected to mongodb"));

const Schema = new mongoose.Schema({
  name: String,
  verse: [String],
});

const QuranSchema = new mongoose.Schema({
  name: String,
  verse: [String],
});
const Quran = mongoose.model("Quran", QuranSchema);

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

async function createSurah(key, command) {
  const reminder = new Quran({
    name: key,
    verse: [command],
  });
  const result = await reminder.save();
  console.log(reminder);
}
// createSurah("surah ale imran", "Alif Laam Meem");
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
    message.channel.send(`New Collection: ${name} Added to database`);
    return;
  }
  if (command.includes("update")) {
    command = command.replace("update", "").replace(key, "").trim();
    addReminder(key, command);
    console.log("updated");
    message.channel.send(`New Verse Added to the collection: ${key}`);
    return;
  }
  let v = await getReminder(key);

  message.channel.send(
    "Habibi remember Allah says in the glorious Quran '" + v + "'"
  );
}

// const rp = require("request-promise");
// const cheerio = require("cheerio");

// async function pushSurah() {
//   await rp(url).then((html) => {
//     let $ = cheerio.load(html);
//     const xd = $(".elementor-button-wrapper");
//     console.log("LINKS");
//     $(".elementor-button-wrapper").each(async (i, el) => {
//       const link = $(el).find("a").attr("href");
//       urls.push(link)
//     });

//     console.log("TITLES");
//     $(".elementor-widget-container").each(async (i, el) => {
//       const title = $(el).find("p").text();
//       console.log(title);
//     });
//   });
// }

// pushSurah();
exports.dbcommands = dbcommands;
exports.dbNames = getDocNames;
