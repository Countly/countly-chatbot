var utils = require("../common/utils");
var request = require("request");
module.exports = function(controller, bot, helps){
    helps.push("show me {term}");
    controller.hears(["show (me|us) ([^!.?,]*)"], ['ambient','direct_message','direct_mention', 'mention'], function(bot, message) {
        request({uri:"https://en.wikipedia.org/w/api.php", headers:{"User-Agent":"CountlyBot/1.1 (https://count.ly; hello@count.ly) SlackBot/1.0"}, qs:{action:"query", format:"json", prop:"pageimages", piprop:"original", titles:message.match[2].trim()}}, function (error, response, body) {
            try{
                body = JSON.parse(body);
            }
            catch(err){}
            console.log("parsed", error, body)
            if(body && body.query && body.query.pages){
                var arr = Object.keys(body.query.pages);
                var pageNum = arr[utils.getRandomInt(0,arr.length-1)];;
                var page = body.query.pages[pageNum];
                console.log("has pages", page);
                if(page && page.original && page.original.source){
                    bot.reply(message, page.original.source);
                }
            }
        });
    });
};