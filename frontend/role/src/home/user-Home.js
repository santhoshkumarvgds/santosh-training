import React from "react";
import history from "../history";
import "../assets/css/user-home.css";

class UserHome extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      role: "",
    };
  }
  getInfo = async () => {
    const response = await fetch("http://localhost:4000/user/getinfo", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: localStorage.token,
      }),
    });
    const body = await response.json();
    this.setState({
      name: body.name,
      email: body.email,
      role: body.role,
    });
  };
  handleLogout() {
    localStorage.clear();
    history.push("/");
  }
  // componentWillMount() {
  //   if (localStorage.count == 1) {
  //     window.location.reload();
  //   }
  //   localStorage.setItem("count", 2);
  // }
  render() {
    return (
      <div>
        <div className="header">
          <h3>Codingmart</h3>
          <div className="log-out">
            <p onClick={this.getInfo}>Get info</p>
            <a onClick={this.handleLogout}>Logout</a>
          </div>
        </div>
        <div className="body">
          <p>{this.state.name}</p>
          <p>{this.state.email}</p>
          <p>{this.state.role}</p>
        </div>
      </div>
    );
  }
}

export default UserHome;
