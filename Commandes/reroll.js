const Discord = require("discord.js");
const ms = require("ms");
const path = require("path");

module.exports.run = async (client, message, args) => {
  let langues = require(path.resolve(path.join(".", "database/lang.json")));
  let lang = langues[message.guild.id].langues;

  let hasPerm = message.member.hasPermission("ADMINISTRATOR");
  let hasRole = message.member.roles.cache.find(r => r.name === "Giveaways");

  if (lang === "tr") {
    if (hasPerm === false || !hasRole == null)
      return message.channel.send(
        new Discord.MessageEmbed()
          .setTitle("__HATA__")
          .setColor("RED")
          .setDescription(
            "Bu komutu kullanmak için `ADMINISTRATOR` izinlerine veya ``Giveaways`` adlı bir role ihtiyacınız var."
          )
          .setTimestamp()
      );

    if (!args[0]) {
      return message.channel.send(
        new Discord.MessageEmbed()
          .setTitle("__HATA__")
          .setColor("RED")
          .setDescription("Lütfen, çekiliş ID gir")
          .setTimestamp()
      );
    }

    client.giveawaysManager.reroll(args[0], {
      messages: {
        congrat: "`🎁`・Tebrikler: {winners}"
      }
    });
  } else if (lang === "en") {
    if (hasPerm === false || !hasRole == null)
      return message.channel.send(
        new Discord.MessageEmbed()
          .setTitle("__ERREUR__")
          .setColor("RED")
          .setDescription(
            "You need `ADMINISTRATOR` permissions or a role named ``giveaway`` to use that command."
          )
          .setTimestamp()
      );

    if (!args[0]) {
      return message.channel.send(
        new Discord.MessageEmbed()
          .setTitle("__ERROR__")
          .setColor("RED")
          .setDescription("Please, enter the giveaway ID")
          .setTimestamp()
      );
    }

    client.giveawaysManager.reroll(args[0], {
      messages: {
        congrat: "`🎁`・Congratulions: {winners}"
      }
    });
  }
};

module.exports.help = {
  name: "reroll"
};
