var utils = require("../common/utils");
var request = require("request");
var querystring = require('querystring');
var cheerio = require("cheerio");


module.exports = function(controller, bot, helps){
    function sendMessage() {
        request('http://images.google.com/search?tbm=isch&safe=active&q=' + encodeURIComponent("and just like that weekend gone"), function (error, response, body) {
            if(body){
                $ = cheerio.load(body);
                console.log("Sending message");
                //console.log("body", body);
                var $link = $('div img');
                console.log("Links", $link);
                var item = utils.getRandomInt(3,Object.keys($link).length-1);
                var img = $link[item+""];
                console.log("img", item, img);
                //console.log("link", img);
                if(img && img.attribs && img.attribs.src){
                    bot.api.chat.postMessage({
                        username: "CountlyBot",
                        text: img.attribs.src,
                        channel: 'C01689N534H',
                        icon_url: "https://avatars.slack-edge.com/2017-07-10/209755127345_375fb5b0a3e047c9aca3_192.png"
                    },function(err,res) {
                        console.log("message result", err, res);
                    });
                }
            }
        });
    }
    
    function checkTime() {
        var d = new Date();
        console.log("Checking time", d.getDay(), d.getHours());
        if (d.getDay() === 1 && d.getHours() === 3) {
            sendMessage();
        }
        setTimeout(checkTime, 3600000);
    }
    
    checkTime();
    
};