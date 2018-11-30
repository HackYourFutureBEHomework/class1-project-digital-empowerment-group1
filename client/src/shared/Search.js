import React, { Component } from "react";
import { Navbar, NavbarBrand, Button } from "reactstrap";

export default class Search extends Component {
  render() {
    return (
      <div>
        <Navbar color="faded" light>
          <NavbarBrand
            href="http://www.hobosite.be/"
            target="_blank"
            rel="noopener noreferrer"
            className="mr-auto">
            <Button>HOBO VZW</Button>
          </NavbarBrand>
          <input
            className="searchBar"
            type="text"
            onChange={this.updateSearch}
            placeholder="Find a Path..."
          />
        </Navbar>
      </div>
    );
  }
}
