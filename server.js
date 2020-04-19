const express = require('express');
const path = require('path');

const app = express();

const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.use(express.static(path.join(__dirname, './static')));
// we need a route that we can open i thebrowser

app.listen(port, () => {
  console.log(`Express server is listening on port: ${port}`);
});
