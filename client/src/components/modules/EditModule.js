import React, { Component } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button } from 'reactstrap';

const editorOptions = {
  toolbar: [
    [{ header: "1" }, { header: "2" }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image", "video"],
    ["clean"]
  ]
};

export default class EditModule extends Component {
  render() {
    const {
      state, module,
      handleChange, handleTitleEditChange, 
      handleContentEdit, handleEdit,
      explanationChange, exerciseChange,
      evaluationChange } = this.props;
    return (
      <div className='edit-overlay'>
        <div className='edit-modal'>
          <div>
          <input
            className="edit-input"
            onChange={handleTitleEditChange}
            defaultValue={module.title}
          />
          <hr/>
          <div className='content-btn'>
            <Button color="info" onClick={explanationChange}>Explanation</Button>
            <Button color="info" onClick={exerciseChange}>Exercise</Button>
            <Button color="info" onClick={evaluationChange}>Evaluation</Button>
          </div>
          <div className={state.activeExplanation ? "show-module" : "hide-module"}>
            <h5>Explanation content</h5>
            <ReactQuill
              modules={editorOptions}
              onChange={value => handleChange("newExplanation", value)}
              defaultValue={module.explanation}
            />
          </div>
          <div className={state.activeExercise ? "show-module" : "hide-module"}>
            <h5>Exercise content</h5>
            <ReactQuill
              modules={editorOptions}
              onChange={value => handleChange("newExercise", value)}
              defaultValue={module.exercise}
            />
          </div>
          <div className={state.activeEvaluation ? "show-module" : "hide-module"}>
            <h5>Evaluation content</h5>
            <ReactQuill
              modules={editorOptions}
              onChange={value => handleChange("newEvaluation", value)}
              defaultValue={module.evaluation}
            />
          </div>
          </div>
          <Button className="update" color="success" disabled={state.newTitle.length < 3} onClick={() => handleContentEdit(module)}>
            Update
          </Button>
          <Button className="cancel" color="secondary" onClick={handleEdit}>
            Cancel
          </Button>
        </div>
      </div>
    );
  }
}
