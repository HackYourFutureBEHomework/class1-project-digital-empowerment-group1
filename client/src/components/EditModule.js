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
  state = {
    activeExplanation: true,
    activeExercise: false,
    activeEvaluation: false
  };

  ExplanationChange = () => {
    this.setState({
      activeExplanation: true,
      activeExercise: false,
      activeEvaluation: false
    });
  };

  ExerciseChange = () => {
    this.setState({
      activeExplanation: false,
      activeExercise: true,
      activeEvaluation: false
    });
  };
  
  EvaluationChange = () => {
    this.setState({
      activeExplanation: false,
      activeExercise: false,
      activeEvaluation: true
    });
  };

  render() {
    const { module, handleChange, handleTitleEditChange, handleContentEdit, handleEdit } = this.props;
    return (
      <div>
        <div>
        <input
          className="edit-input"
          onChange={handleTitleEditChange}
          defaultValue={module.title}
        />
        <div className={this.state.activeExplanation ? "show-module" : "hide-module"}>
          <h5>Explanation content</h5>
          <ReactQuill
            modules={editorOptions}
            onChange={value => handleChange("newExplanation", value)}
            defaultValue={module.explanation}
          />
        </div>
        <div className={this.state.activeExercise ? "show-module" : "hide-module"}>
          <h5>Exercise content</h5>
          <ReactQuill
            modules={editorOptions}
            onChange={value => handleChange("newExercise", value)}
            defaultValue={module.exercise}
          />
        </div>
        <div className={this.state.activeEvaluation ? "show-module" : "hide-module"}>
          <h5>Evaluation content</h5>
          <ReactQuill
            modules={editorOptions}
            onChange={value => handleChange("newEvaluation", value)}
            defaultValue={module.evaluation}
          />
        </div>
          <button onClick={this.ExplanationChange}>Explanation</button>
          <button onClick={this.ExerciseChange}>Exercise</button>
          <button onClick={this.EvaluationChange}>Evaluation</button>
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
