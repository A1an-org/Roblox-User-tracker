const Discord = require("discord.js");
const Color = `RANDOM`;

module.exports = {
    name: "all-emojis",
    category: "Emoji",
    description: "Show Server Emojis!",
    usage: "Emojis",
    run: async (client, message, args) => {
        if (!message.member.hasPermission("MANAGE_EMOJIS")) {
return message.channel.send(`:x: | **You Don't Have Permission To Use This Command**`)
}
        //Start

        if (!message.guild.emojis.cache.size) return message.channel.send(`No Emojis! LOL`);

        let Animated = await message.guild.emojis.cache.filter(emo => emo.animated).array();
        let Normal = await message.guild.emojis.cache.filter(emo => !emo.animated).array();
        let All = [];

        for (let an of Animated) {
          if (!Animated[0]) return;
          All.push(`${an} - ${an.id} - Animated`);
        };

        for (let a of Normal) {
          if (!Normal[0]) return;
          All.push(`${a} - ${a.id} - Normal`);
        };

        return message.channel.send(All.join("\n"), { split: { char: '\n' } })

        //End

    }
}