const Discord = require("discord.js");
const fetch = require("node-fetch");
const _ = require("lodash");
const moment = require("moment");
require("moment-duration-format");
const discordIcon = "https://cdn.discordapp.com/emojis/555869594581991428.png?v=1";
const robloxIcon = "https://cdn.discordapp.com/emojis/693218877500293131.png?v=1";

const status = {
  online: `\`Online\``,
  dnd: `\`Do Not Disturb\``,
  idle: `\`Idle\``,
  offline: `\`Offline\``
}

const device = {
  web: `:globe_with_meridians: \`Browser\``,
  mobile: `:mobile_phone: \`Mobile\``,
  desktop: `:computer: \`Desktop\``
}

module.exports = {
  name: "robloxprofile",
  category: "military simulator",
  description: "View Discord and ROBLOX account data for a user.",
  usage: ["[@user]"],
  aliases: ["userinfo", "profile"],
  cooldown: 5,
  run: async (bot, message, args) => {


    let member = args.length ? resolveMember(message, args.join(" ")) : message.member;
    if (!member) return message.channel.send(genEmbed({
      title: "Error",
      description: `Couldn't find user ${args.join(" ")}`
    }));

    async function awaitReactions(msg, filter, reactions = [], messages = []) {
      for (const reaction of reactions) await msg.react(reaction);

      return msg.awaitReactions(filter, {
        max: 1,
        time: 300000,
        errors: ["time"]
      })
        .then(async (collected) => {
          if (collected.first() && collected.first().emoji.name === "⏹") {
            msg.delete();
            message.delete();
            bot.active.delete(message.author.id);
            messages.forEach(msg => msg.delete().catch(() => false));
            return false;
          }

          return collected.first();
        })
        .catch(async () => {
          msg.delete();
          message.delete();
          bot.active.delete(message.author.id);
          messages.forEach(msg => msg.delete().catch(() => false));
          return false;
        })
    }

    const reactions = ["🇩", "🇷", "🇬", "🇧", "🇫", "⏹"];

    const mainEmbed = new Discord.MessageEmbed()
      .setFooter(bot.user.username, bot.user.displayAvatarURL())
      .setAuthor(member.user.tag, member.user.displayAvatarURL({
        dynamic: true
      }))
      .setDescription([
        "React with the emote in order to choose an option.",
        "",
        "🇩 - View Discord Info for user.",
        "🇷 - View ROBLOX Info for user.",
        "🇬 - View a list of user's ROBLOX groups.",
        "🇧 - View a list of user's ROBLOX badges.",
        "🇫 - View a list of user's ROBLOX friends.",
        "",
        "⏹ - Cancel the prompt."
      ].join("\n"))

    async function prompt(value) {

      let userId;
      let res = await fetch(`https://api.blox.link/v1/user/${member.user.id}`);
      let body = await res.json();

      if (body.status === "err") {
        userId = null;
      } else {
        userId = body.primaryAccount;
      }

      switch (value) {
        case 0: {
          let msg = await message.channel.send(mainEmbed);

          let filter = (reaction, user) => {
            return reactions.includes(reaction.emoji.name) && user.id === message.author.id;
          }

          let returnCollect = await awaitReactions(msg, filter, reactions);
          if (returnCollect.emoji) {
            await msg.delete();
            return prompt(returnCollect.emoji.name);
          } else return;
        }
        case "🇩": {
          const roles = member.roles.cache
            .sort((a, b) => (a.position !== b.position) ? b.position - a.position : a.id - b.id)
            .map(role => role)
            .filter(role => role.id !== message.guild.id)

          const joinPos = [...message.guild.members.cache.values()]
            .sort((a, b) => (a.joinedAt < b.joinedAt) ? -1 : ((a.joinedAt > b.joinedAt) ? 1 : 0))
            .filter(m => !m.user.bot)
            .findIndex(m => m.id === member.id) + 1

          const daysCreated = moment.duration((Date.now() - member.user.createdAt) / 1000, "seconds").format([
            moment.duration(1, "day")
          ], "d [days]");

          const daysJoined = moment.duration((Date.now() - member.joinedAt) / 1000, "seconds").format([
            moment.duration(1, "day")
          ], "d [days]");

          let discordEmbed = new Discord.MessageEmbed()
            .setAuthor(`Viewing Discord Info for ${member.user.tag}`, discordIcon)
            .setThumbnail(member.user.displayAvatarURL({
              dynamic: true
            }))
            .setFooter(`User ID: ${member.user.id}`)
            .addFields({
              name: "Created",
              value: [
                `\`${moment.unix(member.user.createdAt / 1000).format("M/D/YYYY, h:m A")}\``,
                `\`(${daysCreated} ago)\``
              ].join("\n")
            }, {
                name: "Joined",
                value: [
                  `\`${moment.unix(member.joinedAt / 1000).format("M/D/YYYY, h:m A")}\``,
                  `\`(${daysJoined} ago)\``
                ].join("\n")
              }, {
                name: "Join Position",
                value: `\`${joinPos}\``,
                inline: true
              }, {
                name: "Status",
                value: status[member.user.presence.status],
                inline: true
              }, {
                name: "MSRghest Role",
                value: member.roles.MSRghest.id === message.guild.id ? "None" : member.roles.MSRghest,
                inline: true
              }, {
                name: `Roles [${roles.length}]`,
                value: roles.length <= 15 ? roles.join(" ") : roles.length !== 0 ? trimArray(roles, 15).join(" ") : "None"
              })

          let discordInfoMessage = await message.channel.send(discordEmbed);

          for (const reaction of ["⏹"]) await discordInfoMessage.react(reaction);

          return discordInfoMessage.awaitReactions((reaction, user) => ["⏹"].includes(reaction.emoji.name) && user.id === message.author.id, {
            max: 1,
            time: 300000,
            errors: ["time"]
          })
            .then(async (collected) => {
              if (collected.first().emoji && collected.first().emoji.name === "⏹") {
                discordInfoMessage.delete();
                return prompt(0);
              }
            })
            .catch(async () => {
              bot.active.delete(message.author.id);
              discordInfoMessage.reactions.removeAll();
            })
        }
        case "🇷": {
          let robloxEmbed = new Discord.MessageEmbed()
            .setFooter(bot.user.username, bot.user.displayAvatarURL())
            .setAuthor(`Viewing ROBLOX Info for ${member.user.tag}`, member.user.displayAvatarURL({
              dynamic: true
            }))

          if (!userId) {
            robloxEmbed.setDescription("User is not verified.");
          } else {
            let info = await bot.rbx.getPlayerInfo(Number(userId));

            let mugshotRes = await fetch(`https://www.roblox.com/headshot-thumbnail/json?userId=${userId}&width=180&height=180`);
            let mugshotJson = await mugshotRes.json()
            let mugshot = mugshotJson.Url;

            let date = Date.parse(info.joinDate);

            let robloxEmbed = new Discord.MessageEmbed()
              .setThumbnail(mugshot)
              .setAuthor(`Viewing ROBLOX Info for ${member.user.tag}`, robloxIcon)
              .setFooter(`Followers: ${info.followerCount} | Following: ${info.followingCount}`)
              .setTitle(info.username)
              .setURL(`https://www.roblox.com/users/${userId}/profile`)
              .addFields({
                name: "Username",
                value: `\`${info.username}\``,
                inline: true
              }, {
                  name: "ID",
                  value: `\`${userId}\``,
                  inline: true
                }, {
                  name: "Account Created",
                  value: [
                    `\`${moment.unix(date / 1000).format("M/D/YYYY, h:m A")}\``,
                    `\`(${info.age} days ago)\``
                  ],
                  inline: true
                }, {
                  name: "Past Usernames",
                  value: `\`${!info.oldNames.length ? "None" : info.oldNames.join("\n")}\``,
                  inline: true
                }, {
                  name: "Banned",
                  value: `\`${info.banned ? "Yes" : "No"}\``,
                  inline: true
                }, {
                  name: "Friends",
                  value: `\`${info.friendCount}\``,
                  inline: true
                }, {
                  name: "Description",
                  value: `\`${info.blurb === "" ? "None" : info.blurb}\``,
                  inline: true
                }, {
                  name: "Status",
                  value: `\`${info.status === "" ? "None" : info.status}\``,
                  inline: true
                })

            let robloxInfoMessage = await message.channel.send(robloxEmbed);

            for (const reaction of ["⏹"]) await robloxInfoMessage.react(reaction);

            return robloxInfoMessage.awaitReactions((reaction, user) => ["⏹"].includes(reaction.emoji.name) && user.id === message.author.id, {
              max: 1,
              time: 300000,
              errors: ["time"]
            })
              .then(async (collected) => {
                if (collected.first().emoji && collected.first().emoji.name === "⏹") {
                  robloxInfoMessage.delete();
                  return prompt(0);
                }
              })
              .catch(async () => {
                bot.active.delete(message.author.id);
                robloxInfoMessage.reactions.removeAll();
              })
          }
        }
        case "🇬": {
          let groupsEmbed = new Discord.MessageEmbed()
            .setFooter(bot.user.username, bot.user.displayAvatarURL())
            .setAuthor(`Viewing ROBLOX groups for ${member.user.tag}`, robloxIcon)

          let embedsGroups = [];
          if (!userId) {
            embedsGroups.push(groupsEmbed.setDescription("User is not verified."));
          } else {
            let groups = await bot.rbx.getGroups(Number(userId));

            if (!groups.length) {
              embedsGroups.push(groupsEmbed.setDescription("User isn't in any groups."));
            } else {
              let chunked = _.chunk(groups, 15);

              for (let i = 0; i < chunked.length; i++) {
                embedsGroups.push(new Discord.MessageEmbed()
                  .setFooter(bot.user.username, bot.user.displayAvatarURL())
                  .setAuthor(`Viewing ROBLOX groups for ${member.user.tag}`, robloxIcon)
                  .setDescription(chunked[i].map(group => `\`${group.Name}\` ❯ ${group.Role} (${group.Rank})`).join("\n"))
                )
              }
            }
          }

          return pages(prompt, message, embedsGroups)
        }
        case "🇧": {
          let badgesEmbed = new Discord.MessageEmbed()
            .setFooter(bot.user.username, bot.user.displayAvatarURL())
            .setAuthor(`Viewing ROBLOX badges for ${member.user.tag}`, robloxIcon)

          let embedsBadges = [];
          if (!userId) {
            embedsBadges.push(badgesEmbed.setDescription("User is not verified."));
          } else {
            let badges = await bot.rbx.getPlayerBadges({
              userId: Number(userId),
              limit: 50,
              sortOrder: "desc"
            });

            if (!badges.length) {
              embedsBadges.push(badgesEmbed.setDescription("User doesn't have any badges."));
            } else {
              let chunked = _.chunk(badges, 15);

              for (let i = 0; i < chunked.length; i++) {
                embedsBadges.push(new Discord.MessageEmbed()
                  .setFooter(bot.user.username, bot.user.displayAvatarURL())
                  .setAuthor(`Viewing ROBLOX badges for ${member.user.username}`, robloxIcon)
                  .setDescription(chunked[i].map(badge => `\`${badge.name} (${badge.id})\` ❯ ${badge.description}`).join("\n"))
                )
              }
            }
          }

          return pages(prompt, message, embedsBadges);
        }
        case "🇫": {
          let friendsEmbed = new Discord.MessageEmbed()
            .setFooter(bot.user.username, bot.user.displayAvatarURL())
            .setAuthor(`Viewing ROBLOX friends for ${member.user.tag}`, robloxIcon)

          let embedsFriends = [];
          if (!userId) {
            embedsFriends.push(friendsEmbed.setDescription("User is not verified."));
          } else {
            let friends = await bot.rbx.getFriends(Number(userId));

            if (!friends.data.length) {
              embedsFriends.push(friendsEmbed.setDescription("User doesn't have any friends."));
            } else {
              let chunked = _.chunk(friends.data, 100);

              for (let i = 0; i < chunked.length; i++) {
                let index = chunked[i].length > 1 ? Math.ceil(chunked[i].length / 2) : null;
                let arr = chunked[i].map(friend => friend.name);

                let embedChunkedFriends = new Discord.MessageEmbed()
                  .setFooter(bot.user.username, bot.user.displayAvatarURL())
                  .setAuthor(`Viewing ROBLOX friends for ${member.user.tag}`, robloxIcon)

                if (index) {
                  embedChunkedFriends.addField("\u200B", arr.slice(0, index).join("\n"), true);
                  embedChunkedFriends.addField("\u200B", arr.slice(index).join("\n"), true);
                } else {
                  embedChunkedFriends.addField("\u200B", arr.join("\n"), true);
                }

                embedsFriends.push(embedChunkedFriends);
              }
            }
          }

          return pages(prompt, message, embedsFriends);
        }
      }
    }

    prompt(0);
  }
}

