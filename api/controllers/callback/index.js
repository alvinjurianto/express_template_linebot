const THIS_BASE_PATH = process.env.THIS_BASE_PATH;

const HELPER_BASE = process.env.HELPER_BASE || '../../helpers/';
const Response = require(HELPER_BASE + 'response');
const TextResponse = require(HELPER_BASE + 'textresponse');

exports.handler = async (event, context, callback) => {
    if (event.path == '/callback') {
        console.log('check the event here', event)
        // call the 

        return new Response({"test": "succedded"})
    }
}