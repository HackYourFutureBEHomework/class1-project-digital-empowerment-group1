import React, { Component } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

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
      <div>
        <div>
        <input
          className="edit-input"
          onChange={handleTitleEditChange}
          defaultValue={module.title}
        />
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
          <button onClick={explanationChange}>Explanation</button>
          <button onClick={exerciseChange}>Exercise</button>
          <button onClick={evaluationChange}>Evaluation</button>
        </div>
        <button className="update" onClick={() => handleContentEdit(module)}>
          Update
        </button>
        <button className="cancel" onClick={handleEdit}>
          Cancel
        </button>
      </div>
    );
  }
}
