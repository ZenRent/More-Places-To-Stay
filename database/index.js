/* eslint-disable no-console */
const mongoose = require('mongoose');

const db = mongoose.connect(
  'mongodb://localhost/morePlaces',
  { useNewUrlParser: true, useUnifiedTopology: true },
);

module.exports = db;
