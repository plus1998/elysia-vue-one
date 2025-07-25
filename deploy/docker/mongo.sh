#!/bin/bash

set -e

# 0. 变量定义，方便自定义
MONGO_CONTAINER=mongo_rs
MONGO_VERSION=8.0.1
MONGO_USER=root
MONGO_PWD=Super123456
DB_PORT=27017
KEYFILE_PATH=$(pwd)/mongo-keyfile
DATA_PATH=$(pwd)/mongo_data

# 1. 删除旧容器
sudo docker rm -f $MONGO_CONTAINER &>/dev/null

# 2. 准备 keyfile（如果不存在就生成；存在则复用）
if [ ! -f "$KEYFILE_PATH" ]; then
  openssl rand -base64 756 > "$KEYFILE_PATH"
  chmod 400 "$KEYFILE_PATH"
fi

# 3. 启动MongoDB单节点副本集+认证+keyfile
sudo docker run -d \
  --name $MONGO_CONTAINER \
  --restart=always \
  -p $DB_PORT:27017 \
  -v "$DATA_PATH":/data/db \
  -v "$KEYFILE_PATH":/data/keyfile:ro \
  mongo:$MONGO_VERSION \
  --replSet rs0 \
  --auth \
  --keyFile /data/keyfile

# 4. 等待MongoDB启动（最多20秒）
echo "Waiting for MongoDB to start..."
for i in {1..20}
do
  sleep 1
  sudo docker exec $MONGO_CONTAINER mongosh --eval 'db.adminCommand("ping")' &>/dev/null && break
done

# 5. 初始化副本集（如已初始化，则忽略报错）
echo "Initializing MongoDB replica set..."
sudo docker exec $MONGO_CONTAINER mongosh --eval 'try{rs.initiate({_id: "rs0",members: [{ _id: 0, host: "localhost:27017" }]})}catch(e){}'

# 6. 创建 root 用户（忽略已存在错误）
echo "Creating MongoDB root user..."
sudo docker exec $MONGO_CONTAINER mongosh --eval "
db = db.getSiblingDB('admin');
try{
  db.createUser({user:'$MONGO_USER', pwd:'$MONGO_PWD', roles:['root']})
}catch(e){}
"

echo
echo "MongoDB 单节点副本集已完成，root 账户:"
echo "  用户名: $MONGO_USER"
echo "  密码:   $MONGO_PWD"
echo
echo "连接字符串："
echo "  mongodb://$MONGO_USER:$MONGO_PWD@localhost:$DB_PORT/admin?replicaSet=rs0"
echo