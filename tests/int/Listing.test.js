/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount } from 'enzyme';
import Listing from '../../client/src/Listing';

Enzyme.configure({ adapter: new Adapter() });

// eslint-disable-next-line no-undef
test('Listing Components receive listing objects', () => {
  const wrapper = mount(<Listing listing={{
    avgReview: 4.29,
    baseRate: 392,
    bedCount: 2,
    description: 'Roomy hideaway in Bodega Bay',
    homeType: 'apartment',
    isSuperhost: false,
    listingId: 398,
    reviewCount: 200,
    savedList: '',
    shareType: 'Shared',
    thumbnailUrl: 'https://zennearby.s3-us-west-1.amazonaws.com/19.webp',
  }}
  />);

  // eslint-disable-next-line no-undef
  expect(wrapper.props().listing.listingId).toEqual(398);
});
