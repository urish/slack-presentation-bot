# Shirley

The bot from my talk about using building Slack Integration. 

To set up, git clone, run `npm install` and then set the following environment variables:

- `SLACK_BOT_TOKEN` - Your slack bot token. You get it when you create a new Slack bot
- `SLACK_BOT_PRESENTOR` - Your slack user id. You can get it by running this bot and inspecting the debug output when you send a private message to the bot
- `SLACK_BOT_CHANNEL` - The slack id of the channel where the bot will converse.

To start the bot, simply run `npm start`.

Requires node.js >= 5.6.0

Copyright (C) 2016, Uri Shaked

License: ISC
