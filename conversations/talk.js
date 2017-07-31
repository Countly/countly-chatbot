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
    
    helps.push("call me {name}");
    controller.hears(['call me (.*)', 'my name is (.*)', 'I am (.*)'], ['ambient','direct_message','direct_mention', 'mention'], function(bot, message) {
        var name = message.match[1];
        controller.storage.users.get(message.user, function(err, user) {
            if (!user) {
                user = {
                    id: message.user,
                };
            }
            user.name = name;
            controller.storage.users.save(user, function(err, id) {
                bot.reply(message, 'Got it. I will call you ' + user.name + ' from now on.');
            });
        });
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
    
    helps.push("what is my name");
    controller.hears(['what is my name', 'who am i'], ['ambient','direct_message','direct_mention', 'mention'], function(bot, message) {
        controller.storage.users.get(message.user, function(err, user) {
            if (user && user.name) {
                bot.reply(message, 'Your name is ' + user.name);
            } else {
                bot.startConversation(message, function(err, convo) {
                    if (!err) {
                        convo.say('I do not know your name yet!');
                        convo.ask('What should I call you?', function(response, convo) {
                            convo.ask('You want me to call you `' + response.text + '`?', [
                                {
                                    pattern: 'yes',
                                    callback: function(response, convo) {
                                        // since no further messages are queued after this,
                                        // the conversation will end naturally with status == 'completed'
                                        convo.next();
                                    }
                                },
                                {
                                    pattern: 'no',
                                    callback: function(response, convo) {
                                        // stop the conversation. this will cause it to end with status == 'stopped'
                                        convo.stop();
                                    }
                                },
                                {
                                    default: true,
                                    callback: function(response, convo) {
                                        convo.repeat();
                                        convo.next();
                                    }
                                }
                            ]);
    
                            convo.next();
    
                        }, {'key': 'nickname'}); // store the results in a field called nickname
    
                        convo.on('end', function(convo) {
                            if (convo.status == 'completed') {
                                bot.reply(message, 'OK! I will update my dossier...');
    
                                controller.storage.users.get(message.user, function(err, user) {
                                    if (!user) {
                                        user = {
                                            id: message.user,
                                        };
                                    }
                                    user.name = convo.extractResponse('nickname');
                                    controller.storage.users.save(user, function(err, id) {
                                        bot.reply(message, 'Got it. I will call you ' + user.name + ' from now on.');
                                    });
                                });
    
    
    
                            } else {
                                // this happens if the conversation ended prematurely for some reason
                                bot.reply(message, 'OK, nevermind!');
                            }
                        });
                    }
                });
            }
        });
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