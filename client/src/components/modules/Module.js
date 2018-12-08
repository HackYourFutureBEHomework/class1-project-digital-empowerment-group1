import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ModuleSteps from "./ModuleSteps";
import EditModule from "./EditModule";

export default class Module extends Component {
  render() {
    const {
      state, resetSteps,
      handleEdit, handleChange,
      handleTitleEditChange,
      activeModule, onDragEnd,
      handleDelete, evaluationStep,
      explanationStep, exerciseStep,
      handleContentEdit, isLoggedIn
    } = this.props;
    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {provided => (
            <div ref={provided.innerRef}>
              {state.modules.map((module, index) => (
                <Draggable
                  key={module._id}
                  draggableId={module._id}
                  index={index}
                  className={ state.activeModuleId === module._id ? "active" : null }>
                  {provided => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}>
                      <div className={state.isEdit ? "hide-list" : "show-list"} onClick={() => activeModule(module._id)}>
                        <div className="content">
                          <h3>{module.title}</h3>
                              {module.completed &&
                                <input
                                  className="checkbox"
                                  type="checkbox"
                                  onChange={() => resetSteps(module._id)}
                                  checked={module.completed ? "checked" : ""}
                                />
                              }
                              {isLoggedIn && (
                                <div>
                                  <button
                                    className="delete"
                                    onClick={() => { if (window.confirm(`Delete (${module.title})?`)) handleDelete(module._id); }}>
                                    Delete
                                  </button>
                                  <button
                                    className="edit"
                                    onClick={() => handleEdit(module._id)}>
                                    Edit
                                  </button>
                                </div>
                              )}
                          {state.isOpen && (
                            <div className={ state.activeModuleId !== module._id ? "hide-list" : "show-list"}>
                              <div className={ module.completed ? "hide-list" : "show-list" }>
                                <ModuleSteps
                                  state={state}
                                  module={module}
                                  explanationStep={explanationStep}
                                  exerciseStep={exerciseStep}
                                  evaluationStep={() => evaluationStep(module._id)}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className={state.isEdit ? "show-edit" : "hide-list"}>
                        <div style={{ display: state.activeModuleId === module._id ? "block" : "none" }}>
                          <EditModule
                            newTitle={state.newTitle}
                            module={module}
                            handleChange={handleChange}
                            handleTitleEditChange={handleTitleEditChange}
                            handleContentEdit={handleContentEdit}
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
