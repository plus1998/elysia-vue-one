#!/bin/bash

# 1. 启动单节点副本集+认证（如果已存在则先删掉）
sudo docker rm -f mongo_rs &>/dev/null

sudo docker run -d \
  --name mongo_rs \
  --restart=always \
  -p 27017:27017 \
  -v $(pwd)/mongo_data:/data/db \
  mongo \
  --replSet rs0 --auth

# 2. 等待MongoDB启动（最多10秒）
for i in {1..10}
do
  sleep 1
  sudo docker exec mongo_rs mongo --eval 'db.adminCommand("ping")' &>/dev/null && break
done

# 3. 初始化副本集（如已初始化，则忽略报错）
sudo docker exec mongo_rs mongosh --eval 'try{rs.initiate()}catch(e){}'

# 4. 创建 root 用户
sudo docker exec mongo_rs mongosh --eval '
use admin;
db.createUser({user:"root", pwd:"Super123456", roles:["root"]});
' || echo "用户可能已存在，忽略错误！"

echo "MongoDB 单节点副本集带认证已完成，访问：mongodb://root:Super123456@localhost:27017/admin?replicaSet=rs0"
