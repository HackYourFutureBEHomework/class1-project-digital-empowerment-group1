import React, { Component } from "react";
import { Navbar, NavbarBrand, Button } from "reactstrap";

export default class ModuleBar extends Component {
  render() {
    return (
      <div>
        <Navbar color="faded" light>
          <NavbarBrand href="/paths" className="mr-auto">
            <Button>Back to Paths</Button>
          </NavbarBrand>
        </Navbar>
      </div>
    );
  }
}
