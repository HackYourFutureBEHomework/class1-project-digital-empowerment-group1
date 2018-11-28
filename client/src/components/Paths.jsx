import React, { Component } from "react";
import { getPaths, createPath, deletePath } from "../api/paths";

class Paths extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      paths: [],
      loading: false
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    getPaths().then(paths => {
      this.setState({ paths: paths, loading: false });
    });
  }

  handleTitleChange = e => {
    this.setState({
      title: e.target.value
    });
  };

  addPath = e => {
    e.preventDefault();
    this.setState({ loading: true });
    createPath(this.state.title).then(newPath => {
      this.setState({
        paths: this.state.paths.concat(newPath),
        title: "",
        loading: false
      });
    });
  };

  handleDelete = PathId => {
    deletePath(PathId).then(myNewListOfPaths => {
      myNewListOfPaths = this.state.paths.filter(m => m._id !== PathId);
      this.setState({
        paths: myNewListOfPaths
      });
    });
  };
  
  render() {
    const { paths } = this.state;
    if (this.state.loading) {
      return <div className="loader" />;
    } else {
      return (
        <div>
          <input
            className="newTitle"
            autoFocus
            type="text"
            placeholder="Add new Path"
            onChange={this.handleTitleChange}
            value={this.state.title}
          />
          <button onClick={this.addPath}>Add Path</button>
          {paths.length > 0 ? (
            <ul>
              {console.log(this.state.paths)}
              {paths.map(path => (
                <li key={path._id}>
                  {path.title}
                  <button onClick={() => this.handleDelete(path._id)}>Delete</button>
                </li>
              ))}
            </ul>
          ) : (
            <p>There are no paths yet</p>
          )}
        </div>
      );
    }
  }
}

export default Paths;
