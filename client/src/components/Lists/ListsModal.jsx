import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
// import ModalBackdrop from '../../styles/ModalBackdrop';
import ListElement from './ListElement';
import CreateNewList from './CreateNewList';
import CreateListModal from './CreateListModal';

const Modal = styled.div`
  width: 568px;
  top: calc((${(props) => ((props.show ? 10 : 100))}%) + ${(props) => (props.pageTop)}px) ;
  left: calc((100% - 568px) / 2);
  height: 80%;
  background-color: rgb(255, 255, 255);
  z-index: 20;
  border-radius: 10px;
  position: absolute;
  transition: top .5s;
  opacity: ${(props) => (!props.showCreate ? '100%' : '0%')};
  overflow-y: hidden;
  font-weight: 300;
`;

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width:100%;
  height: 100%;
  background: ${(props) => (props.show ? 'rgba(0, 0, 0, 0.6)' : 'none')};
  z-index: 15;
  transition: background .5s;
`;

const ListsWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flext-start;
  justify-content: flex-start;
  align: left;
  padding: 8px 16px 20px 16px;
`;

const ListsBody = styled.div`
  height: 95%;
  width: 100%;
  overflow-y: auto;
  padding: 0 0 24px 0;
`;

const ListHeader = styled.div`
  text-align: center;
  font-weight: bold;
  padding: 12px;
  border-bottom: 1px solid rgb(235, 235, 235)
`;

const CloseButton = styled.svg`
  display: block;
  fill: none;
  height: 16px;
  width: 16px;
  stroke: currentcolor;
  stroke-width: 3;
  overflow: visible;
  float: left;
`;

class ListsModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      showCreate: false,
      pageTop: 0,
    };
    this.toggleView = this.toggleView.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.switchModals = this.switchModals.bind(this);
  }

  componentDidMount() {
    this.setState({
      // pageTop: document.getElementsByTagName('body')[0].getBoundingClientRect().top,
      pageTop: window.scrollY,
    });
    setTimeout(this.toggleView, 0);
  }

  toggleView() {
    const { show } = this.state;
    this.setState({
      show: !show,
    });
  }

  closeModal() {
    const { toggleListsModal } = this.props;
    this.toggleView();
    setTimeout(toggleListsModal, 500);
  }

  switchModals() {
    const { showCreate } = this.state;
    this.setState({
      showCreate: !showCreate,
    });
  }

  render() {
    const {
      lists,
      addToList,
      markListingAsSaved,
      createList,
      toggleListsModal,
    } = this.props;
    const { show, showCreate, pageTop } = this.state;
    return (
      <div>
        <ModalBackdrop
          show={show}
          onClick={this.closeModal}
        />
        {showCreate ? <CreateListModal switchModals={this.switchModals} createList={createList} toggleListsModal={toggleListsModal} /> : ''}
        <Modal show={show} showCreate={showCreate} pageTop={pageTop}>
          <ListHeader>
            <CloseButton viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" onClick={this.closeModal}>
              <path d="m6 6 20 20" />
              <path d="m26 6-20 20" />
            </CloseButton>
            Save to a list
          </ListHeader>
          <ListsBody>
            <ListsWrapper>
              <CreateNewList switchModals={this.switchModals} />
              {lists.map(({ title, count, thumbnailUrl }, i) => (
                <ListElement
                  img={thumbnailUrl}
                  title={title}
                  count={count}
                  index={i}
                  key={title}
                  addToList={addToList}
                  closeModal={this.closeModal}
                  markListingAsSaved={markListingAsSaved}
                />
              ))}
            </ListsWrapper>
          </ListsBody>
        </Modal>
      </div>
    );
  }
}

ListsModal.propTypes = {
  toggleListsModal: PropTypes.func.isRequired,
  lists: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    thumbnailUrl: PropTypes.string.isRequired,
  })).isRequired,
  markListingAsSaved: PropTypes.func.isRequired,
  addToList: PropTypes.func.isRequired,
  createList: PropTypes.func.isRequired,
};

export default ListsModal;
