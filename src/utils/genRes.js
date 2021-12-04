function genRes(body, opt = {}) {
    return Object.assign({
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Request-Method': 'GET,POST'
        },
        'isBase64Encoded': false,
        body: typeof body === 'string' ? body : JSON.stringify(body),
    }, opt);
}

function genHtmlRes(body) {
    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'text/html;charset=utf-8'
        },
        'isBase64Encoded': false,
        body: typeof body === 'string' ? body : JSON.stringify(body),
    }
}

module.exports = {
    genRes,
    genHtmlRes
}
