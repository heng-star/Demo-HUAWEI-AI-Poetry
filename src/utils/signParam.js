const signer = require('../signer');
const { KEY, SECRET } = require('../config');

function signParam({ url, method, body, headers }) {
    const sig = new signer.Signer();
    sig.Key = KEY;
    sig.Secret = SECRET;
    let r = new signer.HttpRequest(method, url);
    r.body = body || '';
    if (headers) {
        r.headers = headers;
    }
    const opt = sig.Sign(r);
    _headers = Object.assign(headers || {}, opt.headers);
    return {
        url,
        method,
        body,
        headers: _headers
    };
}

module.exports = {
    signParam
}
