import React from 'react';
import styled from 'styled-components';

const SuperhostBox = styled.div`
  background-color: rgba(255, 255, 255, 0.95);
  color: rgb(34, 34, 34);
  padding: 5px 6px 4px 6px;
  border: 0.5px solid rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  margin: 12px 0 0 12px;
  font-size: 11px;
  width: fit-content;
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 2;
`;

const Superhost = () => (
  <SuperhostBox>
    <b>SUPERHOST</b>
  </SuperhostBox>
);

export default Superhost;
