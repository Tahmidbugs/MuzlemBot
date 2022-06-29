const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://ted:Meoww_01@cluster0.30jgo.mongodb.net/MuzlemBot")
  .then(() => console.log("Connected to mongodb"));

const Schema = new mongoose.Schema({
  name: String,
  verse: [String],
});

const Reminder = mongoose.model("Reminder", Schema);

async function createReminder() {
  const reminder = new Reminder({
    name: "lonely",
    verse: [
      "“Allah is the ally of those who believe. He brings them out from darknesses into the light. And those who disbelieve – their allies are Taghut. They take them out of the light into darknesses. Those are the companions of the Fire; they will abide eternally therein.” – (Quran 2:257)",
      "Your Lord has not abandoned you, nor has He become hateful ˹of you˺ [93:3]",
      "Verily in the remembrance of Allah do hearts find rest. [13:28] ",
      "And ˹surely˺ your Lord will give so much to you that you will be pleased.",
      "Know that this worldly life is no more than play, amusement, luxury, mutual boasting, and competition in wealth and children.",
      "And the next life is certainly far better for you than this one [93:4]",
    ],
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

exports.createReminder = createReminder;
exports.getReminder = getReminder;
exports.addReminder = addReminder;
