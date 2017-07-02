# countly-chatbot
Countly chatbot for Slack

Very early alpha stage

# Installation
Currently running on Ubuntu/RHEL/CentOS with Systemd

Requires NodeJS
```
git clone http://github.com/countly/countly-chatbot
cd countly-chatbot
cp config.sample.js config.js
#add needed information in config.js
npm install
bash bin/install.sh
#bot should be online in slack after that
```

# Add new conversation
Create module under conversations directory exporting function accepting three arguments, controller, bot and helps array.

Controller and bot being Botkit instancers, more information
https://github.com/howdyai/botkit/blob/master/docs/readme.md#matching-patterns-and-keywords-with-hears

Helps is array to push all possible commands to which will be outputed by main file if asked for

