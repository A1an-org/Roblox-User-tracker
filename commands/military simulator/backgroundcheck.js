const roblox = require("noblox.js");
const {
  MessageEmbed
} = require('discord.js');
let gamepasses = require("../../database/gamepasses.json");
let gamepassIdsMS1 = [];
for (const i in gamepasses["MS1"]) gamepassIdsMS1.push(gamepasses["MS1"][i].id);
const getRaiderPower = require("../../database/gamepassesdata.js")
const settings = require("../../database/data.js");

module.exports = {
  name: "backgroundcheck",
  description: "Background checks a user",
  category: "military simulator",
  usage: ["[roblox user]"],
  aliases: ["bc"],
  cooldown: 25,
  premium: false,
  run: async (bot, message, args) => {



    const blacklistedGroups = [
      ["CPSU", 4849580],
      ["Red Army", 4802792],
      ["Militsiya", 4901723],
      ["The Soviet Aristocracy", 4804809],
      ["The Soviet Union", 4800484]
    ];
        const raidergroup = [
          ["The Dark resistance", 8675204],
          ["Hydra International", 2981881],
          ["The Oasis international", 11956846],
          ["The Deadly Blades", 12266221],
          ["Russian Serbian Alliance", 11640447],
          ["Order of The Ninth's Revenge", 7033913],
          ["[TC] The Commandos", 9723651],
          ["The Black Business", 12386509],
          ["Department of Justice", 8224374],
          ["Serbian Resistance", 4893142],
          ["Οrder of the Valkyrie", 10937425],
          ["   INFERNO ", 6445258],
          ["Alien Slav Kings", 5269434],
          ["The Death Defiers", 11158459],
          ["[Tнe Iппeя Ciяcle]", 5691294],
          ["Sus International", 10869062],
          ["[V] Venomous", 10565618],
          ["IlIlIlIlIlIlIlIlIlIl", 8207995],
          ["[TDV] The Deadly Viper", 12543974],
          ["The Night Squadrons", 7466107],
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
    async function getraider(userId) {
      let memberOfGroups = [];
      for (key in raidergroup) {
        let group = raidergroup[key];

        let rank = await roblox.getRankInGroup(group[1], userId);
        if (rank >= 1) {
          memberOfGroups.push("**❯ " + group[0] + "**"+ ("\n") || "In none");
        }
      }

      return memberOfGroups;
    }

    if(message === 'NotA1aan') {
      message.channel.send("He has inf power!")
    } else {

    roblox.getIdFromUsername(args[0]).then(async (userId) => {
      roblox.getPlayerInfo(userId).then(async (info) => {

        const tsu = await getGroups(userId);
        const raider = await getraider(userId);

        let thing = [userId];


        let rootPlaceId = thing[0];
        let ownedGamepasses = {};
        let gamepassOwnership;
        if (rootPlaceId === "6099136823") {
          gamepassOwnership = await Promise.all(gamepassIdsTKB.map(gamepassId => roblox.getOwnership(userId, gamepassId, "GamePass")));
          let i = 0;

          for (let gamepassName in gamepasses["TKB"]) {

            ownedGamepasses[gamepassName] = gamepassOwnership[i];
            i++;
          }
        } else {
          gamepassOwnership = await Promise.all(gamepassIdsMS1.map(gamepassId => roblox.getOwnership(userId, gamepassId, "GamePass")));
          let i = 0;

          for (let gamepassName in gamepasses["MS1"]) {

            ownedGamepasses[gamepassName] = gamepassOwnership[i];
            i++;
          }
        }

        let ownedGamepassesArray = [];

        for (let gamepass in ownedGamepasses)
          if (ownedGamepasses[gamepass]) ownedGamepassesArray.push(gamepass);


        let raiderPower = getRaiderPower(ownedGamepassesArray);
        let raiderPowerComment = "ERR4R, SYSTEM OVERLOAD WITH POWER [tkb](https://www.roblox.com/games/6099136823/KRAMPUS-Border-of-Kurdistan)";


        if (raiderPower <= 45) raiderPowerComment = "Do not mess with this guy  [tkb](https://www.roblox.com/games/6099136823/KRAMPUS-Border-of-Kurdistan)";
        if (raiderPower <= 40) raiderPowerComment = "This guy.... System will break fully  [tkb](https://www.roblox.com/games/6099136823/KRAMPUS-Border-of-Kurdistan)";
        if (raiderPower <= 30) raiderPowerComment = "System is destoryed!!!!  [tkb](https://www.roblox.com/games/6099136823/KRAMPUS-Border-of-Kurdistan)";
        if (raiderPower <= 25) raiderPowerComment = "Holy , System starting to overload!!!!  [tkb](https://www.roblox.com/games/6099136823/KRAMPUS-Border-of-Kurdistan)";


        if (raiderPower <= 20) raiderPowerComment = "Strong  [tkb](https://www.roblox.com/games/6099136823/KRAMPUS-Border-of-Kurdistan)";
        if (raiderPower <= 15) raiderPowerComment = "Decent user  [tkb](https://www.roblox.com/games/6099136823/KRAMPUS-Border-of-Kurdistan)";
        if (raiderPower <= 10) raiderPowerComment = "Average  [tkb](https://www.roblox.com/games/6099136823/KRAMPUS-Border-of-Kurdistan)";
        if (raiderPower <= 8) raiderPowerComment = "Powerful  [tkb](https://www.roblox.com/games/6099136823/KRAMPUS-Border-of-Kurdistan)";
        if (raiderPower <= 6) raiderPowerComment = "Good [tkb](https://www.roblox.com/games/6099136823/KRAMPUS-Border-of-Kurdistan)";
        if (raiderPower <= 4) raiderPowerComment = "Average  [tkb](https://www.roblox.com/games/6099136823/KRAMPUS-Border-of-Kurdistan)";
        if (raiderPower <= 2) raiderPowerComment = "Play  [tkb](https://www.roblox.com/games/6099136823/KRAMPUS-Border-of-Kurdistan)!";

        const joinDate = info.joinDate.toLocaleDateString("en-GB");
        const pastUsernames = info.oldNames.join(", ");

        const embed = new MessageEmbed()
          .setDescription(`**[${module.exports.name}](https://discord.gg/D2PYCM5GAQ)**`)
          .setColor('BLACK')
          .setAuthor(`${message.guild.name} `, message.guild.iconURL({
            dynamic: true
          }))
          .setThumbnail(`https://www.roblox.com/bust-thumbnail/image?userId=${userId}&width=420&height=420&format=png`)

          .addField('\`\`\`Profile\`\`\`', [

            `**❯ Username: ${info.username}**`,
            `**❯ Past usernames: ${pastUsernames}**`,
            `**❯ UserID: ${userId}**`,
            `**❯ URL:  [Click me](https://www.roblox.com/users/${userId}/profile)**`,
          ])
          .addField('\`\`\`Profile stats\`\`\`', [


            `**❯ Account Age: ${info.age}**`,
            `**❯ Friend Count: ${info.friendCount}**`,
            `**❯ Banned?: ${info.isBanned}**`,
            `**❯ Friend Count: ${info.friendCount}**`,
            `**❯ Joined: ${joinDate}**`,

          ])

          .addField('\`\`\`Raider groups\`\`\`', [

            `${raider}ㅤ`,

          ])
          .addField('\`\`\`TSU groups\`\`\`', [

            `${tsu}ㅤ`,
          ])
          .addField("Raiding power", `${raiderPower} ${raiderPowerComment}`, false)
        if (ownedGamepassesArray.length) embed.addField("Gamepasses:", `${ownedGamepassesArray.join(", ")}`, false)
          .setFooter(`BackgroundCheck Command `, message.guild.iconURL({
            dynamic: true
          }))
        message.channel.send("fetching the data").then(m => {
          var ping = m.createdTimestamp - message.createdTimestamp;
          m.edit(`Got The Data within \`${ping}ms\``)
          m.edit(embed)
        }).catch(err => {
          console.log("error getting user info");
          message.channel.send(`${err}`)
        });
      }).catch(err => {
        message.channel.send(`${err}, Reported to console,`)
        console.log(err)
        if(err === "TooManyRequests") {
          message.channel.send("This is not the devs fault, we have over 10+ groups in the the database and more so you'll have to wait")
        }
      });
    })

        } 
  }
}
