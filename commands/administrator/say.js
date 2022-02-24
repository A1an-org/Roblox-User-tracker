const discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "say",
  category: "moderation",
  description: "Say something using the bot",
  usage: "say <message>",
  run: async (client, message, args) => {
                       
                      const sembed3 = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle(module.exports.name || "Null")      
              .addField("aliases", module.exports.aliases || "Null")
         .addField("description", module.exports.description || "Null")
              .addField("usage", module.exports.usage || "Null")
        .addField("category", module.exports.category || "Null")
          .addField("Cooldown", module.exports.cooldown || "Null")
    var text = message.content.split(' ').slice(1).join(' ')
  
    if(text.includes('@')) {

      message.author.send("Nice try ni!g!") 
      message.channel.send("You have been logged to our database and i will come and hunt you down")

    } else {
    if(!text) return message.reply(sembed3)
    message.channel.send(text)
    message.channel.send(`Anything sent is not said by the bot but commanded to be said by ${message.author} using ;say`)
}
  }
}