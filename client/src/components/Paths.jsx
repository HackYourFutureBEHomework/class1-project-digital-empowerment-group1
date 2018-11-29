import React, { Component } from "react";
import { getPaths, createPath, deletePath } from "../api/paths";
import { Link } from 'react-router-dom'

class Paths extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      paths: [],
      isLoading: true
    };
  }

  componentDidMount() {
    getPaths().then(paths => {
      this.setState({ paths: paths, isLoading: false });
    });
  }

  handleTitleChange = e => {
    this.setState({
      title: e.target.value
    });
  };

  addPath = e => {
    e.preventDefault();
    this.setState({ isLoading: true });
    createPath(this.state.title).then(newPath => {
      this.setState({
        paths: this.state.paths.concat(newPath),
        title: "",
        isLoading: false
      });
    });
  };

  handleDelete = pathId => {
    deletePath(pathId).then(myNewListOfPaths => {
      myNewListOfPaths = this.state.paths.filter(m => m._id !== pathId);
      this.setState({
        paths: myNewListOfPaths
      });
    });
  };
  
  render() {
    const { paths } = this.state;
    if (this.state.isLoading) {
      return <div className="loader" />;
    } else {
      return (
        <div>
          <h2>Learning Paths</h2>
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
              {paths.map(path => (
                <li key={path._id}>
                  <Link to={`/paths/${path._id}`}>{path.title}</Link>
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
