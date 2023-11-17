const express = require('express');
const { Connection, WorkflowClient } = require('@temporalio/client');
const { signingWorkflow } = require('./workflows');
const { generateKeyPair } = require('./activities');

const app = express();
app.use(express.json());

const connection = new Connection({});
const client = new WorkflowClient(connection.service);

// a2689cf5-9f35-44bf-8896-2b0b1eb15c4d
app.post('/sign-message', async (req, res) => {
    const { id, message } = req.body;

    await client.start(signingWorkflow, {
        args: [message],
        workflowId: id,
        taskQueue: 'signing-task-queue',
    });

    res.status(202).send({ referenceId: id });
});

app.get('/check-status/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await client.result(id);
        res.status(200).send({ signedMessage: result });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    generateKeyPair()
    console.log(`Server running on http://localhost:${PORT}`);
});
