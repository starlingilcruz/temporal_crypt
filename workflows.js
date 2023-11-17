const { generateKeyPair, signMessage } = require('./activities');

async function signingWorkflow(message) {
    if (!keyPair) {
        generateKeyPair();
    }
    return await signMessage(message);
}

module.exports = { signingWorkflow };