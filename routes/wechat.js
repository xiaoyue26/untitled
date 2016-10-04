var express = require('express');
var router = express.Router();
var wechat = require('wechat');

var config = {
    token: '10000zhongqingdao',
    appid: 'wx3d6d724f53e423da',
    encodingAESKey: 'XGLykdEhKMK0hSJMqz2otbV5KMbwU1LLNvMT3HL0oNX'
};
router.use(express.query());

router.use(wechat(config, function (req, res, next) {
    // message is located in req.weixin
    var message = req.weixin;
    console.log(message);
    res.reply(message.Content);
}));
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('into wechat');
});

module.exports = router;
