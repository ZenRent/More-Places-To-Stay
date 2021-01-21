import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// const HeartIcon = styled.img`
//   color: white;
//
//   border-radius: 3px;
//
//   font-size: 11px;
//
//   box-shadow: 1px 1px 1px gray;
// `;

const HeartIcon = styled.svg`
  display: block;
  height: 20px;
  width: 20px;
  stroke: #f7f7f7;
  stroke-width: 2;
  overflow: visible;
  fill: ${(props) => (props.isSaved ? 'rgb(255, 56, 92)' : 'rgba(0, 0, 0, 0.5)')};
  position: absolute;
  top: 0px;
  right: 0px;
  z-index: 2;
  padding: 5px 6px 4px 6px;
  margin: 8px 12px 0 0;
`;

class Heart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSaved: true,
    };
    this.toggleSave = this.toggleSave.bind(this);
  }

  componentDidMount() {
    // set liked state using props
    const { savedList } = this.props;

    this.setState({
      isSaved: Boolean(savedList),
    });
  }

  toggleSave() {
    const { isSaved } = this.state;
    this.setState({
      isSaved: !isSaved,
    });
  }

  render() {
    const { isSaved } = this.state;
    return (
      <HeartIcon isSaved={isSaved} onClick={this.toggleSave} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false"><path d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z" /></HeartIcon>
    );
  }
}

Heart.propTypes = {
  savedList: PropTypes.string.isRequired,
};

export default Heart;
