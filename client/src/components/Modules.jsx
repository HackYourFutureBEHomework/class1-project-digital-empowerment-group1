import React, { Component } from "react";
import { getModules, createModule } from "../api/modules";

class Modules extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      modules: []
    };
  }

  componentDidMount() {
    getModules().then(modules => {
      this.setState({ modules: modules});
    });
  }

  handleTitleChange = e => {
    this.setState({
      title: e.target.value
    });
  };
  addModule = e => {
    e.preventDefault();
    createModule(this.state.title).then(newModule => {
      this.setState({
        modules: this.state.modules.concat(newModule),
        title: ""
      });
    });
  };

  render() {
    const { modules } = this.state;
        return (
          <div>
            <input
              className="newTitle"
              autoFocus
              type="text"
              placeholder="Add new Module"
              onChange={this.handleTitleChange}
              value={this.state.title}
            />
            <button onClick={this.addModule}>Add module</button>
            {modules.length > 0 ? (
              <ul>
                {modules.map(module => (
                  <li key={module._id}>{module.title}</li>
                ))}
              </ul>
            ) : (
              <p>There are no modules yet</p>
            )}
          </div>
        );
    }
}

export default Modules;
