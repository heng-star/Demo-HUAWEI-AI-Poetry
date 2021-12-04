function parseBody(body) {
    const buff = Buffer.from(body, 'base64');
    return JSON.parse(buff.toString('ascii'));
}

module.exports = {
    parseBody
}
