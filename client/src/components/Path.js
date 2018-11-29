import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import EditPath from "./EditPath";
import { Link } from "react-router-dom";

export default class Path extends Component {
  render() {
    const {
      state,
      handleEdit,
      handleTitleEditChange,
      activePath,
      onDragEnd,
      handleDelete,
      handleTitleEdit,
    } = this.props;
    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {provided => (
            <div ref={provided.innerRef}>
              {state.paths.map((path, index) => (
                <Draggable
                  key={path._id}
                  draggableId={path._id}
                  index={index}
                  className={state.activePathId === path._id ? "active" : null}>
                  {provided => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}>
                      <div className={state.isEdit ? "hide-list" : "show-list"} onClick={() => activePath(path._id)}>
                        <div className="content">
                          <Link to={`/paths/${path._id}`}><h3>{path.title}</h3></Link>
                          <button
                            className="delete"
                            onClick={() => { if (window.confirm(`Delete (${path.title})?`)) handleDelete(path._id); }}>
                            Delete
                          </button>
                          <button
                            className="edit"
                            onClick={() => handleEdit(path._id)}>
                            Edit
                          </button>
                        </div>
                      </div>
                      <div className={state.isEdit ? "show-edit" : "hide-list"}>
                        <div style={{ display: state.activePathId === path._id ? "block" : "none" }}>
                          <EditPath
                            state={state}
                            path={path}
                            handleTitleEditChange={handleTitleEditChange}
                            handleTitleEdit={handleTitleEdit}
                            handleEdit={handleEdit}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}
