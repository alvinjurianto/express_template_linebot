"use strict";

const THIS_BASE_PATH = process.env.THIS_BASE_PATH;

const HELPER_BASE = process.env.HELPER_BASE || "../../helpers/";
const Response = require(HELPER_BASE + "response");
const TextResponse = require(HELPER_BASE + "textresponse");

const configuration = {
  sfdc_client_id: process.env.SFDC_CLIENT_ID,
  sfdc_client_secret: process.env.SFDC_CLIENT_SECRET,
};
var axios = require("axios");
var qs = require("qs");
exports.handler = async (event, context, callback) => {
    // const res = event.res
  if (event.path == "/callback" || event.path == "/testEndpoint") {
    // console.log("check the event event.res", event.httpMethod);
    // console.log("consted res", res)


    const showObj = { test: "succedded" };
    const key = event.queryStringParameters.key;
    if (key) {
      showObj["passedKey"] = key;
    }
    const error = event.queryStringParameters.error;
    if (error) {
      showObj["error"] = error;
    }
    const code = event.queryStringParameters.code;
    // sfdc authorization code used to fetch for access token
    // flow reference:
    // https://help.salesforce.com/s/articleView?id=sf.remoteaccess_oauth_web_server_flow.htm&type=5
    if (code) {
      showObj["sfdcAuthCode"] = code;
    }
    const state = event.queryStringParameters.state;
    if (state) {
      showObj["linkToken"] = state;
    }

    const callLineLinking = ({ access_token_input }) => {
      console.log("calling line linking??");
      const url =
        "https://access.line.me/dialog/bot/accountLink?linkToken=" +
        state +
        "&nonce=" +
        access_token_input;
        return url
    };

    // var finalRedirectURL = '';

    var data = qs.stringify({
      grant_type: "authorization_code",
      code: code,
      client_id: configuration.sfdc_client_id,
      client_secret: configuration.sfdc_client_secret,
      redirect_uri: "https://mysterious-brook-43858.herokuapp.com/callback",
    });
    var config = {
      method: "post",
      url: "https://test.salesforce.com/services/oauth2/token",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        showObj["responseeeeeeeSUCCESSaccess_token"] =
        response.data.access_token;
        finalRedirectURL = callLineLinking({ access_token_input: response.data.access_token });
  
      })
      .catch(function (error) {
        console.log(error);
        showObj["authError"] = "there is error";
      });

    //save line user ID to SFDC
    if (finalRedirectURL) {
        console.log('until here', finalRedirectURL);
        return new Response({"sad": "truth"})
        // res.redirect('307', finalRedirectURL);
    }else {
        return new Response(showObj);
    }
  }
};
