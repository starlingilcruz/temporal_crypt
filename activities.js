const crypto = require('crypto');

let keyPair;

function generateKeyPair() {
    keyPair = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: { type: 'spki', format: 'pem' },
        privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
    });
}

function signMessage(message) {
    return crypto.sign("sha256", Buffer.from(message), {
        key: keyPair.privateKey,
        padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
    }).toString('base64');
}

module.exports = { generateKeyPair, signMessage };