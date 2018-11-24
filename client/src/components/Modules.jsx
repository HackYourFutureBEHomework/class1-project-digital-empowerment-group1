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
      modules: [],
      isLoading: true,
      title: "",
      newTitle: "",
      completed: true,
      activeExplanation: true,
      activeExercise: false,
      activeEvaluation: false,
      isOpen: false,
      isEdit: false,
      activeModuleId: undefined
    };
  }

  async componentDidMount() {
    const modules = await api.getModules();
    let activeModuleId;
    if (modules.length > 0) {
      activeModuleId = modules[0]._id;
    }
    this.setState({ modules, activeModuleId, isLoading: false });
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

  addModule = e => {
    e.preventDefault();
    this.setState({ isLoading: true });
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
          isLoading: false
        });
        this.activeModule(newModule._id)
      });
  };

  handleDelete = id => {
    api.deleteModule(id);
    this.setState({
      modules: this.state.modules.filter(m => m._id !== id),
      activeExplanation: true
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

  explanationStep = () => {
    this.setState({
      activeExplanation: false,
      activeExercise: true,
      activeEvaluation: false
    });
  };

  exerciseStep = () => {
    this.setState({
      activeExercise: false,
      activeEvaluation: true
    });
  };

  evaluationStep = module => {
    api.completedModule(module._id, this.state.completed).then(doneModules => {
      const modules = [...this.state.modules];
      const index = modules.findIndex(t => t._id === module._id);
      modules[index].completed = doneModules.completed;
      this.setState({
        completed: !this.state.completed,
        activeEvaluation: false,
        activeModuleId: modules[index + 1]
      });
      this.activeModule(this.state.activeModuleId)
    });
  };

  explanationChange = () => {
    this.setState({
      activeExplanation: true,
      activeExercise: false,
      activeEvaluation: false
    });
  };

  exerciseChange = () => {
    this.setState({
      activeExplanation: false,
      activeExercise: true,
      activeEvaluation: false
    });
  };

  evaluationChange = () => {
    this.setState({
      activeExplanation: false,
      activeExercise: false,
      activeEvaluation: true
    });
  };

  render() {
    const { modules } = this.state;
    if (this.state.isLoading) return <div className="loader" />;
    return (
      <div>
        <div className={this.state.edit ? "hide-list" : "path-header"}>
          <h2 className="path-title">Using a web browser</h2>
          <AddModule
            state={this.state}
            handleTitle={this.handleTitle}
            addModule={this.addModule}
            explanationChange={this.explanationChange}
            exerciseChange={this.exerciseChange}
            evaluationChange={this.evaluationChange}
            handleChange={this.handleChange}
          />
        </div>
        {modules.length > 0 ? (
          <Module
            state={this.state}
            handleDelete={this.handleDelete}
            handleContentEdit={this.handleContentEdit}
            evaluationStep={this.evaluationStep}
            explanationStep={this.explanationStep}
            exerciseStep={this.exerciseStep}
            onDragEnd={this.onDragEnd}
            handleEdit={this.handleEdit}
            handleChange={this.handleChange}
            handleTitleEditChange={this.handleTitleEditChange}
            activeModule={this.activeModule}
            explanationChange={this.explanationChange}
            exerciseChange={this.exerciseChange}
            evaluationChange={this.evaluationChange}
          />
        ) : (
          <p>There are no modules yet</p>
        )}
      </div>
    );
  }
}

export default Modules;
