const db = require('quick.db');

module.exports = {
        name: "disablemuterole",
        aliases: ['clearmuterole', 'dmr', 'disablemr', 'dmrole'],
        description: 'Disables Server Mute Role',
           category: "config",
        usage: '[role name | role mention | role ID]',
      run: async (bot, message, args) => {
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("**You Do Not Have The Required Permissions! - [ADMINISTRATOR]**")
                          const sembed3 = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle(module.exports.name || "Null")      
              .addField("aliases", module.exports.aliases || "Null")
         .addField("description", module.exports.description || "Null")
              .addField("usage", module.exports.usage || "Null")
        .addField("category", module.exports.category || "Null")
          .addField("Cooldown", module.exports.cooldown || "Null")
        try {
            let a = db.fetch(`muterole_${message.guild.id}`)

            if (!a) {
                return message.channel.send(sembed3)
            } else {
                let role = message.guild.roles.cache.get(a)
                db.delete(`muterole_${message.guild.id}`)

                message.channel.send(`**\`${role.name}\` Has Been Successfully Disabled**`)
            }
            return;
        } catch {
            return message.channel.send("**Error - `Missing Permissions or Role Doesn't Exist`**")
        }
    }
}