import React, { Component } from "react";
import {
  getModules,
  createModule,
  deleteModule,
  updateModule
} from "../api/modules";
import AddModule from "./AddModule";

class Modules extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      modules: [],
      loading: false,
      edit: false,
      newTitle: "",
      active: null
    };
  };

  componentDidMount() {
    this.setState({ loading: true });
    getModules().then(modules => {
      this.setState({ modules: modules, loading: false });
    });
  };

  handleTitle = e => {
    this.setState({
      title: e.target.value
    });
  };

  addModule = e => {
    e.preventDefault();
    this.setState({ loading: true });
    createModule(this.state.title).then(newModule => {
      this.setState({
        modules: this.state.modules.concat(newModule),
        title: "",
        loading: false
      });
    });
  };

  handleDelete = id => {
    deleteModule(id);
    this.setState({
      modules: this.state.modules.filter(m => m._id !== id)
    });
  };

  handleTitleEditChange = e => {
    this.setState({
      newTitle: e.target.value
    });
  };

  handleEdit = (id) => {
    this.setState({
      active: id,
      edit: !this.state.edit
    });
  };

  handleTitleEdit = (id) => {
    updateModule(id, this.state.newTitle).then(editedModules => {
      const modules = [...this.state.modules];
      const index = modules.findIndex((t) => t._id === id)
      modules[index].title = editedModules.title
      this.setState({
        modules,
        edit: false
        });
    });
  };

  render() {
    const { modules } = this.state;
    if (this.state.loading) {
      return <div className="loader" />;
    } else {
      return (
        <div>
          <h2>Using a web browser</h2>
          <AddModule
            handleTitle={this.handleTitle}
            addModule={this.addModule}
          />
          {modules.length > 0 ? (
            <ul>
              {modules.map(module => 
                <li key={module._id} className={this.state.active === module._id ? 'active' : null}>
                  <div className={this.state.edit? 'hide-list': 'show-list'}>
                  {module.title}
                  <button
                    onClick={() => {if (window.confirm(`Delete (${module.title})?`))
                      this.handleDelete(module._id);
                      }}>Delete</button>
                    <button onClick={()=>this.handleEdit(module._id)}>Edit</button>
                  </div>
                  <div className={this.state.edit ? 'show-list' : 'hide-list'}>
                    <input
                      style={{ display: this.state.active === module._id ? 'block' : 'none' }}
                      onChange={this.handleTitleEditChange}
                      defaultValue={module.title}
                    />
                    <button
                      style={{ display: this.state.active === module._id ? 'block' : 'none' }}
                      onClick={() => this.handleTitleEdit(module._id)}>
                      Update
                    </button>
                    <button
                      style={{ display: this.state.active === module._id ? 'block' : 'none' }}
                      onClick={this.handleEdit}>Cancel</button>
                  </div>
                </li>
              )}
            </ul>
          ) : (
            <p>There are no modules yet</p>
          )}
        </div>
      );
    }
  }
}

export default Modules;
