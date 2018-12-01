import React, { Component } from "react";
import { Navbar } from "reactstrap";

export default class Search extends Component {
  render() {
    const { updateSearch } = this.props;
    return (
      <div>
        <Navbar color="faded" light>
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
