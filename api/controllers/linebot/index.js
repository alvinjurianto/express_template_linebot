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

  if (event.message.text == "/") {
    var message = app.createSimpleResponse(event.message.text);
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
    const action = {
        type: "uri",
        label: "Account Link",
        uri: "https://nnlife-jp--irisdev04.my.salesforce.com/"
      };

      var message = app.createLinkingCard(
        "Linking Card",
        "linebot sample",
        "https://source.unsplash.com/fbCxL_wEo5M",
        "you have sucessfully started linking process",
        `LOGIN to SALESFORCE`,
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
        title: "Brown Cafe",
        desc: "Brown Cafeです",
        image_url:
          "https://scdn.line-apps.com/n/channel_devcenter/img/flexsnapshot/clip/clip10.jpg",
        action_text: "選択",
        action: {
          type: "message",
          text: "Brown Cafeを選択",
        },
      },
      {
        title: "Brow&Cony's Restaurant",
        desc: "Brow&Cony's Restaurantです",
        image_url:
          "https://scdn.line-apps.com/n/channel_devcenter/img/flexsnapshot/clip/clip11.jpg",
        action_text: "選択",
        action: {
          type: "message",
          text: "Brow&Cony's Restaurantを選択",
        },
      },
      {
        title: "Tata",
        desc: "Tataです",
        image_url:
          "https://scdn.line-apps.com/n/channel_devcenter/img/flexsnapshot/clip/clip12.jpg",
        action_text: "選択",
        action: {
          type: "message",
          text: "Tataが選択されました",
        },
      },
    ];
    var message = app.createList("List", list);
    return client.replyMessage(event.replyToken, message);
  } else if (event.postback.data == "Carousel") {
    var list = [
      {
        title: "Brown Cafe",
        desc: "Brown Cafeです",
        image_url:
          "https://scdn.line-apps.com/n/channel_devcenter/img/flexsnapshot/clip/clip10.jpg",
        action_text: "選択",
        action: {
          type: "message",
          text: "Brown Cafeを選択",
        },
      },
      {
        title: "Brow&Cony's Restaurant",
        desc: "Brow&Cony's Restaurantです",
        image_url:
          "https://scdn.line-apps.com/n/channel_devcenter/img/flexsnapshot/clip/clip11.jpg",
        action_text: "選択",
        action: {
          type: "message",
          text: "Brow&Cony's Restaurantを選択",
        },
      },
      {
        title: "Tata",
        desc: "Tataです",
        image_url:
          "https://scdn.line-apps.com/n/channel_devcenter/img/flexsnapshot/clip/clip12.jpg",
        action_text: "選択",
        action: {
          type: "message",
          text: "Tataが選択されました",
        },
      },
    ];
    var message = app.createCarousel("Carousel", list);
    return client.replyMessage(event.replyToken, message);
  }
});

app.accountLink(async (event, client) => {
    console.log('what the hell is this event? is it accountLINK????', event);
    // const line = require("@line/bot-sdk");

    // const client = new line.Client({
    //   channelAccessToken: config.channelAccessToken ,
    // });

    // const linkToken = await client.getLinkToken(event.source.userId);
    // console.log('link token result?', linkToken);
    var message = { type: "text", text: 'well at least we sent this message' + " ですね" };
    return client.replyMessage(event.replyToken, message);
})

exports.fulfillment = app.lambda();
