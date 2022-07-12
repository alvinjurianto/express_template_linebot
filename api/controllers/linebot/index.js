"use strict";

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
  // console.log('client', client);

  // fetching id for creating linkToken
  const linkText = "linkText";

  if (event.message.text === linkText) {
    // call webhook here for linktext
    // return the linkToken via message
    console.log("entered linkText");
  }

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
        title: "LinkingCard",
        action: {
          type: "postback",
          data: "LinkingCard",
        },
      },
      {
        title: "OpenInstaCard",
        action: {
          type: "postback",
          data: "OpenInstaCard",
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
  }
  if (event.message.text == "call Link") {
    console.log("entering call linkk!!!");
    const action = {
      type: "uri",
      label: "URI",
      uri: "https://www.google.com",
    };
    var message = app.makeAction(event.message.text, action);
    console.log("message??", message);
    return client.replyMessage(event.replyToken, action);
  } else {
    var message = { type: "text", text: event.message.text + " ですね" };
    return client.replyMessage(event.replyToken, message);
  }
});

app.postback(async (event, client) => {
  console.log(event);

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
        label: "URI",
        uri: "https://www.google.com",
      };

      var message = app.createLinkingCard(
        "Linking Card",
        "linebot sample",
        "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png",
        "you have sucessfully started linking process",
        `lets link at ${linkToken}`,
        action
      );
    return client.replyMessage(event.replyToken, message);
  } else if (event.postback.data == "OpenInstaCard") {
    const action = {
      type: "uri",
      label: "URI",
      uri: "instagram://user?username=alvinjurianto",
    };
    var message = app.createLinkingCard(
      "Linking Card",
      "linebot sample",
      "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png",
      "opening instagram desu",
      "open instagram",
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

exports.fulfillment = app.lambda();
