/* eslint-disable no-console */
const mongoose = require('mongoose');

const db = mongoose.connect(
  // use this address for dockerizing/deploying:
  // 'mongodb://mongo:27017/morePlaces','

  // use this address for development on your local machine
  'mongodb://localhost/morePlaces',
  { useNewUrlParser: true, useUnifiedTopology: true },
);

const listingSchema = new mongoose.Schema({
  nearby: Array,
});
const Listing = mongoose.model('Listing', listingSchema);

const listSchema = new mongoose.Schema({
  title: String, // required
  count: Number,
  thumbnailUrl: String,
  listings: Array, // of listing _id numbers, REQUIRED defaul = []
});

const List = mongoose.model('List', listSchema);

module.exports = {
  Listing,
  List,
  db,
};
