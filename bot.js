var Botkit = require('botkit');
var config = require("./config.js");

var controller = Botkit.slackbot({
    debug: true,
});

var bot = controller.spawn({
    token: config.slack_token
}).startRTM();
var helps = [];
require("./conversations/talk")(controller, bot, helps);
require("./conversations/apps")(controller, bot, helps);
require("./conversations/management")(controller, bot, helps);

controller.hears(['help me', 'what(.*)can(.*)do', 'need(.*)help'], 'direct_message,direct_mention,mention', function(bot, message) {
    var resp = "You can say:\n";
    for(var i = 0; i < helps.length; i++){
        resp += helps[i]+"\n";
    }
    bot.reply(message, resp);
});