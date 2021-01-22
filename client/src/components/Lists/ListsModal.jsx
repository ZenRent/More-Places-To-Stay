import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
// import ModalBackdrop from '../../styles/ModalBackdrop';
import ListElement from './ListElement';

const Modal = styled.div`
  width: 568px;
  top: ${(props) => (props.show ? 10 : 100)}%;
  left: calc((100% - 568px) / 2);
  height: 80%;
  background-color: white;
  z-index: 10;
  border-radius: 10px;
  position: absolute;
  transition: all .5s;
`;

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width:100%;
  height: 100%;
  background: ${(props) => (props.show ? 'rgba(0, 0, 0, 0.6)' : 'none')};
  z-index: 5;
  transition: background .5s;
`;

const ListsWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flext-start;
  justify-content: flex-start;
  align: left;
  padding-left: 5px;
`;

const ListHeader = styled.div`
  text-align: center;
  font-weight: 800px;
  padding: 12px;
`;

class ListsModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
    this.toggleView = this.toggleView.bind(this);
  }

  componentDidMount() {
    setTimeout(this.toggleView, 0);
  }

  toggleView() {
    const { show } = this.state;
    this.setState({
      show: !show,
    });
  }

  render() {
    const { toggleLists, lists } = this.props;
    const { show } = this.state;
    return (
      <div>
        <ModalBackdrop
          show={show}
          onClick={() => { this.toggleView(); setTimeout(toggleLists, 500)(); }}
        />
        <Modal show={show}>
          <ListHeader>Save to a list</ListHeader>
          <ListsWrapper>
            <ListElement img="" title="Create a new list" count={0} />
            {lists.map(({ title, count, thumbnailUrl }) => (
              <ListElement img={thumbnailUrl} title={title} count={count} />
            ))}
          </ListsWrapper>
        </Modal>
      </div>
    );
  }
}

ListsModal.propTypes = {
  toggleLists: PropTypes.func.isRequired,
  lists: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    thumbnailUrl: PropTypes.string.isRequired,
  })).isRequired,
};

export default ListsModal;
