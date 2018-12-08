import React from "react";
import classnames from "classnames";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { editorOptions } from '../customStyles'

import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Button,
  Row,
  Col
} from "reactstrap";

export default class Example extends React.Component {
  state = {
    activeTab: "1"
  };

  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  };
  render() {
    const {
      newTitle,
      module,
      handleChange,
      handleTitleEditChange,
      handleContentEdit,
      handleEdit
    } = this.props;
    return (
      <div className="edit-overlay">
        <div className="edit-modal">
          <input
            className="edit-input"
            onChange={handleTitleEditChange}
            defaultValue={module.title}
          />
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === "1" })}
                onClick={() => {
                  this.toggle("1");
                }}>
                Explanation
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === "2" })}
                onClick={() => {
                  this.toggle("2");
                }}>
                Exercise
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === "3" })}
                onClick={() => {
                  this.toggle("3");
                }}>
                Evaluation
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">
              <Row>
                <Col sm="12">
                  <ReactQuill
                    modules={editorOptions}
                    onChange={value => handleChange("newExplanation", value)}
                    defaultValue={module.explanation}
                  />
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="2">
              <Row>
                <Col sm="12">
                  <ReactQuill
                    modules={editorOptions}
                    onChange={value => handleChange("newExercise", value)}
                    defaultValue={module.exercise}
                  />
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="3">
              <Row>
                <Col sm="12">
                  <ReactQuill
                    modules={editorOptions}
                    onChange={value => handleChange("newEvaluation", value)}
                    defaultValue={module.evaluation}
                  />
                </Col>
              </Row>
            </TabPane>
          </TabContent>
          <Button
            className="update"
            color="success"
            disabled={newTitle.length < 3}
            onClick={() => handleContentEdit(module)}>
            Update
          </Button>
          <Button className="cancel" color="secondary" onClick={handleEdit}>
            Cancel
          </Button>
        </div>
      </div>
    );
  }
}
