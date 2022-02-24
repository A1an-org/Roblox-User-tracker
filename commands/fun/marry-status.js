const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
module.exports = {
    name: "marry-status",
    description: "check your status.",
    category: "Fun",
    usage: ["marry-status <>"],
    aliases: [],
    cooldown: 3,
    run: async (bot, message, args) => {

        //Start

        let Member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

        if (!Member) return message.channel.send(`Invalid User!`);

        function MyEnglishSucks(Thing, Thing2) {
            return message.mentions.members.first() ? Thing : Thing2;
        };

        let GetStatus = await db.fetch(`MarryStatus_${Member.user.id}`);
        if (GetStatus === null) return message.channel.send(`${MyEnglishSucks("He/She Is", "You Are")} Single!`);

        let Embed = new MessageEmbed()
        .setColor("RED")
        .setTitle(`Married!`)
        .setDescription(`${MyEnglishSucks("He/She Is", "You Are")} Married! ${MyEnglishSucks("His/Her", "Your")} Partner Is <@${GetStatus}>`)
        .setTimestamp();

        return message.channel.send(Embed);

        //End

    }
}
