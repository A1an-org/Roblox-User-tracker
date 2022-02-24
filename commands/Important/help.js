

const { MessageEmbed } = require("discord.js");
const db = require("quick.db")
const prefix = ";"

module.exports = {
    name: "help",
    description: "Shows all of the bot's commands",
    category: "Important",
    usage: ["help"],
    aliases: ["commands"],
    cooldown: 3,
    run: async (bot, message, args) => {
    if (args[0]) {
      const command = await bot.commands.get(args[0]);

      if (!command) {
        return message.reply("There is no command in the bot with name **" + args[0] + "**.");
      }

      let embed = new MessageEmbed()
            			.setAuthor(`${message.guild.name} | Help `, message.guild.iconURL({ dynamic: true }))

        .setDescription(command.description || "None")

        .addField("Command usage", command.usage ? "```js\n" + prefix + command.usage + "```" : "Not Provided")
       .addField("Cooldown", command.cooldown ? "```js\n" + prefix + command.cooldown + "```" : "Not Provided")
        .setColor("GREEN")


      if(command.aliases && command.aliases.length) embed.addField("Aliases", command.aliases.map(x => "`" + x +"`").join(", "))
      if(command.botPermission && command.botPermission.length) embed.addField("Bot Permissions", command.botPermission.map(x => "`" + x +"`").join(", "), true)
      if(command.authorPermission && command.authorPermission.length) embed.addField("Author Permissions", command.authorPermission.map(x => "`" + x +"`").join(", "), true)

      return message.channel.send(embed);
    } else {
      const commands = await bot.commands;

      let emx = new MessageEmbed()
			.setAuthor(`${message.guild.name}  `, message.guild.iconURL({ dynamic: true }))
        .setDescription(`**[${module.exports.name}](https://discord.gg/D2PYCM5GAQ)**`)
        .setColor("BLACK")
        .setFooter(`;help <cmd> | MSR Bot`,  message.guild.iconURL({ dynamic: true }))
        .setThumbnail(message.guild.iconURL({ dynamic: true }));

      let com = {};
      for (let comm of commands.array()) {
        let category = comm.category || "Unknown";
        let name = comm.name;

        if (!com[category]) {
          com[category] = [];
        }
        com[category].push(name, ("\n"));
      }

      for (const [key, value] of Object.entries(com)) {
        let category = key;

        let desc = "```" + value.join(" ") + "```";

        emx.addField(`${category.toUpperCase()} [Commands]`, desc);
      }

   


     return message.channel.send(emx);
   
      }


    }
  }
