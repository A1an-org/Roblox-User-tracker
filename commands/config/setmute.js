const db = require("quick.db");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "setmuterole",
    aliases: ["setmute", "smrole", "smr"],
       category: "config",
    description: "Sets A Mute Role For Muted Users!",
    usage: "[role name | role mention | role ID]",
  
  run: async (bot, message, args) => {
                      const sembed3 = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle(module.exports.name || "Null")      
              .addField("aliases", module.exports.aliases || "Null")
         .addField("description", module.exports.description || "Null")
              .addField("usage", module.exports.usage || "Null")
        .addField("category", module.exports.category || "Null")
          .addField("Cooldown", module.exports.cooldown || "Null")
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send(
        "**You Do Not Have The Required Permissions! - [ADMINISTRATOR]**"
      );
    if (!args[0]) {
      let b = await db.fetch(`muterole_${message.guild.id}`);
      let roleName = message.guild.roles.cache.get(b);
      if (message.guild.roles.cache.has(b)) {
        return message.channel.send(
          `**Muterole Set In This Server Is \`${roleName.name}\`!**`
        );
      } else
        return message.channel.send(
          sembed3
        );
    }

    let role =
      message.mentions.roles.first() ||
      bot.guilds.cache.get(message.guild.id).roles.cache.get(args[0]) ||
      message.guild.roles.cache.find(
        c => c.name.toLowerCase() === args.join(" ").toLocaleLowerCase()
      );

    if (!role)
      return message.channel.send(sembed3);

    try {
      let a = await db.fetch(`muterole_${message.guild.id}`);

      if (role.id === a) {
        return message.channel.send(
          "**This Role is Already Set As Muterole!**"
        );
      } else {
        db.set(`muterole_${message.guild.id}`, role.id);

        message.channel.send(
          `**\`${role.name}\` Has Been Set Successfully As Muterole!**`
        );
      }
    } catch (e) {
      return message.channel.send(
        "**Error - `Missing Permissions or Role Doesn't Exist!`**",
        `\n${e.message}`
      );
    }
  }
};