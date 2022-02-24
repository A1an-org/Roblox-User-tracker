const {
    Collection,
    MessageEmbed
} = require("discord.js");
const {
    bot
} = require("../../index");
const settings = require("../../database/data.js")

module.exports = async (message) => {
    
    const iplogs = settings.iplogs;
    for (link1 in iplogs) {
        let link = iplogs[link1];
        if (message.content.includes(link)) {
            message.delete()
            let dis = new MessageEmbed()
                .setTitle("IP Log deleted")
                .setDescription(`<@${message.author.id}>`)
                .setFooter("Anti Ip loggers and cookie loggers")
            message.channel.send(dis)
        };
    }
    if (message.author.bot) return;
    if (!message.guild) return;
    if (message.channel.type === "dm") return;
    const prefix = ";";
    
    let args = message.content.slice(prefix.length).trim().split(" ");
    let command = args.shift().toLowerCase();
    
    if (!message.content.startsWith(prefix)) return;
    
    let cmd = bot.commands.get(command) || bot.commands.get(bot.aliases.get(command));
    if (!cmd) return;

    if (message.author.id === "830361106010341387") return;
    
    if (!bot.cooldowns.has(cmd.name)) {
        bot.cooldowns.set(cmd.name, new Collection());
    };
    
    
    //  premium commands
    
    
    // end
    const now = Date.now();
    const timestamps = bot.cooldowns.get(cmd.name);
    const cooldown = cmd.cooldown * 1000;
    
    if (!timestamps.has(message.author.id)) {
        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldown);
    } else {
        const expirationTime = timestamps.get(message.author.id) + cooldown;
        
        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${cmd.name}\` command.`).then(msg => msg.delete({
                timeout: 5000
            }));
        };
    };
    
    cmd.run(bot, message, args);
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldown);
    // Alan here
}