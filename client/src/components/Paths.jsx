import React, { Component } from "react";
import { getPaths, createPath, updatePath, deletePath } from "../api/paths";
import Path from './Path';
import AddPath from './AddPath';

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

class Paths extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      newTitle: "",
      paths: [],
      isEdit: false,
      activePathId: false,
      isLoading: true
    };
  }

  componentDidMount() {
    getPaths().then(paths => {
      this.setState({ paths: paths, isLoading: false });
    });
  }

  onDragEnd = result => {
    if (!result.destination) {
      return;
    }
    const paths = reorder(
      this.state.paths,
      result.source.index,
      result.destination.index
    );
    this.setState({
      paths
    });
  };

  handleTitleEdit = (id) => {
    updatePath(id, this.state.newTitle).then(editedPaths => {
      const paths = [...this.state.paths];
      const index = paths.findIndex((t) => t._id === id)
      paths[index].title = editedPaths.title
      this.setState({
        paths,
        isEdit: false
      });
    });
  };

  handleTitleChange = e => {
    this.setState({
      title: e.target.value
    });
  };

  handleTitleEditChange = e => {
    this.setState({
      newTitle: e.target.value
    });
  };

  handleEdit = (id) => {
    this.setState({
      activePathId: id,
      isEdit: !this.state.isEdit
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

  handleDelete = PathId => {
    deletePath(PathId).then(myNewListOfPaths => {
      myNewListOfPaths = this.state.paths.filter(m => m._id !== PathId);
      this.setState({
        paths: myNewListOfPaths
      });
    });
  };

  activePath = id => {
    this.setState({
      activePathId: id,
      isOpen: true
    });
  };

  render() {
    const { paths } = this.state;
    if (this.state.isLoading) {
      return <div className="loader" />;
    } else {
      return (
        <div>
          <h2>Learning paths</h2>
          <AddPath
            state={this.state}
            handleTitle={this.handleTitle}
            addPath={this.addPath}
            handleTitleChange={this.handleTitleChange}
          />
          {paths.length > 0 ? (
            <Path
              state={this.state}
              handleEdit={this.handleEdit}
              handleTitleEditChange={this.handleTitleEditChange}
              activePath={this.activePath}
              onDragEnd={this.onDragEnd}
              handleDelete={this.handleDelete}
              handleTitleEdit={this.handleTitleEdit}
            />
          ) : (
              <p>There are no paths yet</p>
            )}
        </div>
      );
    }
  }
}

export default Paths;
