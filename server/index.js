/* eslint-disable no-console */
const express = require('express');

const app = express();
const port = 3000;

app.use(express.static('public'));

app.listen(port, () => {
  console.log(`More Places to Stay listening on port ${port}`);
});
