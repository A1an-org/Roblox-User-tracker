const roblox = require("noblox.js");
const {
    MessageEmbed
} = require('discord.js');
const settings = require("../../database/data.js");


module.exports = {
    name: "tsudivisioncheck",
    description: "tsudivisioncheck checks a user",
    category: "military simulator",
    usage: ["[roblox user]"],
    aliases: ["tdc"],
    cooldown: 3,
    run: async (bot, message, args) => {
      
       const servers = settings.premiumServers;
  for (link1 in servers) {
        let premiumServers = servers[link1];
        if (message.guild.id == premiumServers) {
        const blacklistedGroups = [
            ["CPSU", 4849580],
            ["Red Army", 4802792],
            ["Militsiya", 4901723],
            ["The Soviet Aristocracy", 4804809],
            ["The Soviet Union", 4800484],
            ["The Red Guard ", 4805062],
            ["Ministry of Defense .", 4849688],
            ["The Committee for State Security .", 4805092],
            ["Spetsnaz", 4808054],
            ["109th Infantry", 4808054],
            ["TFOC", 5687123],
            ["cru", 5737557],
            ["The 5th Rifle Division", 4948472],
        ];
        
        async function getGroups(userId) {
            let memberOfGroups = [];
            for (key in blacklistedGroups) {
                let group = blacklistedGroups[key];
                
                let rank = await roblox.getRankInGroup(group[1], userId);
                if (rank >= 1) {
                    memberOfGroups.push(group, ("\n") || "none");
                }
            }
            
            return memberOfGroups;
        }
        
        roblox.getIdFromUsername(args[0]).then(async (userId) => {
            roblox.getPlayerInfo(userId).then(async (info) => {
                const tsu = await getGroups(userId);
                
                const joinDate = info.joinDate.toLocaleDateString("en-GB");
                const pastUsernames = info.oldNames.join(", ");
                
                const embed = new MessageEmbed()
                    .setDescription(`**[${module.exports.name}](https://discord.gg/D2PYCM5GAQ)**`)
                    .setColor('BLACK')
                    .setAuthor(`${message.guild.name} | [tsudivisoncheck](https://discord.gg/D2PYCM5GAQ)  `, message.author.avatarURL())
                    .setThumbnail(`https://www.roblox.com/bust-thumbnail/image?userId=${userId}&width=420&height=420&format=png`)
                    .addField('\`\`\`Profile\`\`\`', [
                        
                        `**❯ Username: ${info.username}**`,
                        `**❯ Past usernames: ${pastUsernames}**`,
                        `**❯ UserID: ${userId}**`,
                        `**❯ Description: ${info.blurb}**`,
                        `**❯ URL:  [Click me](https://www.roblox.com/users/${userId}/profile)**`,
                    ])
                    .addField('\`\`\`Profile stats\`\`\`', [
                        
                        
                        `**❯ Account Age: ${info.age}**`,
                        `**❯ Friend Count: ${info.friendCount}**`,
                        `**❯ Banned?: ${info.isBanned}**`,
                        `**❯ Friend Count: ${info.friendCount}**`,
                        `**❯ Joined: ${joinDate}**`,
                        
                    ])
                    
                    
                    .addField('\`\`\`TSU groups\`\`\`', [
                        
                        `${tsu}ㅤ`,
                        
                    ])
                    .setFooter(`tsudivisioncheck Command`, message.author.avatarURL())
                message.channel.send("fetching the data").then(m => {
                    var ping = m.createdTimestamp - message.createdTimestamp;
                    m.edit(`Got The Data within \`${ping}ms\``)
                    m.edit(embed)
                }).catch(err => {
                    console.log("error getting user info");
                    message.channel.send(`${err}`)
                });
            }).catch(err => {
                message.channel.send(`${err}`)
            });
        })
    }
    else {

      return message.channel.send("premium server only command ")
    }
}}}