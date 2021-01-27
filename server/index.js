/* eslint-disable no-console */
const express = require('express');
const db = require('../database/index.js');
const listData = require('./ListData.js');

const app = express();
const port = 3004;

app.use(express.static('public'));

app.get('/api/more', (req, res) => {
  db.Listing.find()
    .then((listingArrays) => {
      const i = (Math.floor(Math.random() * 100));
      res.status(200).send({
        listings: listingArrays[i].nearby,
        lists: listData,
      });
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.listen(port, () => {
  console.log(`More Places to Stay listening on port ${port}`);
});
