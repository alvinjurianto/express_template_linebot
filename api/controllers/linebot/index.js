"use strict";
// just adding comment 
const config = {
  channelAccessToken:
    process.env.LINE_CHANNEL_ACCESS_TOKEN ||
    "【LINEチャネルアクセストークン(長期)】",
  channelSecret:
    process.env.LINE_CHANNEL_SECRET || "【LINEチャネルシークレット】",
};

const HELPER_BASE = process.env.HELPER_BASE || "../../helpers/";
const LineUtils = require(HELPER_BASE + "line-utils");
const line = require("@line/bot-sdk");
const app = new LineUtils(line, config);

app.message(async (event, client) => {
  console.log(event);

  if (event.message.text == "/" || event.message.text == '商品を探す') {
    var message = app.createSimpleResponse("下からのメーニュ選択してください");
    var list = [
        {
          title: "SimpleResponse",
          action: {
            type: "postback",
            data: "SimpleResponse",
          },
        },
        {
          title: "BasicCard",
          action: {
            type: "postback",
            data: "BasicCard",
          },
        },
        {
          title: "Linking Card",
          action: {
            type: "postback",
            data: "LinkingCard",
          },
        },
        {
          title: "Open Instagram Card",
          action: {
            type: "postback",
            data: "OpenInstaCard",
          },
        },
        {
            title: "Open PocketIRIS Card",
            action: {
              type: "postback",
              data: "OpenIRISCard",
            },
          },
        {
          title: "List",
          action: {
            type: "postback",
            data: "List",
          },
        },
        {
          title: "Carousel",
          action: {
            type: "postback",
            data: "Carousel",
          },
        },
      ];
    var quickReply = app.createQuickReply(list);
    message.quickReply = quickReply;
    return client.replyMessage(event.replyToken, message);
  } else {
    var message = { type: "text", text: event.message.text + " ですね" };
    return client.replyMessage(event.replyToken, message);
  }
});

app.postback(async (event, client) => {
  console.log('what the hell is this event?', event);
  if (event.postback.data == "SimpleResponse") {
    var message = app.createSimpleResponse("SimpleResponseです");
    return client.replyMessage(event.replyToken, message);
  } else if (event.postback.data == "BasicCard") {
    var message = app.createBasicCard(
      "BasicCard",
      "linebot sample",
      "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png",
      "BasicCardです",
      "ボタンテキスト",
      "ボタンを押下"
    );
    return client.replyMessage(event.replyToken, message);
  } else if (event.postback.data == "LinkingCard") {
    const line = require("@line/bot-sdk");
    const client = new line.Client({
      channelAccessToken: config.channelAccessToken ,
    });
    const linkToken = await client.getLinkToken(event.source.userId);
    const uri = 'https://nnlife-jp--irisdev04.my.salesforce.com/services/oauth2/authorize?response_type=token&client_id=3MVG9N6eDmZRVJOmaMFWd.OUMf2NnUyAJdZSqvmDHnjk9X2EnA3gN3gjHeTa_prpJFss6Kd9G9Bbhtsu2YcKC&redirect_uri=https://mysterious-brook-43858.herokuapp.com/callback?key=' + linkToken + '&response_type=token';
    const uritest = 'https://nnlife-jp--irisdev04.my.salesforce.com/services/oauth2/authorize?response_type=token&client_id=3MVG9N6eDmZRVJOmaMFWd.OUMf2NnUyAJdZSqvmDHnjk9X2EnA3gN3gjHeTa_prpJFss6Kd9G9Bbhtsu2YcKC&redirect_uri=https:google.com&response_type=token';
    const uritest2 = 'https://nnlife-jp--irisdev04.my.salesforce.com/services/oauth2/authorize?client_id=3MVG9N6eDmZRVJOmaMFWd.OUMf2NnUyAJdZSqvmDHnjk9X2EnA3gN3gjHeTa_prpJFss6Kd9G9Bbhtsu2YcKC&redirect_uri=https://access.line.me/dialog/bot/accountLink?linkToken=HkcLvWy9ClDu5txQnNWmpytT8Dh6k5wk&response_type=code'
    console.log('uri result is:', uritest)
    const action = {
        type: "uri",
        label: "Account Link",
        uri: uritest2
      };

      var message = app.createLinkingCard(
        "Linking Card",
        "linebot sample",
        "https://source.unsplash.com/fbCxL_wEo5M",
        "you have sucessfully started linking process",
        `LOGIN to SALESFORCE 2`,
        action
      );
      console.log('sending message');
    return client.replyMessage(event.replyToken, message);
  } else if (event.postback.data == "OpenInstaCard") {
    const action = {
      type: "uri",
      label: "URI",
      uri: "https://www.instagram.com/apple/",
    };
    var message = app.createLinkingCard(
      "Linking Card",
      "linebot sample",
      "https://source.unsplash.com/_tF3vug2FhQ",
      "opening instagram desu",
      "open instagram",
      action
    );
    return client.replyMessage(event.replyToken, message);
  } else if (event.postback.data == "OpenIRISCard") {
    const action = {
      type: "uri",
      label: "URI",
      uri: "https://irisdev04-nnlife-jp.cs76.force.com/pocketirismobilepublisher",
    };
    var message = app.createLinkingCard(
      "Linking Card",
      "linebot sample",
      "https://source.unsplash.com/ZzOa5G8hSPI",
      "access pocket IRIS",
      "open",
      action
    );
    return client.replyMessage(event.replyToken, message);
  } else if (event.postback.data == "List") {
    var list = [
      {
        title: "ご希望の条件から商品を探す",
        desc: "給付種類、解約返戻金、加入目的などの条件に合って商品を指示します",
        image_url:
          "https://source.unsplash.com/AOgRd7Ah8-U",
        action_text: "選択",
        action: {
          type: "message",
          text: "ご希望の条件から",
        },
      },
      {
        title: "商品の指示して試算する",
        desc: "複数の商品を並べて簡単に比較することができます。",
        image_url:
          "https://source.unsplash.com/tZw3fcjUIpM",
        action_text: "選択",
        action: {
          type: "message",
          text: "昇進指示",
        },
      },
    ];
    var message = app.createList("List", list);
    return client.replyMessage(event.replyToken, message);
  } else if (event.postback.data == "Carousel") {

    const action = {
        type: "uri",
        label: "URI",
        uri: "https://irisdev04-nnlife-jp.cs76.force.com/pocketirismobilepublisher",
      };

    var list = [
      {
        title: "商品１",
        desc: "商品１の説明です。どのぐらいまでに長い文章ができるかどうか、の確認したいですね。",
        image_url:
          "https://source.unsplash.com/AOgRd7Ah8-U",
        action_text: "選択",
        action: action
      },
      {
        title: "商品２",
        desc: "商品2の説明です。どのぐらいまでに長い文章ができるかどうか、の確認したいですね。",
        image_url:
          "https://source.unsplash.com/tZw3fcjUIpM",
        action_text: "選択",
        action: action
      },
      {
        title: "商品３",
        desc: "商品2の説明です。どのぐらいまでに長い文章ができるかどうか、の確認したいですね。",
        image_url:
          "https://source.unsplash.com/y0OAmd_COUM",
        action_text: "選択",
        action: action
      },
    ];
    var message = app.createCarousel("Carousel", list);
    return client.replyMessage(event.replyToken, message);
  }
});

app.accountLink(async (event, client) => {
    console.log('what the hell is this event? is it accountLINK????', event);
    var message = { type: "text", text: 'well at least we sent this message' + " ですね" };
    return client.replyMessage(event.replyToken, message);
})

exports.fulfillment = app.lambda();
