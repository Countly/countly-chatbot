var utils = require("../common/utils");
var request = require("request");
module.exports = function(controller, bot, helps, config){

    //urban
    helps.push("what is {term}");
    controller.hears(["(who|what) is ([^!.?,]*)", "(who|what)\'s ([^!.?,]*)"], ['ambient','direct_message','direct_mention', 'mention'], function(bot, message) {
        request({uri:"https://od-api.oxforddictionaries.com/api/v1/entries/en/"+encodeURIComponent(message.match[2].trim()), headers:{app_id: config.app_id,app_key: config.app_key}}, function (error, response, body) {
            try{
                body = JSON.parse(body);
            }
            catch(err){}
            if(body && body.results && body.results[0] && body.results[0].lexicalEntries && body.results[0].lexicalEntries[0] && 
                body.results[0].lexicalEntries[0].entries && body.results[0].lexicalEntries[0].entries[0] && 
                body.results[0].lexicalEntries[0].entries[0].senses && body.results[0].lexicalEntries[0].entries[0].senses[0] &&
                body.results[0].lexicalEntries[0].entries[0].senses[0].definitions){
                var rep = body.results[0].lexicalEntries[0].entries[0].senses[0].definitions[utils.getRandomInt(0,body.results[0].lexicalEntries[0].entries[0].senses[0].definitions.length-1)];
                bot.reply(message, rep);
                if(body.results[0].lexicalEntries[0].entries[0].senses[0].examples){
                    var rep = body.results[0].lexicalEntries[0].entries[0].senses[0].examples[utils.getRandomInt(0,body.results[0].lexicalEntries[0].entries[0].senses[0].examples.length-1)];
                    bot.reply(message, "Example: "+rep.text);
                }
            }
        });
    });
};