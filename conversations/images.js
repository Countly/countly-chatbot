var utils = require("../common/utils");
var request = require("request");
var querystring = require('querystring');
var cheerio = require("cheerio");


module.exports = function(controller, bot, helps){
    helps.push("show me {term}");
    controller.hears([/show (me|us) (.*) from ([\d+])/], ['ambient','direct_message','direct_mention', 'mention'], function(bot, message) {
        request('http://images.google.com/search?tbm=isch&safe=active&q=' + encodeURIComponent(message.match[2].trim()), function (error, response, body) {
            if(body){
                $ = cheerio.load(body);
                console.log(message);
                //console.log("body", body);
                var $link = $('#ires img');
                var item = utils.getRandomInt(0,Math.min(Object.keys($link).length-1, parseInt(message.match[3].trim())));
                var img = $link[item+""];
                //console.log("link", img);
                if(img && img.attribs && img.attribs.src){
                    bot.reply(message, img.attribs.src);
                }
            }
        });
    });
    
    controller.hears(["show (me|us) ([^!.?,]*)"], ['ambient','direct_message','direct_mention', 'mention'], function(bot, message) {
        request('http://images.google.com/search?tbm=isch&safe=active&q=' + encodeURIComponent(message.match[2].trim()), function (error, response, body) {
            if(body){
                $ = cheerio.load(body);
                //console.log("body", body);
                var $link = $('#ires img');
                var item = utils.getRandomInt(0,Math.min(Object.keys($link).length-1, 10));
                var img = $link[item+""];
                //console.log("link", img);
                if(img && img.attribs && img.attribs.src){
                    bot.reply(message, img.attribs.src);
                }
            }
        });
    });
};