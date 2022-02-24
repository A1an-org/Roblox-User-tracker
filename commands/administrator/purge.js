const Discord = require("discord.js");

const { MessageEmbed } = require("discord.js");
const ms = require("ms");
module.exports = {
    name: "purge",
    category: "moderation",
    aliases: ["clear"],
    usage: "clear <amount>",
    description: "Purges",
    run: async (client, message, args) => {
      const sembed = new MessageEmbed()
     .setColor("GREEN")
     .setTitle("Purge command usage")
      .setDescription(`Please specify how many messages you would like to purge. (min 2, max 100),             \n \`ex: .purge 100 \`  \n \n The purge command is used to delete messages, Can't delete messages that are older then 14 days`)
  if (!message.member.hasPermission("MANAGE_MESSAGES")) //Here we check if the user can run the command.
    return message.channel.send("You are not allowed to run this command.");

  const deleteCount = parseInt(args[0], 10); //This will get the number of messages we want to delete as an integer.
  if (!deleteCount || deleteCount < 2 || deleteCount > 100) //This makes sure that the minimum amount of messages we can delete is 2, and the max is 100. You can change this if you want.
    return message.channel.send(sembed);
  message.channel
    .bulkDelete(deleteCount) //This will delete the specified number of messages.
    .catch(error =>
      message.channel.send(`Couldn't purge messages because of, ${error}.`) //This will make the bot send a message if there is an error.
    );
}
}