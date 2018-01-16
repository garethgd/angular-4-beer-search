const functions = require('firebase-functions');
const express = require('express');
const fetch = require('node-fetch');
const url = require('url');
const app = express();
// You might instead set these as environment variables
// I just want to make this example explicitly clear
const appUrl = 'randombeer.net';
const renderUrl = 'https://rendertron-191017.appspot.com';

function generateUrl(request) {
    return url.format({
        protocol: request.protocol,
        host: appUrl,
        pathName: request.originalUrl
    });
}

function detectBot(userAgent) {
    const bots = [
        'googlebot',
        'bingbot',
        'yandexbot',
        'duckduckbot',
        'slurp',
        'twitterbot',
        'facebookexternalhit',
        'linkedinbot',
        'embedly',
        'baiduspider',
        'pintesrest',
        'slackbot',
        'vkShare',
        'facebot',
        'outbrain',
        'W3C_Validator'
    ];
    const agent = userAgent.toLowerCase();
    for (const bot of bots) {
        if (agent.indexOf(bot) > -1) {
            console.log('bot detecetd', bot, agent);
            return true;
        }
    }
    console.log('no bots found');
    return false;
}
app.get('*', (req, res) => {
    const isBot = detectBot(req.headers['user-agent']);
    if (isBot) {
        const botUrl = generateUrl(req);
        fetch(`${renderUrl}/${botUrl}`)
            .then(res => res.text())
            .then(body => {
            res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
            res.set('Vary', 'User-Agent');
            res.send(body.toString());
        })
            .catch(err => console.log(err));
    }
    else {
        fetch(`https://${appUrl}`)
            .then(resp => resp.text())
            .then(body => {
            res.send(body.toString());
        })
            .catch(err => console.log(err));
    }
});
exports.app = functions.https.onRequest(app);
//# sourceMappingURL=index.js.map