import React, { Component } from "react";

export default class ModuleSteps extends Component {
  state = {
    activeExplanation: true,
    activeExercise: false,
    activeEvaluation: false,
    completed: false
  };

  resetSteps = () => {
    this.setState({
      activeExplanation: true,
      activeExercise: false,
      activeEvaluation: false,
      completed: false
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

  evaluationStep = () => {
    this.setState({
      activeEvaluation: false,
      completed: true
    });
  };

  render() {
    const { module } = this.props;
    return (
      <div>
        <ul key={module._id}>
          <input
            className="checkbox"
            type="checkbox"
            onChange={this.resetSteps}
            checked={this.state.completed ? "checked" : ""}
          />
          <li>
            <h4>Explanation</h4>
            <div
              className={
                this.state.activeExplanation ? "show-list" : "hide-list"
              }>
              <div dangerouslySetInnerHTML={{ __html: module.explanation }} />
              <button onClick={this.explanationStep}>Next</button>
            </div>
          </li>
          <li>
            <h4>Exercise</h4>
            <div
              className={this.state.activeExercise ? "show-list" : "hide-list"}>
              <div dangerouslySetInnerHTML={{ __html: module.exercise }} />
              <button onClick={this.exerciseStep}>Next</button>
            </div>
          </li>
          <li>
            <h4>Evaluation</h4>
            <div
              className={
                this.state.activeEvaluation ? "show-list" : "hide-list"
              }>
              <div dangerouslySetInnerHTML={{ __html: module.evaluation }} />
              <button onClick={this.evaluationStep}>Finish</button>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}
