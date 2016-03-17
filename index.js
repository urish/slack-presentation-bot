var RtmClient = require('@slack/client').RtmClient;
var WebClient = require('@slack/client').WebClient;
var RTM_EVENTS = require('@slack/client').RTM_EVENTS;

const SLACK_BOT_TOKEN = process.env.SLACK_BOT_TOKEN || '';
const PRESENTOR_USER = process.env.SLACK_BOT_PRESENTOR || 'U0T0FBR2A';
const TARGET_CHANNEL = process.env.SLACK_BOT_CHANNEL || 'C0T0TPR3K';

var rtm = new RtmClient(SLACK_BOT_TOKEN, { logLevel: 'debug' });
var web = new WebClient(SLACK_BOT_TOKEN);

var Wait = function() { };

function SendAttachment(attachment) {
    web.chat.postMessage(TARGET_CHANNEL, '', { attachments: [attachment]});
}

sequence = [
    Wait,
    // Hi
    `Hi Uri, Good afternoon! How are you today?`,
    Wait,
    // Great, giving a talk about slack
    `Cool! let's do this together?`,
    Wait,
    // Yeah, why not?
    `Okay, a few words about you?`,
    Wait,
    // ...
    `And all the crazy electronics stuff…`,
    () => SendAttachment({
        title: 'Wireless Power FTW!!1',
        image_url: 'https://cdn-images-1.medium.com/max/800/1*YML08CpjNGNhu345JZfWlw.gif',
    }),
    Wait,
    // 
    `Tell them 'bout the Salsa and the Pan Flute`,
    Wait,
    () => SendAttachment({
        title: 'Super Mario',
        image_url: 'http://i.giphy.com/EpB8oRhHSQcnu.gif'
    }),
    `What what do you do for living?`, 
    Wait,
    // Blackberry
    () => SendAttachment({
        title: 'Blackberry',
        image_url: 'https://techspective.net/wp-content/uploads/2015/09/bblogo.png'
    }),
    // Yea... lets talk about integrations?
    Wait,
    `Okay, so about slack integrations, there are 4 types:`,
    `* Incoming Webhooks`,
    `* Outgoing Webhooks and Slash Commands`,
    `* Rest API`,
    `* Realtime Bot API`,
    Wait,
    // Lets create something
    `Great, let's start with incoming webhook! \ngo here and create one: \nhttps://slack.com/apps`,
    Wait,
    `Good job! Now how about a slash command?`,
    Wait,
    // What do you want to build?
    `Something "Deep Learning"... how about using https://github.com/jcjohnson/torch-rnn?`,
    Wait,
    // Great, but how? 
    `You will need a GPU for that.`,
    `Luckily, Amazon has GPU machines, and I set one up for you:\n54.215.142.200`,
    Wait,
    // Go ahead
    'In the server, go to `rabby` directory, and edit index.js',
    Wait,
    // It works
    `Great job guys! I love it :)`,
    Wait,
    // What about the Bots api?
    `This is how I was created. You created me, so tell them about it...`,
    Wait,
    // Let's show the the demo?
    `Yes, invite them to join us:\n\nhttp://tinyurl.com/slackjoin \n`,
    Wait
];

var currentIndex = 0;

function executeCommand(cmd) {
    if (cmd === Wait) {
        return;
    }

    rtm.sendTyping(TARGET_CHANNEL);
    setTimeout(() => {
        if (typeof cmd === 'string') {
            rtm.sendMessage(cmd, TARGET_CHANNEL);
        } else {
            cmd();
        }
        currentIndex++;
        executeCommand(sequence[currentIndex]);
    }, 1000);

}

rtm.start();

rtm.on(RTM_EVENTS.MESSAGE, function(message) {
    if (message.user !== PRESENTOR_USER) {
        return;
    }
    
    if (sequence[currentIndex] !== Wait) {
        return;
    }
    
    if (message.text[0] === '/') {
        return;
    }

    currentIndex++;

    executeCommand(sequence[currentIndex]);
});

