const roblox = require('noblox.js');

const Discord = require('discord.js');

const settings = require('./trackerSettings');



let players = []
let playingplayers = []
let offline = []



async function getGroups(groups) {
    const trackedGroups = settings.groups;   
    
    for (group1 in trackedGroups) {
        let group = groups.find(grp => grp.id === trackedGroups.id)
        if (group) {
            players.push(group);
            console.log(group)
            console.log(players)
        }
    }
    
    await functions.wait(1200);
    return [players];
    
}
set
module.exports = {
    tracker: getGroups,
}