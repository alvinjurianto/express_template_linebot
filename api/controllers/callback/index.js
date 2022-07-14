// import got from "got";
// import fetch from "node-fetch";
const THIS_BASE_PATH = process.env.THIS_BASE_PATH;

const HELPER_BASE = process.env.HELPER_BASE || "../../helpers/";
const Response = require(HELPER_BASE + "response");
const TextResponse = require(HELPER_BASE + "textresponse");


const config = {
  sfdc_client_id: process.env.SFDC_CLIENT_ID,
  sfdc_client_secret: process.env.SFDC_CLIENT_SECRET,
};
exports.handler = async (event, context, callback) => {
  if (event.path == "/callback" || event.path == "/testEndpoint" ) {
    const fetch = require('node-fetch')
    return new Response({"result": "success"});

    console.log(
      "check the event.queryStringParameters here",
      event.queryStringParameters
    );

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

    // fetch access token here
    //

    // const { data } = await got
    //   .post("https://nnlife-jp--irisdev04.my.salesforce.com", {
    //     json: {
    //       hello: "world",
    //     },
    //   })
    //   .json();

    // const { headers } = await got("https://httpbin.org/anything", {
    //   headers: {
    //     "Content-length": "307",
    //     "Content-type": "application/x-www-form-urlencoded",
    //   },
    // }).post();

    // const body = {
    //   "grant-type": "authorization_code",
    //   code: code,
    //   client_id: config.sfdc_client_id,
    //   client_secret: config.sfdc_client_secret,
    //   redirect_uri:
    //     "https://access.line.me/dialog/bot/accountLink?linkToken=" +
    //     state +
    //     "&nonce=apaya",
    // };
    // try {
    //   const response = await fetch(
    //     "https://nnlife-jp--irisdev04.my.salesforce.com/services/oauth2/token",
    //     {
    //       method: "post",
    //       body: JSON.stringify(body),
    //       headers: {
    //         Host: "https://nnlife-jp--irisdev04.my.salesforce.com",
    //         "Content-Type": "application/x-www-form-urlencoded",
    //         "Content-length": "307",
    //       },
    //     }
    //   );
    //   console.log(response);
    //   console.log("response result of access_token", response.access_token);
    //   console.log("response result of id", response.id);
    // } catch (e) {
    //     console.log('error in fetching access token', e)
    //     return new Response({"error": "in fetching access token"});
    // }

    // return new Response(showObj);
  }
};
