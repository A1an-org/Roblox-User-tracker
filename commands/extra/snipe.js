const Discord = require("discord.js");
const db = require("quick.db");
module.exports = {
    name: "snipe",
    description: "snipe a delete message",
    category: "Extra",
    usage: ["Snipe <>"],
    aliases: [],
    cooldown: 5,
    run: async (bot, message, args) => {
    const msg = bot.snipe.get(message.channel.id);
    if (!msg)
      return message.channel
        .send("There are no deleted messages in this channel!")
        .then(m => {
          m.react("🔄");
        });
    const embed = new Discord.MessageEmbed()
      .setTitle("📋Snipe Message Delete📋")
      //  .setAuthor(msg.author)
      .setDescription(
        `=> Author: \`\`\`
${msg.author}
\`\`\`
 => Message Delete: 
\`\`\`
${msg.content || "Tell That No Response To Embed"}
\`\`\`
Click :x: to clear this message`
      )
      .setTimestamp()
      .setColor("GREEN");
    if (msg.image) embed.setImage(msg.image);
    message.channel.send(embed).then(m => {
      m.react("✄1�7");
      m.react("❄1�7");
    const filter = (reaction, user) => {
            return (
                ["❄1�7", "✄1�7"].includes(reaction.emoji.name) &&
                user.id === message.author.id
            );
        };

        m.awaitReactions(filter, { max: 1, time: 300000, errors: ["time"] }).then(collected => {
        const reaction = collected.array()[collected.size - 1]

            if (!reaction.message.guild) return; // If the user was reacting something but not in the guild/server, ignore them.

        if (reaction.emoji.name === "❄1�7") {
          m.delete();
        }
      })})}}