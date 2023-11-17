const { generateKeyPair, signMessage } = require('./activities');

async function signingWorkflow(message) {
  if (!keyPair) {
    // generate keyPair is not provisioned
    generateKeyPair();
  }
  return await signMessage(message);
}

module.exports = { signingWorkflow };