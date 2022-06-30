const url =
  "https://www.omanobserver.om/article/81041/Features/quran---verse-of-the-day";
const { MessageEmbed } = require("discord.js");
const rp = require("request-promise");
const cheerio = require("cheerio");
async function verseoftheday(message) {
  let verseInfo = {};
  await rp(url).then(async function (html) {
    const $ = cheerio.load(html);
    const prayertimes = $(".article-desc");

    let record = prayertimes.text().trimStart();

    verseInfo = {
      verse: record.substring(0, record.indexOf("Verse")),
      verseno: record
        .substring(record.indexOf("Verse"), record.indexOf("Surah"))
        .toLowerCase(),
      surah: record.substring(record.indexOf("Surah"), record.indexOf("\n")),
    };
    console.log(verseInfo);
    const embed = new MessageEmbed()
      .setTitle("Verse of the day:")
      .setDescription(
        `${verseInfo.verse}\n[${verseInfo.surah}: ${verseInfo.verseno}]`
      );
    message.channel.send({ embeds: [embed] });
  });
}

module.exports = verseoftheday;
