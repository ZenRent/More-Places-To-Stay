import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const GreyText = styled.span`
  color: grey;
`;

const ReviewWrapper = styled.div`
  margin 4px 0 0 0;
  font-size: 12px;
`;

const Reviews = (props) => {
  const { reviewCount, avgReview } = props;
  if (reviewCount > 5) {
    return (
      <ReviewWrapper>
        <img src="https://zennearby.s3-us-west-1.amazonaws.com/resources/rating+star.png" alt="ratings star" height="11px" width="11px" />
        {` ${avgReview}`}
        <GreyText>{` (${reviewCount})`}</GreyText>
      </ReviewWrapper>
    );
  }

  if (reviewCount > 1) {
    return (
      <ReviewWrapper>
        <img src="https://zennearby.s3-us-west-1.amazonaws.com/resources/rating+star.png" alt="ratings star" height="11px" width="11px" />
        {` ${reviewCount} reviews`}
      </ReviewWrapper>
    );
  }

  return (
    <ReviewWrapper>
      <GreyText>No reviews yet</GreyText>
    </ReviewWrapper>
  );
};

Reviews.propTypes = {
  avgReview: PropTypes.number.isRequired,
  reviewCount: PropTypes.number.isRequired,
};

export default Reviews;
