import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Modal = styled.div`
  width: 568px;
  left: calc((100% - 568px) / 2);
  top: calc((100% - 305px) / 2);
  height: 305px;
  background-color: white;
  z-index: 20;
  border-radius: 10px;
  position: absolute;
`;

const CreateHeader = styled.div`
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

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width:100%;
  height: 100%;
  background: none;
  z-index: 15;
`;

const InputArea = styled.div`
  height: 56px;
  width: 100%;
  display: flex;
`;

const InputField = styled.input`
  width: 100%;
`;

const ModalBody = styled.div`
  height: 160px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalFooter = styled.div`
  border-top: 1px solid rgb(235, 235, 235);
  padding: 16px 24px;
  line-height: 20px;
`;

class CreateListModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      input: e.target.value,
    });
    e.preventDefault();
  }

  handleSubmit() {
    const { createList, switchModals, toggleListsModal } = this.props;
    const { input } = this.state;
    createList(input);
    switchModals();
    toggleListsModal();
  }

  render() {
    const { switchModals } = this.props;
    return (
      <div>
        <ModalBackdrop onClick={switchModals} />
        <Modal>
          <CreateHeader>
            <CloseButton viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" onClick={switchModals}>
              <path d="m6 6 20 20" />
              <path d="m26 6-20 20" />
            </CloseButton>
            Name this list
          </CreateHeader>
          <ModalBody>
            <InputArea>
              <InputField type="text" placeholder="hello" onChange={this.handleChange} />
            </InputArea>
          </ModalBody>
          <ModalFooter>
            <button type="button" onClick={this.handleSubmit}>Submit</button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

CreateListModal.propTypes = {
  createList: PropTypes.func.isRequired,
  switchModals: PropTypes.func.isRequired,
  toggleListsModal: PropTypes.func.isRequired,
};

export default CreateListModal;
