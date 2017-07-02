var utils = {}
var config = require("../config");
var request = require("request");
function stripTrailingSlash(str) {
    if(str.substr(str.length - 1) == '/') {
        return str.substr(0, str.length - 1);
    }
    return str;
}

utils.makeRequest = function(path, props, callback){
    var url = stripTrailingSlash(config.countly_server)+path;
    if(!props.api_key){
        props.api_key = config.countly_api_key;
    }
    request({uri:url, qs:props}, function (error, response, body) {
        try{
            body = JSON.parse(body);
        }
        catch(err){
            error = error || err;
        }
        callback(error, body);
    });
}

utils.getRandomInt = function(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = utils;