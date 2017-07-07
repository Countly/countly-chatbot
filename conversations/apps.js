var utils = require("../common/utils");
module.exports = function(controller, bot, helps){
    utils.cur_apps = [];
    utils.makeRequest("/o/apps/all", {}, function(err, apps){
        if(!err){
            for(var i in apps.user_of){
                utils.cur_apps[apps.user_of[i].name] = apps.user_of[i]._id+"";
            }
        }
    });
    helps.push("show apps");
    controller.hears(['list(.*)apps', 'show(.*)apps', 'my apps'], ['ambient','direct_message','direct_mention', 'mention'], function(bot, message) {
        utils.makeRequest("/o/apps/all", {}, function(err, apps){
            if(err)
                bot.reply(message, 'Could not provide apps: '+err);
            else{
                var resp = "Your apps are:\n";
                for(var i in apps.user_of){
                    utils.cur_apps[apps.user_of[i].name] = apps.user_of[i]._id+"";
                    resp += apps.user_of[i].name + "\n";
                }
                bot.reply(message, resp);
            }
        });
    });
    
    helps.push("show stats for {APP_NAME}");
    controller.hears(['show (?:me\s)?(?:some\s)?(.*) (?:data|stats)', 'show (?:me\s)?(?:some\s)?(?:data|stats) for (.*)' ], ['ambient','direct_message','direct_mention', 'mention'], function(bot, message) {
        var appName = message.match[1].trim();
        if(utils.cur_apps[appName]){
            utils.makeRequest("/o/analytics/dashboard", {app_id:utils.cur_apps[appName]}, function(err, data){
                data = data["30days"];
                if(err)
                    bot.reply(message, 'Could not provide data for: '+appName);
                else{
                    var resp = "Some stats for last 30 days:\n";
                    resp += "You totally had " + data.dashboard.total_users.total + " users, which is " + data.dashboard.total_users.change+ " " + (data.dashboard.total_users.trend === "u" ? "increase" : "decrease") + " than in previous period\n";
                    resp += "All of them had " + data.dashboard.total_sessions.total + " session and spent on average " + data.dashboard.avg_time.total + "\n";
                    resp += data.dashboard.new_users.total + " or user were new\n";
                    bot.reply(message, resp);
                }
            });
        }
        else{
            bot.reply(message, "Cannot find app: "+appName);
        }
    });
};