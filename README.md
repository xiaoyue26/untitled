# untitled
nodejs+redis for wechat server

1. node+npm 安装:
https://nodejs.org/en/download/current/
解压到： 
`/opt/node`
然后到
`vi /etc/profild.d/node.sh`
内容如下：
```shell
export NODE_HOME=/opt/node
export PATH=$PATH:$NODE_HOME/bin
export NODE_PATH=$NODE_HOME/lib/node_modules
```

2. 安装npm模块：
```shell
npm install -g express
npm install -g wechat
npm install -g wechat-api
npm install -g mysql
npm install -g connect
npm install -g ejs
npm install -g alpha
npm install -g fs
npm install -g path
npm install -g pm
npm install -g wechat-enterprise
npm install -g wechat-oauth
npm install -g express3-handlebars
npm install -g body-parser
npm install -g jssha
npm install -g open
npm install -g hade
npm install -g express-session
npm install -g serve-favicon
npm install -g morgan
npm install -g cookie-parser
npm install -g debug
npm install -g jade
```

3. 启动服务:
`node bin/www` 
或
`sh wechat-start.sh`
