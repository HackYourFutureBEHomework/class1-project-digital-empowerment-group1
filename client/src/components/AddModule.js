import React, { Component } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Modal from "react-modal";

const editorOptions = {
  toolbar: [
    [{ header: "1" }, { header: "2" }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image", "video"],
    ["clean"]
  ]
};
  
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

export default class AddModule extends Component {
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
    const { state, addModule, handleTitle,
      handleChange, explanationChange,
      exerciseChange, evaluationChange
    } = this.props;
    return (
      <div>
        <button className="add-module" onClick={this.openModal}>
          Add Module
        </button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Modal">
          <h2 ref={subtitle => (this.subtitle = subtitle)}>Add a new module</h2>
          <div>
            <input
              className="newTitle"
              autoFocus
              type="text"
              placeholder="Title"
              onChange={handleTitle}
            />
            <div
              className={
                state.activeExplanation ? "show-module" : "hide-module"
              }>
              <h5>Explanation content</h5>
              <ReactQuill
                onChange={value => handleChange("explanation", value)}
                modules={editorOptions}
              />
            </div>
            <div
              className={
                state.activeExercise ? "show-module" : "hide-module"
              }>
              <h5>Exercise content</h5>
              <ReactQuill
                onChange={value => handleChange("exercise", value)}
                modules={editorOptions}
              />
            </div>
            <div
              className={
                state.activeEvaluation ? "show-module" : "hide-module"
              }>
              <h5>Evaluation content</h5>
              <ReactQuill
                onChange={value => handleChange("evaluation", value)}
                modules={editorOptions}
              />
            </div>
            <button onClick={explanationChange}>Explanation</button>
            <button onClick={exerciseChange}>Exercise</button>
            <button onClick={evaluationChange}>Evaluation</button>
          </div>
          <br />
          <button onClick={addModule}>Add module</button>
        </Modal>
      </div>
    );
  }
}
