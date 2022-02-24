const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: "marry",
    description: "marry someone",
    category: "Fun",
    usage: ["marry <@user>"],
    aliases: ["marrys"],
    cooldown: 3,
    run: async (bot, message, args) => {

        //Start

        let Member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!Member) return message.channel.send(`Please Mention User That You Want To Marry!`);

        if (Member.user.id === message.author.id) return message.channel.send(`You Can't Marry YourSelf!`);

        let GetStatus = await db.fetch(`MarryStatus_${message.author.id}`);
        if (GetStatus !== null) return message.channel.send(`You Are Already Married!`);

        let GetStatus2 = await db.fetch(`MarryStatus_${Member.user.id}`);
        if (GetStatus2 !== null) return message.channel.send(`${message.mentions.members.first() ? "He/She Is" : "You Are"} Already Married!`);

        await db.set(`MarryStatus_${message.author.id}`, Member.user.id);
        await db.set(`MarryStatus_${Member.user.id}`, message.author.id);

        let Embed = new MessageEmbed()
        .setColor("RED")
        .setTitle(`Congratulation!`)
        .setDescription(`You Are Now Married! Your Partner Is <@${Member.user.id}>`)
        .setTimestamp();

        return message.channel.send(Embed);

        //End

    }
}