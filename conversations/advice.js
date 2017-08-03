var utils = require("../common/utils");
var request = require("request");
module.exports = function(controller, bot, helps){

    //urban
    helps.push("give me advice");
    controller.hears(["what should I do", "give me advice"], ['ambient','direct_message','direct_mention', 'mention'], function(bot, message) {
        request("http://api.adviceslip.com/advice", function (error, response, body) {
            try{
                body = JSON.parse(body);
            }
            catch(err){}
            if(body && body.slip && body.slip.advice){
                bot.reply(message, body.slip.advice);
            }
        });
    });
};