const { MessageEmbed } = require(`discord.js`);
const { message } = require("noblox.js");

module.exports = {
    name: `servers`,
    usage: `servers`,
   category: "developers",
    description: `Shows my servers.`,
    ownerOnly: true,

    run: async (bot, message, args) => {

        //Start

        let description =
          `Total Servers - ${bot.guilds.cache.size}\n\n` +
          bot.guilds.cache
            .sort((a, b) => b.memberCount - a.memberCount)
            .map(r => r)
            .map((r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Members\nID - ${r.id}`)
            .slice(0, 100)
            .join("\n");

        return message.channel.send("```" + description + "```", { split: { char: '\n' } })

        //End

    }
};