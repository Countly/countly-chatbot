var utils = require("../common/utils");
var request = require("request");
module.exports = function(controller, bot, helps){
    //translate
    //https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=lv&dt=t&q=difference
    helps.push("translate \"{term}\" from {ln} to {ln}");
    controller.hears(['translate "([^"]*)" from ([a-zA-Z]{0,2}) to ([a-zA-Z\s]{0,2})'], ['ambient','direct_message','direct_mention', 'mention'], function(bot, message) {
        request({uri:"https://translate.googleapis.com/translate_a/single", qs:{client:"gtx", sl:message.match[2].trim(), tl:message.match[3].trim(), dt:"t", q:message.match[1].trim()}}, function (error, response, body) {
            try{
                body = JSON.parse(body);
            }
            catch(err){}
            if(body && body[0] && body[0][0] && body[0][0][0]){
                bot.reply(message, body[0][0][0]);
            }
        });
    });
};