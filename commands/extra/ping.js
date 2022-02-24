module.exports = {
    name: "ping",
    description: "pings the bot",
    category: "Extra",
    usage: ["ping <>"],
    aliases: [],
    cooldown: 3,
    run: async (bot, message, args) => {
        message.channel.send("Pinging...").then(m =>{
            var ping = m.createdTimestamp - message.createdTimestamp;
            var botPing = Math.round(bot.pi);

            m.edit(`**:ping_pong: Pong! Your Ping Is:**\n  ${ping}ms`);
        });
    }
    }
