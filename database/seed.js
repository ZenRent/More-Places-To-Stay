/* eslint-disable no-console */
const db = require('./index.js');

// global location counter:
let globalId = 1;

// data sets:
const shareTypes = ['Private', 'Shared', 'Entire'];
const homeTypes = ['apartment', 'condominium', 'loft', 'house', 'villa', 'townhouse', 'cottage', 'bungalow', 'cabin', 'chalet', 'guest suite', 'guesthouse', 'tiny house'];
const cities = ['San Francisco', 'Oakland', 'San Leandro', 'Sausalito', 'Tahoe', 'Mammoth', 'Muir Woods', 'Yosemite', 'San Jose', 'El Cerrito', 'Point Reyes', 'Martinez', 'Petaluma', 'Santa Rosa', 'Bodega Bay', 'Inverness', 'Sonoma', 'Lassen', 'Sea Ranch'];
const adjectives = ['Lovely', 'Charming', 'Spacious', 'Cozy', 'Brand New', 'Clean', 'Refreshing', 'Joyful', 'Delightful', 'Inviting', 'Relaxing', 'Intriguing', 'Toasty', 'Pleasant', 'Astounding', 'Hidden', 'Secret', 'Roomy', 'Scenic', 'Panoramic', 'Gorgeous'];
const nouns = ['home', 'hideaway', 'retreat', 'cabin', 'spot'];

// helpers
const getBoolean = () => (Math.random() < 0.5);
const nthImageUrl = (n) => (`https://zennearby.s3-us-west-1.amazonaws.com/${n}.webp`);
const rng = (low, high) => (Math.floor(Math.random() * (high - low)) + low);
const createRating = () => (Number(((Math.random() * 1.25) + 3.75).toFixed(2)));
const selectRandomFrom = (array) => (array[rng(0, array.length)]);
const nLengthArrayBase1 = (n) => {
  let i = 1;
  const result = [];
  while (i <= n) {
    result.push(i);
    i += 1;
  }
  return result;
};
const spliceUnique = (array) => (array.splice(rng(0, array.length), 1));

const createNearbyArray = () => {
  const photoIndices = nLengthArrayBase1(25);
  const results = [];
  let i = 0;
  while (i < 12) {
    const newListing = {
      listingId: globalId,
      avgReview: createRating(),
      reviewCount: rng(0, 266),
      shareType: selectRandomFrom(shareTypes),
      homeType: selectRandomFrom(homeTypes),
      description: `${selectRandomFrom(adjectives)} ${selectRandomFrom(nouns)} in ${selectRandomFrom(cities)}`,
      bedCount: rng(1, 8),
      thumbnailUrl: nthImageUrl(spliceUnique(photoIndices)),
      baseRate: rng(55, 965),
      savedList: '',
      isSuperhost: getBoolean(),
    };
    results.push(newListing);
    i += 1;
    globalId += 1;
  }
  // console.log(results);
  return results;
};

const seed = (qty) => {
  let i = 0;
  const nearbyArrays = [];
  while (i < qty) {
    const a = createNearbyArray();
    nearbyArrays.push(new db.Listing({ nearby: a }));
    i += 1;
  }
  db.Listing.insertMany(nearbyArrays)
    .then((response) => {
      console.log('success!', response);
    })
    .catch((error) => {
      console.log(error);
    });
};

seed(100);

// const wipe = () => {
//   db.Listing.remove().exec(()=>{console.log('records wiped!')});
// };
// wipe();
