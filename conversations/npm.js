var utils = require("../common/utils");
var request = require("request");
module.exports = function(controller, bot, helps){
    helps.push("npm {term}");
    console.log("npm loading");
    controller.hears(["npm ([^!.?,]*)"], ['ambient','direct_message','direct_mention', 'mention'], function(bot, message) {
        request({uri:"https://registry.npmjs.org/"+encodeURIComponent(message.match[1].trim())}, function (error, response, body) {
            console.log(error, response, body);
            try{
                body = JSON.parse(body);
            }
            catch(err){}
            
            if(body && body._id){
                bot.reply(message, body.name + "\n" + body.description+"\n"+"https://www.npmjs.com/package/"+body._id);
            }
        });
    });
};