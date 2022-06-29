const url =
  "https://www.muslimpro.com/Prayer-times-Tampa-FL-FL-United-States-4174757";
const rp = require("request-promise");
const cheerio = require("cheerio");
const { MessageEmbed } = require("discord.js");
async function getPrayers(message) {
  let timings = {};
  await rp(url)
    .then(function (html) {
      const $ = cheerio.load(html);

      const prayertimes = $(".prayer-times");

      const record = prayertimes.text();
      let date = Date().substring(8, 11) + Date().substring(4, 7);
      //   console.log(date);
      //   console.log("date length", date.length);

      const index = record.indexOf(date) + (date.length == 6 ? 6 : 5);
      const subs = record.substring(index, index + 36);
      timings = {
        Fajr: subs.substring(0, 5),
        Dhuhr: subs.substring(10, 15),
        Asr: subs.substring(15, 20),
        Maghrib: subs.substring(20, 25),
        Isha: subs.substring(25, 30),
      };
      let time = "";
      for (const p in timings) {
        time += p + " is at " + timings[p] + "\n";
      }
      const embed = new MessageEmbed()
        .setTitle(`Prayer times for today, ${Date().substring(0, 16)}:`)
        .setDescription(`${time} `);

      message.channel.send({ embeds: [embed] });
    })
    .catch(function (error) {
      console.log("error reading");
    });
}

module.exports = getPrayers;
