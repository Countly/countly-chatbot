var utils = require("../common/utils");
var request = require("request");
var wtf_wikipedia = require("wtf_wikipedia");
module.exports = function(controller, bot, helps){    
    //wiki
    helps.push("wiki {term}");
    controller.hears(["wiki ([^!.?,]*)"], ['ambient','direct_message','direct_mention', 'mention'], function(bot, message) {
        request({uri:"https://en.wikipedia.org/w/api.php", headers:{"User-Agent":"CountlyBot/1.1 (https://count.ly; hello@count.ly) SlackBot/1.0"}, qs:{action:"query", format:"json", prop:"revisions", rvprop:"content", titles:message.match[1].trim()}}, function (error, response, body) {
            try{
                body = JSON.parse(body);
            }
            catch(err){}
            if(body && body.query && body.query.pages){
                var pageNum = Object.keys(body.query.pages)[0];
                var page = body.query.pages[pageNum];
                console.log("has pages", page);
                if(page && page.revisions && page.revisions[0] && page.revisions[0]["*"]){
                    var data;
                    try{
                        data = wtf_wikipedia.plaintext(page.revisions[0]["*"]);
                    }
                    catch(ex){data = null;}
                    if(data){
                        var reply_with_attachments = {
                            'text': 'Driectly from Wiki:',
                            'attachments': [
                            {
                                'fallback': data,
                                'title': message.match[1].trim(),
                                'text': data,
                                'color': '#0f6d1e'
                            }
                            ]
                        };
                        bot.reply(message, reply_with_attachments);
                    }
                }
            }
        });
    });
};