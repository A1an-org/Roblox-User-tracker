const axios = require('axios');
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const kills = [
    'https://media1.tenor.com/images/dd10eb337856d14a8640828f99dd7a2f/tenor.gif?itemid=12479111',
    'https://media1.tenor.com/images/110dbddfd3d662479c214cacb754995d/tenor.gif?itemid=10932413',
    'https://media.tenor.com/images/df0d39e9559a0b7e7dbfdccc26e9bba6/tenor.gif',
    'https://media.tenor.com/images/e73b29c821d63648544502c647b914ee/tenor.gif'
]
module.exports = {
    name: "punch",
    description: "punch the person your married to.",
    category: "Fun",
    usage: ["sex <@>"],
    aliases: [],
    cooldown: 3,
    run: async (bot, message, args) => {

         const user = message.mentions.users.first();

        const urle = "https://yuabot.com/weeb/api/v1/img/punch";
        try {

            response = await axios.get(urle);
            image = response.data;
          } catch (e) {
            return message.channel.send(`An error occured, please try again!`)
          }





        if (!user) return message.channel.send('Oh oh... you gotta provide a valid user to punch :/');

        const embed = new MessageEmbed()
            .setTitle(`punch a person`)
            .setColor(`#f3f3f3`)
            .setDescription(`${message.author.username} punchged ${user.username}!`)
            .setImage(image.payload.url)
    console.log(image.payload.url)
        await message.channel.send(embed) 
    }
}

