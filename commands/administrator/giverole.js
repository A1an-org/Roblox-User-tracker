const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'giverole',
    category: "moderation",
    description: "Give a role to a user",
    usage: "Role <@user> <raeson>",
     cooldown: 50000,
    run: async (client, message, args) => {
                     const sembed3 = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle(module.exports.name || "Null")      
              .addField("aliases", module.exports.aliases || "Null")
         .addField("description", module.exports.description || "Null")
              .addField("usage", module.exports.usage || "Null")
        .addField("category", module.exports.category || "Null")
          .addField("Cooldown", module.exports.cooldown || "Null")
        message.delete();

        if (!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send(`You do not have MANAGE_ROLES permission`).then(m => m.delete({ timeout: 5000 }));

        if (!args[0] || !args[1]) return message.channel.send(sembed3).then(m => m.delete({ timeout: 5000 }))

        try {
 
             const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
             const roleName = message.guild.roles.cache.find(r => (r.name === args[1].toString()) || (r.id === args[1].toString().replace(/[^\w\s]/gi, '')));
            const embed2 = new MessageEmbed()
                 .setTitle(`Role Name: ${roleName.name}`)
                 .setDescription(`${message.author} has successfully removed the role ${roleName} from ${member.user}`)
                 .setColor('f3f3f3')
                 .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                 .setFooter(new Date().toLocaleString())
             const alreadyHasRole = member._roles.includes(roleName.id);

             if (alreadyHasRole) return message.channel.send(embed2).then(m => member.roles.remove(roleName));

             const embed = new MessageEmbed()
                 .setTitle(`Role Name: ${roleName.name}`)
                 .setDescription(`${message.author} has successfully given the role ${roleName} to ${member.user}`)
                 .setColor('f3f3f3')
                 .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                 .setFooter(new Date().toLocaleString())

            return member.roles.add(roleName).then(() => message.channel.send(embed));
        } catch (e) {
            return message.channel.send(sembed3).then(m => m.delete({ timeout: 5000 })).then(() => console.log(e))
        }
    }
}