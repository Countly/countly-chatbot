#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

if [ ! -f $DIR/../config.js ]; then
	cp $DIR/../config.sample.js $DIR/../config.js
fi

#create supervisor service script
(cat $DIR/countly-bot.service ; echo "ExecStart=/usr/bin/node $DIR/../bot") > /etc/systemd/system/countly-bot.service

#reload services
systemctl daemon-reload

#enable services on boot
systemctl enable countly-bot.service

systemctl start countly-bot