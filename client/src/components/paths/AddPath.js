import React, { Component } from "react";
import Modal from "react-modal";
import { Button } from 'reactstrap';

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

Modal.setAppElement("#root");

export default class AddPath extends Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
    };
  }

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  afterOpenModal = () => {
    this.subtitle.style.color = "#000";
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  render() {
    const { state, addPath, handleTitleChange} = this.props;
    return (
      <div>
        <div className='add-path'>
          <h2 className='learning-paths'>Learning paths</h2>
          <Button color="primary" className="add-path-button" onClick={this.openModal}>
            Add Path
          </Button>
        </div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Modal">
          <h2 ref={subtitle => (this.subtitle = subtitle)}>Add a new path</h2>
          <div className='new-module'>
            <input
              className="newTitle"
              autoFocus
              type="text"
              placeholder="Add new Path"
              onChange={handleTitleChange}
              value={state.title}
            />
          </div>
          <Button color="success" onClick={addPath} disabled={state.title.length < 3}>Add Path</Button>
        </Modal>
      </div>
    );
  }
}
