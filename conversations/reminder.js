var utils = require("../common/utils");
module.exports = function(controller, bot, helps, config){
    controller.hears(["just([^!.?,]*)minute", "just([^!.?,]*)second", "just([^!.?,]*)moment"], ['ambient','direct_message','direct_mention', 'mention'], function(bot, message) {
        setTimeout(function(){
            bot.api.users.info({user: message.user}, (error, response) => {
                if(response && response.user && response.user.profile){
                    bot.reply(message, "Your time is up " + response.user.profile.first_name);
                }
            })
        }, 60000);
    });
    
    controller.hears([/remind after (.*) seconds (.*)/], ['ambient','direct_message','direct_mention', 'mention'], function(bot, message) {
        setTimeout(function(){
            bot.reply(message, message.match[2].trim());
        }, parseInt(message.match[1].trim())*1000);
    });
    
    controller.hears([/remind after (.*) minutes (.*)/], ['ambient','direct_message','direct_mention', 'mention'], function(bot, message) {
        setTimeout(function(){
            bot.reply(message, message.match[2].trim());
        }, parseInt(message.match[1].trim())*60*1000);
    });
    
    controller.hears([/remind after (.*) hours (.*)/], ['ambient','direct_message','direct_mention', 'mention'], function(bot, message) {
        setTimeout(function(){
            bot.reply(message, message.match[2].trim());
        }, parseInt(message.match[1].trim())*60*60*1000);
    });
    
    controller.hears([/remind after (.*) days (.*)/], ['ambient','direct_message','direct_mention', 'mention'], function(bot, message) {
        setTimeout(function(){
            bot.reply(message, message.match[2].trim());
        }, parseInt(message.match[1].trim())*24*60*60*1000);
    });
};