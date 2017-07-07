var utils = require("../common/utils");
var request = require("request");
module.exports = function(controller, bot, helps){

    //urban
    helps.push("what is {term}");
    controller.hears(["(who|what) is ([^!.?,]*)", "(who|what)\'s ([^!.?,]*)"], ['ambient','direct_message','direct_mention', 'mention'], function(bot, message) {
        request({uri:"http://api.urbandictionary.com/v0/define", qs:{term:message.match[2].trim()}}, function (error, response, body) {
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