const crypto = require('crypto');

function signMessage(message, privateKey) {
  return crypto.sign("sha256", Buffer.from(message), {
    key: privateKey,
    padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
  }).toString('base64');
}

module.exports = { signMessage };