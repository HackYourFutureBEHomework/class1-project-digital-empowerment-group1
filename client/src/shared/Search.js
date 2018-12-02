import React, { Component } from "react";
import { Navbar } from "reactstrap";

export default class Search extends Component {
  render() {
    const { updateSearch } = this.props;
    return (
      <div>
        <Navbar color="faded" light>
          <h2 className="header-title">Digital Empowerment</h2>
          <div className="search-container">
            <input
              className="new-search"
              type="text"
              onChange={updateSearch}
              placeholder="Find a Path..."
            />
            <div className="search" />
          </div>
        </Navbar>
      </div>
    );
  }
}
