var utils = require("../common/utils");
var request = require("request");
module.exports = function(controller, bot, helps){

    //urban
    helps.push("random idea");
    controller.hears(["random idea", "give me idea", "what feature"], ['ambient','direct_message','direct_mention', 'mention'], function(bot, message) {
        request("http://itsthisforthat.com/api.php?json", function (error, response, body) {
            try{
                body = JSON.parse(body);
            }
            catch(err){}
            if(body && body.this && body.that){
                var start = ["Develop", "Do", "Create", "Work on", "Let's do", "How about", "Maybe", "Have you tried", "What about"];
                var rep = start[utils.getRandomInt(0,start.length-1)];
                bot.reply(message, rep + " " + body.this + " for " + body.that);
            }
        });
    });
};