var utils = require("../common/utils");
module.exports = function(controller, bot, helps){
    helps.push("hello");
    controller.hears(['hello'], ['ambient','direct_message'], function(bot, message) {
        controller.storage.users.get(message.user, function(err, user) {
            if (user && user.name) {
                bot.reply(message, 'Hello ' + user.name + '!!');
            } else {
                bot.reply(message, 'Hello.');
            }
        });
    });
    
    controller.hears(['look(.*)like(.*)bug'], ['ambient','direct_message'], function(bot, message) {
        var bugs = [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Acanthasoma_hamorrhoidale_adult.jpg/320px-Acanthasoma_hamorrhoidale_adult.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Tibicen_linnei.jpg/268px-Tibicen_linnei.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Pentatomidae_-_Flickr_-_gailhampshire.jpg/184px-Pentatomidae_-_Flickr_-_gailhampshire.jpg"
        ];
        
        bot.reply(message, 'No, this looks like a bug: '+bugs[utils.getRandomInt(0,bugs.length-1)]);
    });
};