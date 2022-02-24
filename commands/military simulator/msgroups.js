const {
  MessageEmbed
} = require('discord.js');




module.exports = {
  name: "msgroups",
  category: "military simulator",
  description: "All ms raiding groups that we can get",
  run: async (bot, message, args) => {
    const embed = new MessageEmbed()
      .setDescription(`**MS Raiding groups for __${message.guild.name}__**`)
      .setColor('BLACK')

      .setThumbnail(message.guild.iconURL({
        dynamic: true
      }))
      .addField('General', [
        `**❯ Hydra International [AoS] (2981881):** https://roblox.com/groups/2981881/Hydra-International`,
        `**❯ [DoJ] Department of Justice . [AoS] (8224374):** https://roblox.com/groups/8224374/DoJ-Department-of-Justice`,
        `**❯ [TC] The Commandos [AoS] (9723651):** https://roblox.com/groups/9723651/TC-The-Commandos`,
        `**❯ Οrder of the Valkyrie [AoS] (10937425):** https://roblox.com/groups/10937425/rder-of-the-Valkyrie`,
        `**❯ [TDR] The Dark Resistance [KoS] (8675204):** https://roblox.com/groups/8675204/TDR-The-Dark-Resistance`,
        `**❯ Order of The Ninth's Revenge [KoS] (7033913):** https://roblox.com/groups/7033913/Order-of-The-Ninths-Revenge`,
        `**❯ [RSA] Russian Serbian Alliance [Nan] (11640447):** https://roblox.com/groups/11640447/RSA-Russian-Serbian-Alliance#!/about`,
        `**❯ The Deadly Blades [Nan] (12266221):** https://roblox.com/groups/12266221/The-Deadly-Blades#!/about`,
        `**❯ The Black Business [Nan] (12386509):** https://roblox.com/groups/12386509/The-Black-Business#!/about`,

      ])
    const embed2 = new MessageEmbed()

      .setColor('BLACK')
      .setDescription(`**[${module.exports.name}](https://discord.gg/D2PYCM5GAQ)**`)
      .addField('ㅤ', [
        `**❯ Serbian Resistance
 [Nan] (4893142):** https://roblox.com/groups/4893142/Serbian-Resistance#!/about`,
        `**❯ The Death Defiers
 [Nan] (11158459):** https://roblox.com/groups/11158459/The-Death-Defiers#!/about`,
        `**❯ INFERNO // [Nan] (6445258):** https://roblox.com/groups/6445258/INFERNO#!/about`,
        `**❯ [Tнe Iппeя Ciяcle] [Nan] (5691294):** https://roblox.com/groups/5691294/T-e-I-e-Ci-cle#!/about`,
        `**❯ Alien slav kings [Nan] (5269434):** https://roblox.com/groups/5269434/Alien-Slav-Kings#!/about`,
        `**❯ [V] Venomous [Nan] (10565618):** https://roblox.com/groups/10565618/V-Venomous#!/about`,
        `**❯ [TDV] The Deadly Viper [Nan] (12543974):** https://roblox.com/groups/12543974/TDV-The-Deadly-Viper#!/about`,
        `**❯ The Night Squadrons
 [Nan] (7466107):** https://roblox.com/groups/7466107/The-Night-Squadrons#!/about`,
      ])


    message.channel.send("Fecting everything").then(m => {
      var ping = m.createdTimestamp - message.createdTimestamp;
      var botPing = Math.round(bot.pi);

      m.edit(`Got them`);
      m.edit(embed)
      m.channel.send(embed2)
    });
  }
}