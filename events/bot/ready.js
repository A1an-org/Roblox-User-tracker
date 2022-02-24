const  Discord = require("discord.js");
//const fetch = require("node-fetch");
const { bot } = require("../../index");
const noblox = require("noblox.js")

module.exports = () => {
    console.log(`Logged in as ${bot.user.username}`);
     bot.user.setStatus("idle")
     bot.user.setActivity(`for ;help. `, {type: "WATCHING"},  {status: 'DND'} )

}
// this code was good until i fucked it -Alan
