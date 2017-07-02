var utils = require("../common/utils");
module.exports = function(controller, bot, helps){
    helps.push("show errors");
    controller.hears(['show(.*)errors'], ['ambient','direct_message'], function(bot, message) {
        utils.makeRequest("/o/errorlogs", {lines:100}, function(err, data){
            if(err)
                bot.reply(message, 'Could not provide error data: '+err);
            else{
                var reply_with_attachments = {
                    'text': 'Latest errors are:',
                    'attachments': [
                    {
                        'fallback': data.api,
                        'title': 'API errors',
                        'text': data.api,
                        'color': '#d9534f'
                    },
                    {
                        'fallback': data.dashboard,
                        'title': 'Dashboard errors',
                        'text': data.dashboard,
                        'color': '#d9534f'
                    }
                    ]
                };
                bot.reply(message, reply_with_attachments);
            }
        });
    });
};