async function pages(prompt, message, content, options = {
  time: 300000,
  startPage: 0,
  MSRdeControlsSinglePage: false,
  timeoutRemoveReactions: true,
  removeReaction: true
}) {
  if (!(content instanceof Array)) throw new TypeError("Content is not an array.");
  if (!content.length) throw new Error("Content array is empty.");
  let removeReaction = options.removeReaction;

  const emojis = {
    left: "⬅️",
    end: "⏹️",
    right: "➡️",
  }

  const time = options.time;
  const MSRdeControlsSinglePage = options.MSRdeControlsSinglePage;

  if (MSRdeControlsSinglePage && content.length === 1) {
    content[0].author.name = content[0].author.name.replace("{{current}}", 1).replace("{{total}}", 1);
    await message.channel.send(content instanceof Discord.MessageEmbed ? {
      embed: content[0]
    } : content[0]);
    return;
  }

  const filter = (reaction, user) => {
    return user.id === message.author.id && !user.bot && (Object.values(emojis).includes(reaction.emoji.name) || Object.values(emojis).includes(reaction.emoji.id))
  }

  let page = options.startPage;
  content[page].author.name = content[page].author.name.replace("{{current}}", page + 1).replace("{{total}}", content.length.toString());
  const msg = await message.channel.send(content[page] instanceof Discord.MessageEmbed ? {
    embed: content[page]
  } : content[page]);

  for (const emoji in emojis) await msg.react(emojis[emoji]);

  const collector = msg.createReactionCollector(filter, {
    time: time
  });
  collector.on("collect", ({
    users,
    emoji: {
      id,
      name
    }
  }, user) => {
    if (emojis.left && (id === emojis.left || name === emojis.left)) {
      page = page > 0 ? page - 1 : content.length - 1;
      if (removeReaction) users.remove(user.id);
    } else if (emojis.right && (id === emojis.right || name === emojis.right)) {
      page = page + 1 < content.length ? page + 1 : 0;
      if (removeReaction) users.remove(user.id);
    } else if (emojis.end && (id === emojis.end || name === emojis.end)) {
      msg.delete().catch(() => false);
      collector.stop();
      prompt(0);
      return;
    }
    if (msg) {
      content[page].author.name = content[page].author.name.replace("{{current}}", page + 1).replace("{{total}}", content.length.toString());
      if (content[page] instanceof Discord.MessageEmbed) msg.edit({
        embed: content[page]
      });
      else msg.edit(content[page]);
    }
  });

  collector.on("end", () => {
    bot.active.delete(message.author.id);
    if (msg) msg.reactions.removeAll();
  })
}

