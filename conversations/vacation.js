var utils = require("../common/utils");
var request = require("request");
module.exports = function(controller, bot, helps, config){
    if(config.usernames && config.usernames.length){
        controller.hears([".*"], ['ambient','direct_message','direct_mention', 'mention'], function(bot, message) {
            bot.api.users.info({user: message.user}, (error, response) => {
                if(response && response.user && response.user.name && config.usernames.indexOf(response.user.name) !== -1){
                    bot.reply(message, "GOAWAY on vacation " + response.user.profile.first_name);
                }
            })
        });
    }
};