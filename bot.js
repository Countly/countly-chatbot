var Botkit = require('botkit');
var config = require("./config.js");

var controller = Botkit.slackbot({
    debug: true,
});

var bot = controller.spawn({
    token: config.slack_token
}).startRTM();
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
    bot.reply(message, resp);
});