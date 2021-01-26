import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
  margin: 0 12px 0 12px;
  padding: 6px 12px 6px 12px;
  border-radius: 4px;
  display: flex;
  flex-flow: row nowrap;
  &:hover {
    background-color: rgb(0, 0, 0, 0.04);
  }
`;

const Details = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-content: flex-start;
  height: 70px;
  padding-left: 12px;
`;

const Image = styled.img`
  height: 64px;
  width: 64px;
  margin: 3px 0 3px 0;
  border-radius: 4px;
`;

const ListTitle = styled.div`
  font-weight: 500;
`;

const Dates = styled.div`
  font-weight: 200;
  color: rgb(122, 122, 122);
  font-size: 14px;
  line-height: 16px;
`;

const ListElement = (props) => {
  const {
    img,
    title,
    count,
    addToList,
    index,
    closeModal,
    markListingAsSaved,
  } = props;
  return (
    <Wrapper onClick={() => { addToList(index); markListingAsSaved(index); closeModal(); }}>
      <Image src={img} alt="a related destination" />
      <Details>
        <Dates>Any time</Dates>
        <ListTitle>{title}</ListTitle>
        <div>{`${count} stays`}</div>
      </Details>
    </Wrapper>
  );
};

ListElement.propTypes = {
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  addToList: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  closeModal: PropTypes.func.isRequired,
  markListingAsSaved: PropTypes.func.isRequired,
};

export default ListElement;
