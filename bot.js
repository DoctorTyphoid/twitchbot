const TB = require("twitch-bot");
require("dotenv").config();

const Bot = new TB({
  username: process.env.BOT_USERNAME,
  oauth: process.env.BOT_OAUTH,
  channels: [process.env.BOT_CHANNEL]
});

Bot.on("join", channel => {
  console.log(`Joined channel: ${channel}`);
});
Bot.on("error", err => {
  console.log(err);
});
Bot.on("message", chatter => {
  if (chatter.message === "!timer") {
    Bot.say(`Mark is hella sexy: @${chatter.username}`);
  }
});
