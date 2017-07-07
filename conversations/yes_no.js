var utils = require("../common/utils");
var request = require("request");
module.exports = function(controller, bot, helps){
    helps.push("ask yes or no question");
    controller.hears(["^(do|does|am|is|are|can|could|have|had|was|were|will|did|should) (you|i|this|these|we|they|he|she|it|my|his|her|your|their|our)"], ['ambient','direct_message','direct_mention', 'mention'], function(bot, message) {
        request({uri:"https://yesno.wtf/api/"}, function (error, response, body) {
            try{
                body = JSON.parse(body);
            }
            catch(err){}

            if(body.answer){
                bot.reply(message, body.answer+((body.image)?"\n"+body.image:""));
            }
        });
    });
};