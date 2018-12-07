import React, { Component } from "react";
import { userLogIn } from "../../api/users";
import Cookies from "universal-cookie";
import Modal from "react-modal";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";

const cookies = new Cookies();
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

Modal.setAppElement("#root");

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      modalIsOpen: false,
      invalid: false
    };
  }

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  afterOpenModal = () => {
    this.subtitle.style.color = "#000";
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  setField = e => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    });
  };

  login = () => {
    const { email, password } = this.state;
    userLogIn(email, password).then(res => {
      if (!res.token) return this.setState({ invalid: true }) + alert('Wrong email or password');      
      cookies.set("token", res.token);
      window.location.reload();
      this.setState({
        email: "",
        password: ""
      });
    });
  };

  logout = () => {
    cookies.remove("token");
    window.location.reload();
  };

  render() {
    const { email, password, invalid } = this.state;
    const { isLoggedIn } = this.props;
    return (
      <div>
        {isLoggedIn ? (
          <Button outline color="danger" onClick={this.logout}>
            log out
          </Button>
        ) : (
          <div>
            <Button
              outline
              color="success"
              className="login-header"
              onClick={this.openModal}>
              Log in
            </Button>
            <Modal
              isOpen={this.state.modalIsOpen}
              onAfterOpen={this.afterOpenModal}
              onRequestClose={this.closeModal}
              style={customStyles}
              contentLabel="Modal">
              <h2 ref={subtitle => (this.subtitle = subtitle)}>Log in</h2>
              <hr />
              <div>
                <Form inline>
                  <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label>
                      Email:
                      <Input
                        invalid={invalid}
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
                        invalid={invalid}
                        type="password"
                        value={password}
                        name="password"
                        onChange={this.setField}
                      />
                    </Label>
                  </FormGroup>
                  <Button outline color="success" onClick={this.login}>
                    Log In
                  </Button>
                </Form>
              </div>
            </Modal>
          </div>
        )}
      </div>
    );
  }
}
