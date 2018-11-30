import React, { Component } from "react";
import EditPath from "./EditPath";
import PathCard from "./PathCard";

export default class Path extends Component {
  render() {
    const {
      state,
      path,
      handleEdit,
      handleTitleEditChange,
      activePath,
      handleDelete,
      handleTitleEdit
    } = this.props;
    return (
      <li
        key={path._id}
        className={state.activePathId === path._id ? "active" : null}>
        <div
          className={state.isEdit ? "hide-list" : "show-list"}
          onClick={() => activePath(path._id)}>
          <PathCard
            path={path}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </div>
        <div className={state.isEdit ? "show-edit" : "hide-list"}>
          <div
            style={{
              display: state.activePathId === path._id ? "block" : "none"
            }}>
            <EditPath
              state={state}
              path={path}
              handleTitleEditChange={handleTitleEditChange}
              handleTitleEdit={handleTitleEdit}
              handleEdit={handleEdit}
            />
          </div>
        </div>
      </li>
    );
  }
}
