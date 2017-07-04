# Countly Chatbot
This is the open source repository of Countly chatbot for Slack. It's in beta stage. 

## Installation
Chatbot can run on Ubuntu/RHEL/CentOS with systemd init model.

It requires Node.js, so install it before moving further with installation steps below:

```
git clone http://github.com/countly/countly-chatbot
cd countly-chatbot
cp config.sample.js config.js
# Add required information in config.js
npm install
bash bin/install.sh
# Countly chatbot should be online in Slack
```

## Chatbot commands 

Here are currently implemented commands for Countly Chatbot: 

```
hello
show apps
show stats for {APP_NAME}
show errors
```
Example: 

```
You: 
Show stats for MyMobileApp

Countly bot: 
Some stats for last 30 days:
You totally had 2435 users, which is 65.5% increase than in previous period
All of them had 4389 session and spent on average 3.1 min
2131 or user were new
```

## Adding a new conversation
We suggest that you create new conversations by modifying configuration file. You can create module under conversations directory exporting function accepting three arguments - controller, bot and helps array.

For more information about controller, see [this documentation](https://github.com/howdyai/botkit/blob/master/docs/readme.md#matching-patterns-and-keywords-with-hears).

Helps is array to push all possible commands to which will be outputed by main file if asked for.

