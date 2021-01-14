/* eslint-disable no-console */
const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
  title: String, // required
  count: Number,
  thumbnailUrl: String,
  listings: Array, // of listing _id numbers, REQUIRED defaul = []
});

const List = mongoose.model('List', listSchema);

module.exports = List;
