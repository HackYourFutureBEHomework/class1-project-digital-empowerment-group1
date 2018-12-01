import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class NotFound extends Component {
  render() {
    return (
      <div className='main-div'>
        <div className="row">
          <h1>404</h1>
          <div className="column">
            <h3>Oops! You're lost.</h3>
            <p>The page you are looking for was not found.</p>
            <Link to="/paths">Back to Paths</Link>
          </div>
        </div>
      </div>
    );
  }
}
