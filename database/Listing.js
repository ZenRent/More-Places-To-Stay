const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  listingId: Number,
  isShared: Boolean,
  dwellingType: String, // ’house’, ‘cabin’
  thumbnailUrl: String,
  avgReview: Number,
  reviewCount: Number,
  baseRate: Number,
  savedList: String,
  isSuperhost: Boolean,
  listingUrl: String,
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;
