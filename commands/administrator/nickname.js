
const Discord = require('discord.js');
const ms = require('ms');
const { Message, GuildChannel } = require('discord.js');
//const fetch = require('node-fetch');
module.exports = {
    name: "nickname",
     category: "moderation",
    description: "Change somebodys name",
  run: async (bot, message, args) => {
    if(!message.member.hasPermission("MANGE_NICKNAMES")) {
        return message.channel.send("You should have nickname perms to use this command!")
      }
      
    const target = message.mentions.users.first()
    const member = message.guild.members.cache.get(target.id)

    args.shift()
    const nickname = args.join(' ')

    member.setNickname(nickname)

    message.reply(`You changed the users nickname to **${nickname}**`)
  }
}