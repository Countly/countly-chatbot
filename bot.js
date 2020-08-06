var Botkit = require('botkit');
var config = require("./config.js");
var utils = require("./common/utils.js");

var controller = Botkit.slackbot({
    debug: true,
});

var bot;
function start_rtm (){
    bot = controller.spawn({
        token: config.slack_token
    }).startRTM();
}

controller.on('rtm_close', function(bot, err) {
    start_rtm();
});

start_rtm();

bot.api.users.setPresence({presence:"auto"},function(err,response) {});

bot._isSilent = false;

bot._reply = bot.reply;
bot.reply = function(){
    if(!bot._isSilent){
        bot._reply.apply(bot, arguments);
    }
}
var helps = [];

if(config.conversations){
    for(var i in config.conversations){
        try{
            require("./conversations/"+i)(controller, bot, helps, config.conversations[i]);
        }
        catch(ex){console.log(ex);}
    }
}

controller.hears(['help me', 'what([^!.?,]*)can([^!.?,]*)do', 'need([^!.?,]*)help'], ['ambient','direct_message','direct_mention', 'mention'], function(bot, message) {
    var resp = "You can say:\n";
    for(var i = 0; i < helps.length; i++){
        resp += helps[i]+"\n";
    }
    bot._reply(message, resp);
});

helps.push("shut up");
controller.hears(['shut up'], ['ambient','direct_message','direct_mention', 'mention'], function(bot, message) {
    bot.reply(message, ":mute:");
    bot._isSilent = true;
    bot.api.users.setPresence({presence:"away"},function(err,response) {});
});

helps.push("speak up");
controller.hears(['speak up'], ['ambient','direct_message','direct_mention', 'mention'], function(bot, message) {
    bot._isSilent = false;
    bot.api.users.setPresence({presence:"auto"},function(err,response) {});
    bot.reply(message, "What's up?");
});