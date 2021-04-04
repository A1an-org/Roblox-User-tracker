const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
    name: "track",
    description: "Track a user",
    category: "administrator",
    usage: ["[user]"],
    aliases: [],
    cooldown: 3,
    run: async(bot, message, args) => {
        if (
            !message.member.hasPermission("ADMINISTRATOR") &&
            ["579648772351721507"].includes(message.author.id)
        ) return;

        if (!args[0]) return bot.commands.get("help").run(bot, message, ["track"]);

        let res = await fetch(`https://api.roblox.com/users/get-by-username?username=${args[0]}`);
        let data = await res.json();

        let username;
        let userId;
        if (data.success === false) return message.channel.send(`I wasn't able to find a ROBLOX player named ${args[0]}`)
        else {
            userId = data.Id;
            username = data.Username;
        }

        let query = await bot.db.fetch(`track_${message.guild.id}_${userId}`);
        if (query) return message.channel.send(`${username} is already being tracked.`);

        let obj = {
            username: username,
            id: userId,
            lastPlace: null,
        }

        bot.db.set(`track_${message.guild.id}_${userId}`, obj);
        message.channel.send(`:white_check_mark: ${username} is now being tracked.`);
    }
}
