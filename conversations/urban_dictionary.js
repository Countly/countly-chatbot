var utils = require("../common/utils");
var request = require("request");
module.exports = function(controller, bot, helps){

    //urban
    //helps.push("wat is dis {term}");
    controller.hears(["wat is dis ([^!.?,]*)"], ['ambient','direct_message','direct_mention', 'mention'], function(bot, message) {
        request({uri:"http://api.urbandictionary.com/v0/define", qs:{term:message.match[1].trim()}}, function (error, response, body) {
            try{
                body = JSON.parse(body);
            }
            catch(err){}
            if(body && body.list && body.list.length){
                var rep = body.list[utils.getRandomInt(0,body.list.length-1)];
                if(rep.definition)
                    bot.reply(message, rep.definition);
            }
        });
    });
};