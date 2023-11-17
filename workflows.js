const { signMessage } = require('./activities');

async function signingWorkflow(message, privateKey) {
  return await signMessage(message, privateKey);
}

module.exports = { signingWorkflow };