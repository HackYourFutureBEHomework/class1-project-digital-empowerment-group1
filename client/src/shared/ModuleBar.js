import React, { Component } from "react";
import { Navbar, NavbarBrand, Button } from "reactstrap";

export default class ModuleBar extends Component {
  render() {
    return (
      <div>
        <Navbar className='path-banner'>
          <NavbarBrand href="/paths" className="back-to-paths mr-auto">
            <Button>Back to Paths</Button>
          </NavbarBrand>
        </Navbar>
      </div>
    );
  }
}
