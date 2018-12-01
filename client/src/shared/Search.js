import React, { Component } from "react";
import { Navbar } from "reactstrap";

export default class Search extends Component {
  render() {
    const { updateSearch } = this.props;
    return (
      <div>
        <Navbar color="faded" light>
          <h2>Digital Empowerment</h2>
          <input
            className="searchBar"
            type="text"
            onChange={updateSearch}
            placeholder="Find a Path..."
          />
        </Navbar>
      </div>
    );
  }
}
