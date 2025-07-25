# 变量
project_name="demo"
username="root"
host=""

# 创建文件夹
ssh $username@$host "mkdir -p /home/$username/$project_name"

# 非root用户
ssh $username@$host "sudo chown -R $username:$username /home/$username/$project_name && sudo chmod -R 755 /home/$username/$project_name"

# 将 deploy build 文件同步到服务器
rsync -avz --delete deploy build $username@$host:/home/$username/$project_name/

# 首次执行deploy
# ssh $username@$host "cd /home/$username/$project_name/deploy && chmod 755 install.sh &&  sh install.sh"