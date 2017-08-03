var utils = require("../common/utils");
var request = require("request");
var os = require('os');
module.exports = function(controller, bot, helps){
    helps.push("hello");
    controller.hears(['hello', '(^|\s)hi(\b|$)'], ['ambient','direct_message','direct_mention', 'mention'], function(bot, message) {
        controller.storage.users.get(message.user, function(err, user) {
            if (user && user.name) {
                bot.reply(message, 'Hello ' + user.name + '!!');
            } else {
                bot.reply(message, 'Hello.');
            }
        });
    });
    
    controller.hears(['you([^!.?,]*)(will|be|get)([^!.?,]*)fine'], ['ambient','direct_message','direct_mention', 'mention'], function(bot, message) {
        bot.reply(message, 'You spelled "fired" wrong');
    });
    
    controller.hears(['look([^!.?,]*)like([^!.?,]*)bug'], ['ambient','direct_message','direct_mention', 'mention'], function(bot, message) {
        var bugs = [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Acanthasoma_hamorrhoidale_adult.jpg/320px-Acanthasoma_hamorrhoidale_adult.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Tibicen_linnei.jpg/268px-Tibicen_linnei.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Pentatomidae_-_Flickr_-_gailhampshire.jpg/184px-Pentatomidae_-_Flickr_-_gailhampshire.jpg"
        ];
        
        bot.reply(message, 'No, this looks like a bug: '+bugs[utils.getRandomInt(0,bugs.length-1)]);
    });
    
    controller.hears(['think([^!.?,]*)it([^!.?,]*)bug', 'think([^!.?,]*)this([^!.?,]*)bug', 'could([^!.?,]*)be([^!.?,]*)bug'], ['ambient','direct_message','direct_mention', 'mention'], function(bot, message) {
        var bugs = [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Acanthasoma_hamorrhoidale_adult.jpg/320px-Acanthasoma_hamorrhoidale_adult.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Tibicen_linnei.jpg/268px-Tibicen_linnei.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Pentatomidae_-_Flickr_-_gailhampshire.jpg/184px-Pentatomidae_-_Flickr_-_gailhampshire.jpg"
        ];
        
        bot.reply(message, 'No, this is a bug: '+bugs[utils.getRandomInt(0,bugs.length-1)]);
    });
    
    controller.hears(['(do|implement|about|need)([^!.?,]*)feature'], ['ambient','direct_message','direct_mention', 'mention'], function(bot, message) {
        bot.reply(message, 'GOAWAY');
    });
    
    controller.hears(['(it|is)([^!.?,]*)fast', '(it|is)([^!.?,]*)not([^!.?,]*)slow'], ['ambient','direct_message','direct_mention', 'mention'], function(bot, message) {
        bot.reply(message, 'Have you tried enabling assistant?');
    });
    
    controller.hears(['(it|is)([^!.?,]*)slow'], ['ambient','direct_message','direct_mention', 'mention'], function(bot, message) {
        bot.reply(message, 'Have you tried disabling assistant?');
    });
    
    controller.hears(['(it|is|the|da)([^!.?,]*)best'], ['ambient','direct_message','direct_mention', 'mention'], function(bot, message) {
        bot.reply(message, 'The Bestest');
    });
    
    controller.hears(['push it', "why([^!.?,]*)push", 'y u no push'], ['ambient','direct_message','direct_mention', 'mention'], function(bot, message) {
        bot.reply(message, ':whyyounopush:');
    });
    
    controller.hears([' bot(\b|$)'], ['ambient','direct_message','direct_mention', 'mention'], function(bot, message) {
        bot.reply(message, 'Who you call a bot?\nMe?\nThen yes, it is correct!');
    });
    
    controller.hears(['let([^!.?,]*)party'], ['ambient','direct_message','direct_mention', 'mention'], function(bot, message) {
        bot.reply(message, ':parrot: :parrot-fiesta: :parrot-upside-down:');
    });
    
    helps.push("uptime");
    controller.hears(['uptime', 'identify yourself', 'who are you', 'what is your name'],
    ['ambient','direct_message','direct_mention', 'mention'], function(bot, message) {

        var hostname = os.hostname();
        var uptime = formatUptime(process.uptime());

        bot.reply(message,
            ':robot_face: I am a bot named <@' + bot.identity.name +
             '>. I have been running for ' + uptime + ' on ' + hostname + '.');

    });

    function formatUptime(uptime) {
        var unit = 'second';
        if (uptime > 60) {
            uptime = uptime / 60;
            unit = 'minute';
        }
        if (uptime > 60) {
            uptime = uptime / 60;
            unit = 'hour';
        }
        if (uptime != 1) {
            unit = unit + 's';
        }
    
        uptime = uptime + ' ' + unit;
        return uptime;
    }
};