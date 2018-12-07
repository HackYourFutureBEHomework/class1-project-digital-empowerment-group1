import React from "react";
import classnames from "classnames";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Modal from "react-modal";
import { customStyles, editorOptions } from '../customStyles'

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

Modal.setAppElement("#root");

export default class Example extends React.Component {
  state = {
    activeTab: "1",
    modalIsOpen: false
  };

  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  };

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  afterOpenModal = () => {
    this.subtitle.style.color = "#000";
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  render() {
    const { state, addModule, handleTitle, handleChange } = this.props;
    return (
      <div>
        <Button color="primary" className="add-module" onClick={this.openModal}>
          Add Module
        </Button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Modal">
          <h2 ref={subtitle => (this.subtitle = subtitle)}>Add a new module</h2>
          <div className='new-module'>
          <input
            className="title"
            autoFocus
            type="text"
            placeholder="Title"
            onChange={handleTitle}
            />
          </div>
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
                    onChange={value => handleChange("explanation", value)}
                    modules={editorOptions}
                  />
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="2">
              <Row>
                <Col sm="12">
                  <ReactQuill
                    onChange={value => handleChange("exercise", value)}
                    modules={editorOptions}
                  />
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="3">
              <Row>
                <Col sm="12">
                  <ReactQuill
                    onChange={value => handleChange("evaluation", value)}
                    modules={editorOptions}
                  />
                </Col>
              </Row>
            </TabPane>
          </TabContent>
          <br />
          <Button
            color="success"
            onClick={addModule}
            disabled={state.title.length < 3}>
            Add module
          </Button>
        </Modal>
      </div>
    );
  }
}
