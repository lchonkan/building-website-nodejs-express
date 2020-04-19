const express = require('express');

const app = express();

const port = 3000;

//we need a route that we can open i thebrowser
app.get('/', (request, res) => {
    res.send('Hello Express here :)');
});

app.listen(port, () => {
    console.log(`Express server is listening on port: ${port}`);
});