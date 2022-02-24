const Discord = module.require("discord.js");

module.exports = {
    name: "lock",
    description: "Locks the a certain channel",
    category: "moderation",
    usage: ["lock"],
    aliases: ["lockchannel"],
    cooldown: 3,
    run: async (bot, message, args) => {
   if (!message.member.hasPermission('MANAGE_SERVER', 'MANAGE_CHANNELS')) {
   return message.channel.send("You don't have enough Permissions")
   }
   message.channel.overwritePermissions([
     {
        id: message.guild.id,
        deny : ['SEND_MESSAGES'],
     },
    ],);
   const embed = new Discord.MessageEmbed()
   .setTitle("Channel Updates")
   .setDescription(`🔒 ${message.channel} has been Locked`)
   .setColor("RANDOM");
   await message.channel.send(embed);
   message.delete();
}
}