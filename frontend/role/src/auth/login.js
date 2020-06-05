import React, { useState } from "react";
import history from "../history";
import "../index.css";
import Auth from "./auth";

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: [e.target.value],
    });
  }
  async handleSubmit(e) {
    e.preventDefault();
    Auth.userEmail = this.state.email;
    Auth.userPassword = this.state.password;
    Auth.login(() => {
      if(Auth.pendingStatus)
        this.props.history.push("/pendingapprovel");
      else
        this.props.history.push(Auth.authenticateStatus);
    });
  }

  render() {
    return (
      <div className="section">
        <div className="form">
          <form onSubmit={this.handleSubmit}>
            <h1>LOG IN</h1>
            <input
              className="box"
              type="email"
              name="email"
              value={this.state.email}
              placeholder="E-Mail"
              required
              onChange={this.handleChange}
            />
            <br />

            <input
              className="box"
              type="password"
              name="password"
              value={this.state.password}
              placeholder="Password"
              required
              onChange={this.handleChange}
            />
            <br />
            <input
              type="submit"
              id="submitDetails"
              name="submitDetails"
              value="Submit"
            />
            <br />
            <p>Have not account yet?</p>
            <a
              onClick={(e) => {
                history.push("/signup");
              }}
            >
              Sign up
            </a>
          </form>
        </div>
      </div>
    );
  }
}
