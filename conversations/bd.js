var utils = require("../common/utils");
var request = require("request");
module.exports = function(controller, bot, helps){

    //urban
    helps.push("help with {term}");
    controller.hears(["help with ([^!.?,]*)"], ['ambient','direct_message','direct_mention', 'mention'], function(bot, message) {
        request({uri:"https://support.count.ly/api/v2/help_center/articles/search.json?query=" + encodeURIComponent(message.match[1].trim())}, function (error, response, body) {
            try{
                body = JSON.parse(body);
            }
            catch(err){}
            if(body && body.results && body.results.length){
                var rep = body.results[0];
                if(rep) {
                    bot.reply(message, "*" + rep.title + "*\n" + rep.snippet.replace(/<[^>]*>?/gm, '') + "\n" + rep.html_url);
                    /*var reply_with_attachments = {
                        'text': rep.title,
                        'attachments': [
                        {
                            'fallback': rep,
                            'title': rep.snippet,
                            'text': rep.body,
                            'url': rep.html_url,
                            'color': '#0f6d1e'
                        }
                        ]
                    };
                    bot.reply(message, reply_with_attachments);*/
                }
            }
        });
    });
};