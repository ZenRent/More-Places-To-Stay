import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Details from './Details';
import Heart from './Heart';
import Superhost from './Superhost';

const Image = styled.img`
  border-radius: 12px;
  width: 240px;
  height: 160px;
  object-fit: cover;
`;

const ListingWrapper = styled.div`
  padding: 5px;
  position: relative;
  z-index: 0;
`;

const PhotoWrapper = styled.div`
`;

const Listing = (props) => {
  const {
    listing,
    toggleListsModal,
    designateListingToSave,
    removeFromList,
  } = props;
  return (
    <ListingWrapper className="listing">
      <PhotoWrapper>
        <Heart
          savedList={listing.savedList}
          toggleListsModal={toggleListsModal}
          id={listing.listingId}
          designateListingToSave={designateListingToSave}
          removeFromList={removeFromList}
        />
        {listing.isSuperhost ? <Superhost /> : ''}
        <Image src={listing.thumbnailUrl} alt="a home available for short-term rentals" />
      </PhotoWrapper>
      <Details key={listing.listingId} listing={listing} />
    </ListingWrapper>
  );
};

Listing.propTypes = {
  listing: PropTypes.shape({
    avgReview: PropTypes.number,
    baseRate: PropTypes.number,
    bedCount: PropTypes.number,
    description: PropTypes.string,
    homeType: PropTypes.string,
    isSuperhost: PropTypes.bool,
    listingId: PropTypes.number,
    reviewCount: PropTypes.number,
    savedList: PropTypes.number,
    shareType: PropTypes.string,
    thumbnailUrl: PropTypes.string,
  }).isRequired,
  toggleListsModal: PropTypes.func.isRequired,
  designateListingToSave: PropTypes.func.isRequired,
  removeFromList: PropTypes.func.isRequired,
};

export default Listing;
