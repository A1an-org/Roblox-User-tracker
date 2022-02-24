const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
module.exports = {
    name: "divorce",
    description: "divorce the person your married to.",
    category: "Fun",
    usage: ["Divorce <>"],
    aliases: [],
    cooldown: 3,
    run: async (bot, message, args) => {

        //Start

        let GetStatus = await db.fetch(`MarryStatus_${message.author.id}`);
        if (GetStatus === null) return message.channel.send(`You Are Single!`);

        await db.set(`MarryStatus_${GetStatus}`, null);
        await db.set(`MarryStatus_${message.author.id}`, null);

        let Embed = new MessageEmbed()
        .setColor("RED")
        .setTitle(`RIP`)
        .setDescription(`You Are Now Single!`)
        .setTimestamp();

        return message.channel.send(Embed);

        //End

    }
}