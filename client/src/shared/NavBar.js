import React from "react";
import { Navbar, NavbarBrand, Button } from "reactstrap";

export default class Example extends React.Component {
  render() {
    return (
      <div>
        <Navbar color="faded" light>
          <NavbarBrand href="/" className="mr-auto">
            <Button>Return to Paths</Button>
          </NavbarBrand>
        </Navbar>
      </div>
    );
  }
}
