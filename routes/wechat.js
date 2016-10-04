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

    fs.writeFile(path.join(__dirname, 'users.out'), message.FromUserName,function (err) {
        if (err) throw err;
        console.log("Export users Success!");
    });
    if (message.FromUserName != 'diaosi') {
        // reply with text
        res.reply('hehe');
    } else if (message.FromUserName === 'text') {
        // another way to reply with text
        res.reply({
            content: 'text object',
            type: 'text'
        });
    } else if (message.FromUserName === 'hehe') {
        // reply with music
        res.reply({
            type: "music",
            content: {
                title: "Just some music",
                description: "I have nothing to lose",
                musicUrl: "http://mp3.com/xx.mp3",
                hqMusicUrl: "http://mp3.com/xx.mp3"
            }
        });
    } else {
        // reply with thumbnails posts
        res.reply([
            {
                title: 'Come to fetch me',
                description: 'or you want to play in another way ?',
                picurl: 'https://avatars2.githubusercontent.com/u/1942320',
                url: 'http://121.42.40.161:4000/'
            }
        ]);
    }
}));
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('into wechat');
});

module.exports = router;
