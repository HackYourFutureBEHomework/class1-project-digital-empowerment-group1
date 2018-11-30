import React, { Component } from "react";
import { getPaths, createPath, updatePath, deletePath } from "../api/paths";
import Path from "./Path";
import AddPath from "./AddPath";
import Search from "../shared/Search";

class Paths extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      newTitle: "",
      paths: [],
      isEdit: false,
      activePathId: false,
      isLoading: true,
      SearchBar: ""
    };
  }

  componentDidMount() {
    getPaths().then(paths => {
      this.setState({ paths: paths, isLoading: false });
    });
  }

  handleTitleEdit = id => {
    updatePath(id, this.state.newTitle).then(editedPaths => {
      const paths = [...this.state.paths];
      const index = paths.findIndex(t => t._id === id);
      paths[index].title = editedPaths.title;
      this.setState({
        paths,
        newTitle: '',
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

  handleEdit = id => {
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

  handleDelete = pathId => {
    deletePath(pathId).then(myNewListOfPaths => {
      myNewListOfPaths = this.state.paths.filter(m => m._id !== pathId);
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

  updateSearch = event => {
    const SearchBar = event.target.value;
    this.setState({ SearchBar });
  };

  render() {
    const { paths, SearchBar } = this.state;
    const filteredPaths = paths.filter(path => {
      return path.title.toLowerCase().indexOf(SearchBar.toLowerCase()) !== -1;
    });
    if (this.state.isLoading) {
      return <div className="loader" />;
    } else {
      return (
        <div>
          <Search updateSearch={this.updateSearch}/>
          <AddPath
            state={this.state}
            handleTitle={this.handleTitle}
            addPath={this.addPath}
            handleTitleChange={this.handleTitleChange}
          />
          {paths.length > 0 ? (
            <ul className="path-cards">
              {filteredPaths.map(path => (
                <Path
                  key={path._id}
                  state={this.state}
                  path={path}
                  handleEdit={this.handleEdit}
                  handleTitleEditChange={this.handleTitleEditChange}
                  activePath={this.activePath}
                  handleDelete={this.handleDelete}
                  handleTitleEdit={this.handleTitleEdit}
                  getListStyle={this.getListStyle}
                  getItemStyle={this.getItemStyle}
                />
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
