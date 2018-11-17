import React, { Component } from "react";
import * as api from "../api/modules";
import AddModule from "./AddModule";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ModuleSteps from "./ModuleSteps";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

class Modules extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      modules: [],
      loading: false,
      edit: false,
      newTitle: "",
      active: null,
      explanation: "",
      exercise: "",
      evaluation: "",
      newExplanation: "",
      newExercise: "",
      newEvaluation: "",
      opened: false
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    api.getModules().then(modules => {
      this.setState({ modules: modules, loading: false });
    });
  }

  onDragEnd = result => {
    if (!result.destination) {
      return;
    }
    const modules = reorder(
      this.state.modules,
      result.source.index,
      result.destination.index
    );
    this.setState({
      modules
    });
  };

  handleTitle = e => {
    this.setState({
      title: e.target.value
    });
  };

  handleExplanationChange = value => {
    this.setState({
      explanation: value
    });
  };

  handleExerciseChange = value => {
    this.setState({
      exercise: value
    });
  };

  handleEvaluationChange = value => {
    this.setState({
      evaluation: value
    });
  };

  addModule = e => {
    e.preventDefault();
    this.setState({ loading: true });
    const { title, explanation, exercise, evaluation } = this.state;
    api
      .createModule(title, explanation, exercise, evaluation)
      .then(newModule => {
        this.setState({
          modules: this.state.modules.concat(newModule),
          title: "",
          explanation: "",
          exercise: "",
          evaluation: "",
          loading: false
        });
      });
  };

  handleDelete = id => {
    api.deleteModule(id);
    this.setState({
      modules: this.state.modules.filter(m => m._id !== id)
    });
  };

  handleTitleEditChange = e => {
    this.setState({
      newTitle: e.target.value
    });
  };

  handleExplanationEditChange = value => {
    this.setState({
      newExplanation: value
    });
  };

  handleExerciseEditChange = value => {
    this.setState({
      newExercise: value
    });
  };

  handleEvaluationEditChange = value => {
    this.setState({
      newEvaluation: value
    });
  };

  handleEdit = id => {
    this.setState({
      active: id,
      edit: !this.state.edit
    });
  };

  handleContentEdit = module => {
    const { newTitle, newExplanation, newExercise, newEvaluation } = this.state;
    if (newTitle === module.title || newExplanation === module.explanation || newExercise === module.exercise || newEvaluation === module.evaluation) return;
    api
      .updateModule(
        module._id,
        newTitle,
        newExplanation,
        newExercise,
        newEvaluation
      )
      .then(editedModules => {
        const modules = [...this.state.modules];
        const index = modules.findIndex(t => t._id === module._id);
        modules[index] = editedModules;
        this.setState({
          modules,
          edit: false
        });
      });
  };

  activeModule = id => {
    this.setState({
      active: id,
      opened: true
    });
  };

  render() {
    const { modules } = this.state;
    const editorOptions = {
      toolbar: [
        [{ header: "1" }, { header: "2" }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image", "video"],
        ["clean"]
      ]
    };
    if (this.state.loading) {
      return <div className="loader" />;
    } else {
      return (
        <div>
          <div className={this.state.edit ? "hide-list" : "path-header"}>
            <h2 className="path-title">Using a web browser</h2>
            <AddModule
              handleTitle={this.handleTitle}
              addModule={this.addModule}
              explanation={this.state.explanation}
              exercise={this.state.exercise}
              evaluation={this.state.evaluation}
              handleExplanationChange={this.handleExplanationChange}
              handleExerciseChange={this.handleExerciseChange}
              handleEvaluationChange={this.handleEvaluationChange}
            />
          </div>
          {modules.length > 0 ? (
            <DragDropContext onDragEnd={this.onDragEnd}>
              <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                  <div ref={provided.innerRef}>
                    {modules.map((module, index) => (
                      <Draggable
                        key={module._id}
                        draggableId={module._id}
                        index={index}
                        className={
                          this.state.active === module._id ? "active" : null
                        }>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}>
                            <div
                              className={
                                this.state.edit ? "hide-list" : "show-list"
                              }
                              onClick={() => this.activeModule(module._id)}>
                              <div className="content">
                                <h3>{module.title}</h3>
                                <button
                                  className="delete"
                                  onClick={() => {
                                    if (
                                      window.confirm(
                                        `Delete (${module.title})?`
                                      )
                                    )
                                      this.handleDelete(module._id);
                                  }}>
                                  Delete
                                </button>
                                <button
                                  className="edit"
                                  onClick={() => this.handleEdit(module._id)}>
                                  Edit
                                </button>
                                {this.state.opened && (
                                  <div
                                    className={
                                      this.state.active !== module._id
                                        ? "hide-list"
                                        : "show-list"
                                    }>
                                    <ModuleSteps module={module} />
                                  </div>
                                )}
                              </div>
                            </div>
                            <div
                              className={
                                this.state.edit ? "show-edit" : "hide-list"
                              }>
                              <div
                                style={{
                                  display:
                                    this.state.active === module._id
                                      ? "block"
                                      : "none"
                                }}>
                                <input
                                  className="edit-input"
                                  onChange={this.handleTitleEditChange}
                                  defaultValue={module.title}
                                />
                                <h5>Explanation content</h5>
                                <ReactQuill
                                  defaultValue={module.explanation}
                                  onChange={this.handleExplanationEditChange}
                                  modules={editorOptions}
                                />
                                <h5>Exercise content</h5>
                                <ReactQuill
                                  defaultValue={module.exercise}
                                  onChange={this.handleExerciseEditChange}
                                  modules={editorOptions}
                                />
                                <h5>Evaluation content</h5>
                                <ReactQuill
                                  defaultValue={module.evaluation}
                                  onChange={this.handleEvaluationEditChange}
                                  modules={editorOptions}
                                  bounds={"#quill"}
                                />
                                <button
                                  className="update"
                                  onClick={() =>
                                    this.handleContentEdit(module)
                                  }>
                                  Update
                                </button>
                                <button
                                  className="cancel"
                                  onClick={this.handleEdit}>
                                  Cancel
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          ) : (
            <p>There are no modules yet</p>
          )}
        </div>
      );
    }
  }
}

export default Modules;
