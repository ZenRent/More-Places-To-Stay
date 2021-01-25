import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 0px 12px 0 12px;
  padding: 6px 12px 6px 12px;
  border-radius: 4px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  &:hover {
    background-color: rgb(0, 0, 0, 0.1);
  }
`;

const Backdrop = styled.div`
  height: 64px;
  width: 64px;
  margin: 3px 0 3px 0;
  border-radius: 4px;
  background-color: rgb(32, 32, 32);
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
`;

const PlusSign = styled.svg`
  height: 32px;
  width: 32px;
  fill: rgb(255, 255, 255);
`;

const Details = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-content: flex-start;
  height: 70px;
  padding-left: 5px;
`;

const CreateNewList = () => (
  <Wrapper>
    <Backdrop>
      <PlusSign xmlns="http://www.w3.org/2000/svg" aria-hidden="true" viewbox="0 0 32 32" role="presentation" focusable="false">
        <path d="M28,17H17V28H15V17H4V15H15V4h2V15H28Z" fill="#FFFFFF" />
      </PlusSign>
    </Backdrop>
    <Details>Create a new list</Details>
  </Wrapper>
);

export default CreateNewList;
