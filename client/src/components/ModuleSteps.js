import React, { Component } from "react";

export default class ModuleSteps extends Component {
  state = {
    activeExplanation: true,
    activeExercise: false,
    activeEvaluation: false
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

  render() {
    const { module } = this.props;
    return (
      <div>
        <ul key={module._id}>
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
              <button onClick={this.props.evaluationStep}>Finish</button>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}
