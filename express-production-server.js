const express = require('express');
const compression = require('compression');
const path = require('path');
const server = express();

// gzip files
server.use(compression());

// express backend
global.expressApp = express();
server.use('/api', expressApp);
require(path.join(__dirname, 'express', 'app.js'));

// react frontend
server.use(express.static(path.join(__dirname, 'web-root-static')));
server.use((req, res) => {
  res.sendFile(path.join(__dirname, 'web-root-static', 'index.html'));
});

// start the server
server.listen(5000, () => console.log('Server listening on port 5000'));