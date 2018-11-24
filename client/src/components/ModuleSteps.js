import React, { Component } from "react";

export default class ModuleSteps extends Component {
  render() {
    const {state, module, explanationStep, exerciseStep, evaluationStep } = this.props;
    return (
      <div>
        <ul key={module._id}>
          <li>
            <h4>Explanation</h4>
            <div
              className={
                state.activeExplanation ? "show-list" : "hide-list"
              }>
              <div dangerouslySetInnerHTML={{ __html: module.explanation }} />
              <button onClick={explanationStep}>Next</button>
            </div>
          </li>
          <li>
            <h4>Exercise</h4>
            <div
              className={state.activeExercise ? "show-list" : "hide-list"}>
              <div dangerouslySetInnerHTML={{ __html: module.exercise }} />
              <button onClick={exerciseStep}>Next</button>
            </div>
          </li>
          <li>
            <h4>Evaluation</h4>
            <div
              className={
                state.activeEvaluation ? "show-list" : "hide-list"
              }>
              <div dangerouslySetInnerHTML={{ __html: module.evaluation }} />
              <button onClick={evaluationStep}>Finish</button>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}
