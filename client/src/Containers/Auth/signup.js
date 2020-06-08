import React from "react";
import history from "../../history";
import "../../assets/css/index.css";

export default class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      role: "",
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
    const { name, email, password, role } = this.state;
    console.log(name);
    const response = await fetch("http://localhost:4000/user/signup", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name[0],
        email: email[0],
        password: password[0],
        role: role[0],
      }),
    });
    // console.log(response);
    const body = await response.json();
    if (body.message === "Mail exists") {
      alert("Mail exists");
    } else if (body.message === "success") {
      alert("Signup success");
      history.push("/login");
    } else {
      alert(body.message);
    }
  }

  render() {
    return (
      <div className="section">
        <div className="form">
          <form onSubmit={this.handleSubmit}>
            <h1>SIGN UP</h1>

            <input
              className="box"
              type="text"
              name="name"
              value={this.state.name}
              placeholder="Name"
              required
              onChange={this.handleChange}
            />
            <br />

            <input
              className="box"
              type="email"
              name="email"
              value={this.state.email}
              placeholder="E-Mail "
              required
              onChange={this.handleChange}
            />
            <br />

            <input
              className="box"
              type="password"
              name="password"
              value={this.state.password}
              placeholder="Password "
              required
              onChange={this.handleChange}
            />
            <br />
            <select
              value={this.state.role}
              name="role"
              onChange={this.handleChange}
            >
              <option value="Select">Select</option>
              <option value="User">User</option>
              <option value="Seller">Seller</option>
            </select>
            <br />
            <br />
            <input
              type="submit"
              id="submitDetails"
              name="submitDetails"
              value="Submit"
            />
            <br />
          </form>
        </div>
      </div>
    );
  }
}
