var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var wechat = require('wechat');
var redis = require("redis");

var config = {
    token: '10000zhongqingdao',
    appid: 'wx3d6d724f53e423da',
    encodingAESKey: 'XGLykdEhKMK0hSJMqz2otbV5KMbwU1LLNvMT3HL0oNX'
};
router.use(express.query());
router.use(function (req, res,next) {
    console.log(req);
    console.log(req.headers);
    next();
});
router.use(wechat(config, function (req, res, next) {
    // message is located in req.weixin
    var message = req.weixin;
    console.log(message);
    queryRedis(message.Content, function (err, data) {
        res.reply(data);
    });


}));
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('into wechat');
});

module.exports = router;

function queryRedis(content, callback) {
    if (isNaN(content)) {
        try {
            var value = eval(content);
            callback(null, value);
            return;
        }
        catch (exception) {
            console.log("not a expression");
        }
    }
    var client = redis.createClient();
    var attr = content.trim().split(/\s+/);
    if (attr.length === 1) {
        client.get("string " + attr[0], function (err, reply) {
            console.log("try get key: " + attr[0]);
            client.quit();
            if (reply) {
                console.log(reply.toString());
                callback(null, reply.toString());
            }
            else {
                console.log('unset');
                callback(null, 'unset');
            }
        });
    }
    else if (attr.length === 2) {
        client.get("string " + attr[0], function (err, reply) {
            console.log("try get key: " + attr[0]);
            if (reply) {
                console.log(reply.toString());
                client.quit();
                callback(null, reply.toString());
            }
            else {
                client.set("string " + attr[0], attr[1], function (err, reply) {
                    console.log('set ' + attr[0] + ' ' + attr[1]);
                });
                client.quit();
                callback(null, attr[1]);
            }


        });
    }
    else if (attr.length > 2) {
        client.set("string " + attr[0], attr[1], function (err, reply) {
            console.log('set ' + attr[0] + ' ' + attr[1]);
            client.quit();
            callback(null, attr[1]);
        });
    }
    else {
        client.quit();
        callback(null, 'split 0');
    }

}
