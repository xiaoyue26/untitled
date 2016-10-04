var redis = require("redis");
/*var client = redis.createClient();

 client.on("error", function (err) {
 console.log("Error " + err);
 });

 client.on("connect", runSample);*/
runSample("input1", function (err, data) {
    console.log(data);
});

function runSample(content, callback) {
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


//client.expire('string key', 0);