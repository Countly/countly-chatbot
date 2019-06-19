var utils = require("../common/utils");
var request = require("request");
module.exports = function(controller, bot, helps){
    helps.push("Ask someone if they can do something");
    controller.hears(["^(can|could) (you|i|this|these|we|they|he|she|it|my|his|her|your|their|our)"], ['ambient','direct_message','direct_mention', 'mention'], function(bot, message) {
        bot.reply(message, "There is a bot for that");
    });
};