const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "addroleall",
  aliases: ["arall","aroleall","giveroleall"],
  description: "Add a role to all user of the current server",
  category: "moderation",
   cooldown: 5000000000,
run: async (bot, message, args) => {
    if (!message.guild.me.hasPermission("MANAGE_ROLES"))
      return message.channel.send("I don't have enough permission to do that !");

    if (!message.member.hasPermission("MANAGE_ROLES" || "ADMINISTRATOR"))
      return message.channel.send("You don't have permissions for that!");
                        const sembed3 = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle(module.exports.name || "Null")      
              .addField("aliases", module.exports.aliases || "Null")
         .addField("description", module.exports.description || "Null")
              .addField("usage", module.exports.usage || "Null")
        .addField("category", module.exports.category || "Null")
          .addField("Cooldown", module.exports.cooldown || "Null")                
    const role =
      message.guild.roles.cache.find(
        (role) => role.name === args.join(" ").slice(1)
      ) || message.mentions.roles.first() || message.guild.roles.cache.get(args.join(" ").slice(1));

    if (message.guild.me.roles.highest.comparePositionTo(role) < 0) {
      return message.channel.send(`My role is not high enough than **${role.name}** role!`);
    }

    if (message.member.roles.highest.comparePositionTo(role) < 0) {
      return message.channel.send(`Your role must be higher than **${role.name}** role!`);
    }

    if (!role) {
      return message.channel.send(sembed3);
    }

    message.guild.members.cache.forEach(member => member.roles.add(role));

    message.channel.send(`Successfully Added **${role.name}** to Everyone`);
  },
};
