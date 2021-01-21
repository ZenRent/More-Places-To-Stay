import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Review from './Reviews';

const DetailsWrapper = styled.div`
margin 2px 0 0 0
text-overflow: elipsis;
width: 100%;
overflow: elipsis;
font-weight: 300;
font-size: 15px;
letter-spacing: 0.004em;
`;
const Description = styled.div`
`;
const Rate = styled.div`
`;
const Type = styled.span`
`;

const Details = (props) => {
  const { listing } = props;
  const bedText = listing.bedCount > 1 ? 'beds' : 'bed';
  return (
    <DetailsWrapper>
      <Review avgReview={listing.avgReview} reviewCount={listing.reviewCount} />
      <Type>
        {`${listing.shareType} ${listing.homeType} · ${listing.bedCount} ${bedText}`}
      </Type>
      <Description>{listing.description}</Description>
      <Rate>
        <span>
          <b>{`$${listing.baseRate}`}</b>
          {' / night'}
        </span>
      </Rate>
    </DetailsWrapper>
  );
};

Details.propTypes = {
  listing: PropTypes.shape({
    avgReview: PropTypes.number,
    baseRate: PropTypes.number,
    bedCount: PropTypes.number,
    description: PropTypes.string,
    homeType: PropTypes.string,
    isSuperhost: PropTypes.bool,
    listingId: PropTypes.number,
    reviewCount: PropTypes.number,
    savedList: PropTypes.string,
    shareType: PropTypes.string,
    thumbnailUrl: PropTypes.string,
  }).isRequired,
};

export default Details;
