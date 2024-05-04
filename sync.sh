
rsync -avz --size-only --no-perms --no-times -e "ssh -i ~/.ssh/id-postexchange2" --exclude="./WEB-INF/" --exclude=".DS_Store" ./build/ postexchange@postexchange.icytools.cn:/www/wwwroot/postexchange.icytools.cn/
