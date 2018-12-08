import React, { Component } from "react";
import { userSignUp } from "../../api/users";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { Link } from "react-router-dom";
import history from "../../history";

export default class SignUp extends Component {
  state = {
    email:'',
    password: ""
  };

  setField = e => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    });
  };

  signUp = () => {
    const { email, password } = this.state;
    userSignUp(email, password);
    this.setState({
      email: "",
      password: ""
    });
    alert(`You account has been created!\nPlease log in... `);
    history.push("/");
  };

  render() {
    const { email, password } = this.state;
    return (
      <div>
        <Form inline>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label>
              Email:
              <Input
                type="email"
                value={email}
                name="email"
                onChange={this.setField}
              />
            </Label>
          </FormGroup>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label>
              Password:
              <Input
                type="password"
                value={password}
                name="password"
                onChange={this.setField}
              />
            </Label>
          </FormGroup>
          <Button onClick={this.signUp}>Sign Up</Button>
        </Form>
        <Link to="/paths">Back to Paths</Link>
      </div>
    );
  }
}