function resolveMember(message, toFind = "") {
  toFind = toFind.toLowerCase();

  let target = message.guild.members.cache.get(toFind);

  if (!target && message.mentions.members) {
    target = message.mentions.members.first();
  }

  if (!target && toFind) {
    target = message.guild.members.cache.find(member => {
      return (
        member.user.username.toLowerCase().includes(toFind) ||
        member.user.tag.toLowerCase().includes(toFind)
      );
    });
  }

  if (!target) return null;

  return target;
}

function genEmbed(options = {}) {
  let embed = new Discord.MessageEmbed()
    .setTitle(options.title || "")
    .setDescription(options.description || "")
    .setColor("RANDOM")
    .setThumbnail(options.thumbnail || "")
    .setImage(options.image || "")
    .setFooter("MSR")

  if (options.footer) embed.setFooter(options.footer.text || "", options.footer.image || null);
  if (options.timestamp) embed.setTimestamp();
  if (options.author) embed.setAuthor(options.author.name || "", options.author.image || null, options.author.url || null);

  if (options.fields) {
    for (let i = 0; i < options.fields.length; i++) {
      embed.addField(options.fields[i].name, options.fields[i].desc, options.fields[i].inline || false);
    }
  }

  return embed;
}

function trimArray(arr, maxLen = 10) {
  if (arr.length > maxLen) {
    const len = arr.length - maxLen;
    arr = arr.slice(0, maxLen);
    arr.push(`and ${len} more...`);
  }

  return arr;
}