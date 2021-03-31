require("dotenv").config();
const { Client, Collection } = require("discord.js");
const { readdirSync } = require("fs");

const bot = new Client({
    fetchAllMembers: true
});

module.exports = { bot };

const express = require("express");
const app = express();

const listener = app.listen(process.env.PORT, () => {
    console.log("Listening on port " + listener.address().port);
});

app.get("/", (req, res) => {
    res.sendStatus(200);
});

bot.categories = readdirSync("./commands/");
bot.commands = new Collection();
bot.aliases = new Collection();
bot.cooldowns = new Collection();
bot.config = require("./config.json");
bot.db = require("quick.db");
bot.rbx = require("noblox.js");

["command", "event"].forEach(handler => {
    require(`./handlers/${handler}`)(bot);
});

bot.login(process.env.TOKEN3);