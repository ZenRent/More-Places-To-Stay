import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const NavBar = styled.span`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  padding: 0 3px 0 6px;
`;

const NavButton = styled.button`
  type: button;
  border: 1px solid rgba(0, 0, 0, 0.01);
  border-radius: 50% !important;;
  background-color: rgba(255, 255, 255, 0.9);
  color: black;
  height: 26px;
  width: 26px;
  box-shadow: transparent 0px 0px 0px 1px, transparent 0px 0px 0px 4px, rgba(0, 0, 0, 0.18) 0px 2px 4px;
  margin-left: 3px;
  cursor: pointer;
  outline: none;
  &:active {
    box-shadow: 0px 0px 1px gray;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
`;
const ComponentTitle = styled.span`
  font-size: 20px;
  font-weight: 600;
  letter-spacing: .005em;
`;

const TitleBar = (props) => {
  const {
    setCount,
    currentSet,
    changeSet,
    changeSize,
  } = props;
  return (
    <div>
      <TitleWrapper>
        <ComponentTitle onClick={changeSize}>More places to stay</ComponentTitle>
        <NavBar>
          {`${currentSet} / ${setCount}`}
          <div>
            <NavButton onClick={() => { changeSet(-1); }}>{'<'}</NavButton>
            <NavButton onClick={() => { changeSet(1); }}>{'>'}</NavButton>
          </div>
        </NavBar>
      </TitleWrapper>
    </div>
  );
};

TitleBar.propTypes = {
  setCount: PropTypes.number.isRequired,
  currentSet: PropTypes.number.isRequired,
  changeSet: PropTypes.func.isRequired,
  changeSize: PropTypes.func.isRequired,
};

export default TitleBar;
