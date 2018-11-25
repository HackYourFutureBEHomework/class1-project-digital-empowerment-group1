import React, { Component } from "react";
import { Button } from 'reactstrap';

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
              <Button outline color="secondary" onClick={explanationStep}>Next</Button>
            </div>
          </li>
          <li>
            <h4>Exercise</h4>
            <div
              className={state.activeExercise ? "show-list" : "hide-list"}>
              <div dangerouslySetInnerHTML={{ __html: module.exercise }} />
              <Button outline color="secondary" onClick={exerciseStep}>Next</Button>
            </div>
          </li>
          <li>
            <h4>Evaluation</h4>
            <div
              className={
                state.activeEvaluation ? "show-list" : "hide-list"
              }>
              <div dangerouslySetInnerHTML={{ __html: module.evaluation }} />
              <Button outline color="success" onClick={evaluationStep}>Finish</Button>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}
