import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
  margin: 0 12px 0 12px;
  padding: 0 12px 0 12px;
  border-radius: 4px;
  display: flex;
  flex-flow: row nowrap;
  &:hover {
    background-color: rgb(0, 0, 0, 0.1);
  }
`;

const Details = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-content: flex-start;
  height: 70px;
  padding-left: 5px;
`;

const Image = styled.img`
  height: 64px;
  width: 64px;
  margin: 3px 0 3px 0;
  border-radius: 4px;
`;

const ListElement = (props) => {
  const { img, title, count } = props;
  return (
    <Wrapper>
      <Image src={img} alt="a related destination" />
      <Details>
        {count ? <div>Any time</div> : ''}
        <div>{title}</div>
        {count ? <div>{`${count} stays`}</div> : ''}
      </Details>
    </Wrapper>
  );
};

ListElement.propTypes = {
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
};

export default ListElement;
