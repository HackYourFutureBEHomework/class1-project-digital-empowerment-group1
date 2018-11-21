import React, { Component } from "react";
import * as api from "../api/modules";
import AddModule from "./AddModule";
import Module from "./Module";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result; //TODO: save result to db to get the same order after change
};

class Modules extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      modules: [],
      loading: false,
      newTitle: "",
      explanation: "",
      exercise: "",
      evaluation: "",
      completed: true,
      activeEvaluation: false,
      isOpen: false,
      isEdit: false,
      activeModuleId: null,
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

  handleChange = (step, value) => {
    this.setState({
      [step]: value
    });
  };

  handleTitleEditChange = e => {
    this.setState({
      newTitle: e.target.value
    });
  };

  handleEdit = id => {
    this.setState({
      activeModuleId: id,
      isEdit: !this.state.isEdit
    });
  };

  activeModule = id => {
    this.setState({
      activeModuleId: id,
      isOpen: true
    });
  };

  handleContentEdit = module => {
    const { newTitle, newExplanation, newExercise, newEvaluation } = this.state;
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
          isEdit: false
        });
      });
  };

  evaluationStep = module => {
    api.completedModule(module._id, this.state.completed).then(doneModules => {
      const modules = [...this.state.modules];
      const index = modules.findIndex(t => t._id === module._id);
      modules[index].completed = doneModules.completed;
      this.setState({
        completed: !this.state.completed,
        activeEvaluation: false
      });
    });
  };

  resetSteps = () => {
    // TODO
  };

  render() {
    const { modules } = this.state;
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
              handleChange={this.handleChange}
            />
          </div>
          {modules.length > 0 ? (
            <Module
              state={this.state}
              handleDelete={this.handleDelete} 
              handleContentEdit={this.handleContentEdit}
              evaluationStep={this.evaluationStep}
              onDragEnd={this.onDragEnd}
              handleEdit={this.handleEdit}
              handleChange={this.handleChange}
              handleTitleEditChange={this.handleTitleEditChange}
              activeModule={this.activeModule}
              />
          ) : (
            <p>There are no modules yet</p>
          )}
        </div>
      );
    }
  }
}

export default Modules;
