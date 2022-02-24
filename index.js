  //require("dotenv").config();
require("dotenv");
const { Client, Collection } = require("discord.js");
const { readdirSync } = require("fs");
const bot = new Client({
  fetchAllMembers: true,
   disableMentions: 'everyone'
});
const config = require('./config.js');
const { doesNotReject } = require('assert');
 const prettyMilliseconds = require('pretty-ms');

	dashboard = require('./dashboard/index'),




module.exports = { bot };


const noblox = require("noblox.js");
bot.categories = readdirSync("./commands/");
bot.commands = new Collection();
bot.aliases = new Collection();
bot.cooldowns = new Collection();
bot.db = require("quick.db");
bot.rbx = require("noblox.js");

//const mainTracker = require("./tracker/mainTracker");
//const tFunctions = require("./tracker/functions");


["command", "event"].forEach(handler => {
  require(`./handlers/${handler}`)(bot);
});
//bot.on("ready", async () => {
 // tFunctions.login();
 // await tFunctions.wait(5000);
 //   mainTracker.start(bot);
// })
bot.snipe = new Map();
bot.on("messageDelete", function(message, channel) {
  bot.snipe.set(message.channel.id, {
    content: message.content,
    author: message.author.tag,
    image: message.attachments.first()
      ? message.attachments.first().proxyURL
      : null
  });
});

  




 
bot.login(process.env.TOKEN3);
dashboard(bot);