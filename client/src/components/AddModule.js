import React, { Component } from "react";

export default class AddModule extends Component {
  render() {
    return (
      <div>
        <input
          className="newTitle"
          autoFocus
          type="text"
          placeholder="Add new Module"
          onChange={this.props.handleTitle}
        />
        <button onClick={this.props.addModule}>Add module</button>
      </div>
    );
  }
}
