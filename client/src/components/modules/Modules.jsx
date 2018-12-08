import React, { Component } from "react";
import * as api from "../../api/modules";
import { getPath } from '../../api/paths';
import AddModule from "./AddModule";
import Module from "./Module";
import ModuleBar from '../../shared/ModuleBar';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';

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
      path:null,
      modules: [],
      isLoading: true,
      title: "",
      newTitle: "",
      isEdit: false,
      isOpen: false,
      completed: false,
      activeExplanation: true,
      activeExercise: false,
      activeEvaluation: false,
      activeModuleId: undefined,
    };
  }

  componentWillMount () {
    nprogress.set(0.0);
    nprogress.set(0.4);
  }

  async componentDidMount() {
    const modules = await api.getModules();
    this.setState({ modules});
    const { pathId } = this.props.match.params;
    const path = await getPath(pathId);
    this.setState({
      path,
      modules: path.modules,
      modulesAreLoading: false,
      isLoading: false
    });
    nprogress.set(1.0);
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
    const pathId = this.state.path._id;
    const { title, explanation, exercise, evaluation } = this.state;
    api
      .createModule(pathId, title, explanation, exercise, evaluation)
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

  evaluationStep = id => {
    api.resetModule(id, true).then(doneModules => {
      const modules = [...this.state.modules];
      const index = modules.findIndex(t => t._id === id);
      modules[index].completed = doneModules.completed;
      const nextModule = modules[index + 1];
      let newModuleId;
      if (nextModule) {
        newModuleId = nextModule._id;
      }
      this.setState({
        activeEvaluation: false,
        activeModuleId: newModuleId,
        isOpen: true,
        completed: !this.state.completed,
        activeExplanation: true,
      });
    });
  };
  
  resetSteps = id => {
    api.resetModule(id, false).then(notDoneModules => {
      const modules = [...this.state.modules];
      const index = modules.findIndex(t => t._id === id);
      modules[index].completed = notDoneModules.completed;
      this.setState({
        completed: !this.state.completed,
        activeExplanation: true,
      });
    });
  };

  render() {
    const { modules, path } = this.state;
    const { isLoggedIn } = this.props;
    if (this.state.isLoading) return <div className="loader" />;
    return (
      <div>
        <ModuleBar />
        <div className='content-container'>
        <div className={this.state.edit ? "hide-list" : "path-header"}>
          <h2 className="path-title">{path.title}</h2>
          {isLoggedIn && (
            <AddModule
              state={this.state}
              handleTitle={this.handleTitle}
              addModule={this.addModule}
              handleChange={this.handleChange}
            />  
          )}
        </div>
        {modules.length > 0 ? (
          <Module
            state={this.state}
            resetSteps={this.resetSteps}
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
            isLoggedIn={isLoggedIn}
          />
        ) : (
          <p>There are no modules yet</p>
        )}
        </div>
      </div>
    );
  }
}

export default Modules;
