'use strict'

const Express = require('express');
const app = Express();

const SERVER_PORT = 8000;

app.get('/ping', (req, res) => {
      res.status(200).json({ success: true });
});

app.listen(SERVER_PORT, () => {
    console.info("Server started on port %d...", SERVER_PORT);
});
