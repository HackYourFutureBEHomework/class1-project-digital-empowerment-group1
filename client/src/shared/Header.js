import React, { Component } from "react";
import { Navbar } from "reactstrap";
import Login from "../components/users/Login";

export default class Header extends Component {
  render() {
    const { updateSearch, isLoggedIn } = this.props;
    return (
      <div className="header">
        <Navbar color="faded" light>
          <div className="row">
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
          </div>
        <div className="header-buttons row">
          <Login isLoggedIn={isLoggedIn} />
        </div>
        </Navbar>
      </div>
    );
  }
}
