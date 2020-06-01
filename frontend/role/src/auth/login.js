import React, { useState } from "react";
import history from "../history";
import "../index.css";

export default class Signup extends React.Component {
  constructor() {
    super();
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
    localStorage.clear();
    e.preventDefault();
    const { email, password } = this.state;
    // console.log(name);
    const response = await fetch("http://localhost:4000/user/login", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email[0],
        password: password[0],
      }),
    });
    const body = await response.json();
    if (body.message == "success" && body.role == "User") {
      localStorage.setItem("token", body.token);
      localStorage.setItem("redirect", "user");
      history.push("/user");
    } else if (body.message == "success" && body.role == "Admin") {
      localStorage.setItem("token", body.token);
      localStorage.setItem("redirect", "admin");
      history.push("/admin");
    } else if (body.message == "success" && body.role == "Seller") {
      localStorage.setItem("token", body.token);
      localStorage.setItem("redirect", "seller");
      history.push("/seller");
    } else if (body.message == "Approvel pending" && body.status != "reject") {
      localStorage.setItem("redirect", "pendingapprovel");
      localStorage.setItem("pendingrequest", body.pendingrequest);
      history.push("/pendingapprovel");
    }else if(body.message == "Approvel pending" && body.status == "reject"){
      alert("rejected!!!");
    } else {
      alert(body.message);
    }
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