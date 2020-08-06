var utils = require("../common/utils");
var request = require("request");
module.exports = function(controller, bot, helps){
    controller.hears(["when I was", "your age", "in my time", "grass greener", "you should not", "don't do that", "you kids", "this generation", "too old", "buy house"], ['ambient','direct_message','direct_mention', 'mention'], function(bot, message) {
        bot.reply(message, "Ok Boomer");
    });
    var boom = ["Your mama's boomer", "Ok renter", "Ok snowflake", "Eat a tidepod", "Nice try Boomer", "Get off my lawn", "Go to your room", "U mad bro?"]
    controller.hears(["ok boomer"], ['ambient','direct_message','direct_mention', 'mention'], function(bot, message) {
        bot.reply(message, boom[Math.floor(Math.random() * boom.length)]);
    });
};