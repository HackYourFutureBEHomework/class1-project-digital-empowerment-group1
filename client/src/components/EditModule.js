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
    const { module, handleChange, handleTitleEditChange, handleContentEdit, handleEdit } = this.props;
    return (
      <div>
        <input
          className="edit-input"
          onChange={handleTitleEditChange}
          defaultValue={module.title}
        />
        <h5>Explanation content</h5>
        <ReactQuill
          modules={editorOptions}
          onChange={value => handleChange("newExplanation", value)}
          defaultValue={module.explanation}
        />
        <h5>Exercise content</h5>
        <ReactQuill
          modules={editorOptions}
          onChange={value => handleChange("newExercise", value)}
          defaultValue={module.exercise}
        />
        <h5>Evaluation content</h5>
        <ReactQuill
          modules={editorOptions}
          onChange={value => handleChange("newEvaluation", value)}
          defaultValue={module.evaluation}
        />
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
