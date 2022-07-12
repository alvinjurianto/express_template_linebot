'use strict';

const config = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN || '【LINEチャネルアクセストークン(長期)】',
  channelSecret: process.env.LINE_CHANNEL_SECRET || '【LINEチャネルシークレット】',
};

const HELPER_BASE = process.env.HELPER_BASE || '../../helpers/';
const LineUtils = require(HELPER_BASE + 'line-utils');
const line = require('@line/bot-sdk');
const app = new LineUtils(line, config);

app.message(async (event, client) =>{
    console.log(event);
    console.log('client', client);

    // fetching id for creating linkToken
    const linkText = 'linkText'

    if (event.message.text === linkText) {
        // call webhook here for linktext
        // return the linkToken via message
        console.log('entered linkText')
    }
  
    var message = { type: 'text', text: event.message.text + ' ですね' };
    return client.replyMessage(event.replyToken, message);
  });

  exports.fulfillment = app.lambda();