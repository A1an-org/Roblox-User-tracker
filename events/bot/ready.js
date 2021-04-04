const  Discord = require("discord.js");
const fetch = require("node-fetch");
const { bot } = require("../../index");

module.exports = () => {
    console.log(`Logged in as ${bot.user.username}`);

    async function login(cookie) {
        await bot.rbx.setCookie(cookie);
        bot.rbx.getCurrentUser().then(user => console.log(user));
    }

    async function checkTracks(guild) {
        console.log("a");
        guild = bot.guilds.cache.get(guild);
        if (!guild) return;
        console.log("b");

        let data = await bot.db.all()
            .filter(data => data.ID.startsWith(`track_${guild.id}`));

        console.log(data);

        let logChannel2 = guild.channels.cache.get(bot.config.logChannel);
        if (!data) return null;
        data.forEach(async d => {
            let parsed = JSON.parse(d.data);
            console.log(parsed);

            console.log(parsed.id);
                       let playerInfo = await bot.rbx.getPlayerInfo(parsed.id);
            let res = await fetch(`http://api.roblox.com/users/${parsed.id}/onlinestatus/`);
            let json = await res.json();
            console.log(json);
                let embed = new Discord.MessageEmbed()
                    .setAuthor(playerInfo.username)
                    .setDescription("A member from Hydra International has been logged")
                    .addFields(
                        { name: "Profile Link:", value: `https://www.roblox.com/users/${parsed.id}/profile`, inline: false },
                        {
                            name: "Player Information", value: [
                                `Name: ${playerInfo.username}`,
                                `ID: ${parsed.id}`,
                                `Track ID: 4531A41DQ`,
                                 `Is online?: ${json.IsOnline}`,
                                `Last online?: ${json.LastOnline}`,
                                `Users status?: ${json.LastLocation}`,
                                `Age: ${playerInfo.age} days old.`

                            ].join("\n"), inline: false
                        }
                    .setTimestamp()
          logChannel2.send(embed);
            if (json.PlaceId !== parsed.lastPlace && bot.config.places.includes(json.PlaceId)) {
                let playerInfo = await bot.rbx.getPlayerInfo(parsed.id);

                let embed = new Discord.MessageEmbed()
                    .setAuthor(playerInfo.username)
                    .setDescription("!")
                    .setTimestamp()

                let logChannel = guild.channels.cache.get(bot.config.logChannel);
                if (logChannel) logChannel.send(embed);

                let obj = {
                    username: playerInfo.username,
                    id: parsed.id,
                    lastPlace: json.PlaceId
                }

                db.set(`track_${guild.id}_${parsed.id}`, obj);

            }
        });
    }

    login(bot.config.cookie);
    checkTracks(bot.config.guildId);
    setInterval(() => {
        checkTracks(bot.config.guildId);
    }, 60000)
}
// this code was good until i fucked it -Alan
