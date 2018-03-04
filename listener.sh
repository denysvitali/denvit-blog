#!/bin/bash
echo "Listening"
RESPONSE="HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nConnection: close\r\nContent-Length: 2\r\n\r\nOK\r\n"
while { echo -en $RESPONSE; } | nc -l -p 80; do
	echo "New request"
	if [ ! -f "/data/config.toml" ]; then
		git clone --recursive https://github.com/denysvitali/denvit-blog /data/
	else
		git -C /data/ pull
    git submodule update --recursive --remote
	fi
  cd /data/themes/minimal-tbmfw/ && npm install && gulp
	hugo -s /data/ -d /data/public/
done
