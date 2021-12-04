const { genRes } = require('../utils/genRes');
const fetch = require('node-fetch').default;
const { signParam } = require('../utils/signParam');
const { parseBody } = require('../utils/parseBody');
const { REGION, PROJECT_ID } = require('../config');
const { isProd } = require('../utils/isProd');
const { wait } = require('../utils/wait');

async function auditImage(image) {

    if (!isProd) {
        await wait(500);
        return require('../../mock/mockAuditResult');
    }

    const signedAuditImageParam = signParam({
        url: `https://moderation.${REGION}.myhuaweicloud.com/v1.0/moderation/image`,
        method: 'POST',
        body: JSON.stringify({ image, categories: ['all'] }),
        headers: {
            "Content-Type": "application/json;charset=UTF-8",
        }
    })
    const audit = await fetch(signedAuditImageParam.url, {
        method: signedAuditImageParam.method,
        body: signedAuditImageParam.body,
        headers: signedAuditImageParam.headers
    }).then(data => data.json()).catch(error => error.toString())

    return audit;
}

async function fetchTag(image) {

    if (!isProd) {
        await wait(500);
        return require('../../mock/mockTagResult');
    }

    const signedFetchTagParam = signParam({
        url: `https://image.${REGION}.myhuaweicloud.com/v1.0/image/tagging`,
        method: 'POST',
        body: JSON.stringify({ image }),
        headers: {
            "Content-Type": "application/json;charset=UTF-8",
        }
    });
    const tag = await fetch(signedFetchTagParam.url, {
        method: signedFetchTagParam.method,
        body: signedFetchTagParam.body,
        headers: signedFetchTagParam.headers
    }).then(data => data.json()).catch(error => error.toString());

    return tag;
}

async function fetchPoem(tag) {

    if (!isProd) {
        await wait(500);
        return require('../../mock/mockPoemResult');
    }

    const signedFetchPoemParam = signParam({
        url: `https://nlp-ext.${REGION}.myhuaweicloud.com/v1/${PROJECT_ID}/nlg/poem`,
        method: 'POST',
        body: JSON.stringify({ title: tag.result.tags[0].tag, type: 3 }),
        headers: {
            "Content-Type": "application/json;charset=UTF-8"
        }
    });

    const poem = await fetch(signedFetchPoemParam.url, {
        method: signedFetchPoemParam.method,
        body: signedFetchPoemParam.body,
        headers: signedFetchPoemParam.headers
    }).then(data => data.json()).catch(error => error.toString());

    return poem;
}

async function getPoem(event) {
    const body = parseBody(event.body);

    if (!body.image) {
        return genRes({
            errorCode: 400,
            errorMsg: '请求参数错误'
        }, { statusCode: 400 });
    }

    const audit = await auditImage(body.image);

    if (!audit.result || audit.result.suggestion !== 'pass') {
        return genRes({
            errorCode: 500,
            errorMsg: audit
        }, { statusCode: 500 });
    }

    const tag = await fetchTag(body.image);

    if (!tag.result) {
        return genRes({
            errorCode: 500,
            errorMsg: tag
        }, { statusCode: 500 });
    }
    
    const poem = await fetchPoem(tag);

    if (!poem.poem) {
        return genRes({
            errorCode: 500,
            errorMsg: poem
        }, { statusCode: 500 });
    }

    return genRes(Object.assign(poem, tag));
}

module.exports = {
    getPoem
}
