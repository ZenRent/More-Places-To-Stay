import React from 'react';
import styled from 'styled-components';

const SuperhostBox = styled.div`
  background-color: white;
  color: black;
  padding: 5px 6px 4px 6px;
  border-radius: 3px;
  margin: 12px 0 0 12px;
  font-size: 11px;
  width: fit-content;
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 2;
  box-shadow: 1px 1px 1px gray;
`;

const Superhost = () => (
  <SuperhostBox>
    <b>SUPERHOST</b>
  </SuperhostBox>
);

export default Superhost;
