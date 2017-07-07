var utils = require("../common/utils");
var request = require("request");
module.exports = function(controller, bot, helps, config){
    helps.push("weather {city}");
    controller.hears(["weather ([^!.?]*)"], ['ambient','direct_message','direct_mention', 'mention'], function(bot, message) {
        request({uri:"http://api.openweathermap.org/data/2.5/weather", qs:{appid:config.appid, q:message.match[1].trim(), units:"metric"}}, function (error, response, body) {
            try{
                body = JSON.parse(body);
            }
            catch(err){}
            var resp = "";
            if(body.main){
                if(body.name && body.sys)
                    resp += "Name: " + body.name + " (" + body.sys.country + ")" + "\n";
                if(body.main){
                    resp += "Temperature: " + body.main.temp + "°\n";
                    resp += "Humidity: " + body.main.humidity + "%\n";
                    resp += "Pressure: " + body.main.pressure + " hPa\n";
                }
                if(body.wind)
                    resp += "Wind speed: " + body.wind.speed + " m/s\n";
                if(body.weather && body.weather[0]){
                    resp += "Weather: " + body.weather[0].main + "\n";
                    resp += "http://openweathermap.org/img/w/" + body.weather[0].icon + ".png";
                }
            }
            if(resp.length){
                bot.reply(message, resp);
            }
        });
    });
};