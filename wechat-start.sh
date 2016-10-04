cd /home/xiaoyue26/untitled
nohup node bin/www >> wechat.log 2>&1 &
echo $! > wechat.pid
