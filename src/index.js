const { getPoem } = require("./handlers/getPoem");
const { genHtmlRes } = require('./utils/genRes');

const html = require('raw-loader!../dist/index.html').default;

const handler = async (event, context) => {

    if (event.httpMethod === 'POST') {
        return await getPoem(event);
    }

    return genHtmlRes(html);
}

module.exports = {
    handler
}
