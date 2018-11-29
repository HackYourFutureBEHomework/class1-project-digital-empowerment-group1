import React, { Component } from "react";
import { Button } from 'reactstrap';

export default class EditModule extends Component {
  render() {
    const {
      state, path, handleTitleEditChange, handleEdit, handleTitleEdit} = this.props;
    return (
      <div className='edit-overlay'>
        <div className='edit-modal'>
          <div>
          <input
            className="edit-input"
            onChange={handleTitleEditChange}
            defaultValue={path.title}
          />
          </div>
          <Button className="update" color="success" disabled={state.newTitle.length < 3} onClick={() => handleTitleEdit(path)}>
            Update
          </Button>
          <Button className="cancel" color="secondary" onClick={handleEdit}>
            Cancel
          </Button>
        </div>
      </div>
    );
  }
}
