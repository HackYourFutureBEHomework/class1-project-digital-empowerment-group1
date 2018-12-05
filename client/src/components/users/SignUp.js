import React, { Component } from "react";
import { userSignUp } from "../../api/users";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
// import { Redirect } from "react-router-dom";

export default class SignUp extends Component {
  state = {
    loading: false,
    email: "",
    password: ""
  };

  setField = e => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    });
  };

  signUp = e => {
    e.preventDefault();
    this.setState({ loading: true });

    const { email, password } = this.state;
    userSignUp(email, password);
    this.setState({
      email: "",
      password: "",
      loading: false
    });
  };

  render() {
    const { email, password } = this.state;
    if (this.state.loading) {
      return <div className="loader" />;
    } else {
      return (
        <div>
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
              {/* <div> */}
                <Button onClick={this.signUp}>Sign Up</Button>
                {/* <Redirect to="/paths"/>
              </div> */}
            </Form>
            </div>
        </div>
      );
    }
  }
}
