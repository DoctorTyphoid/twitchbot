const TB = require("twitch-bot");
require("dotenv").config();

var guesses = [{}];
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
var started = false;
Bot.on("message", chatter => {
  var wholeMessage = chatter.message.split(" ");

  if (wholeMessage[0] === "!timer") {
    var badges = chatter.badges;
    //console.log(parseInt(wholeMessage[1]));

    //console.log(guess);

    if (badges.broadcaster === 1 || badges.moderator === 1) {
      if (started === false && wholeMessage[1] === "start") {
        Bot.say(
          `${
            chatter.username
          } has started the 30 min countdown! Place your time bets now using: !time [hours:mins]`
        );

        started = true;
      } else if (started === true && wholeMessage[1] === "end") {
        Bot.say(`${chatter.username} has ended the guessing.`);
        started = false;
      } else if (started === true && wholeMessage[1] === "results") {
        guesses.forEach(() => {
          console.log(guesses);
        });
      }
    }
  }
  if (wholeMessage[0] === "!time") {
    if (wholeMessage[1] != "start" && wholeMessage[1] != "end") {
      if (started === true) {
        var guessedUser = chatter.username;
        var guess = wholeMessage[1];
        guess = guess.split(":");

        if (!isNaN(guess[0]) && !isNaN(guess[1])) {
          Bot.say(`@${guessedUser} has guessed ${guess[0]}:${guess[1]}`);
          guess = parseInt((guess = guess[0] + guess[1]));
          userGuesses(guessedUser, guess);
        } else {
          Bot.say(`@${guessedUser}, please only enter numbers!`);
        }
      }
    }
  }
});
function userGuesses(user, guess2) {
  // if(guesses[user] != user){
  //   guesses[user] = {};
  //   var entries = ip[ipID];
  // };
  // guesses["guess3"] = guess2;

  if (user == null && guess2 == null) {
    return guesses;
  }
}
