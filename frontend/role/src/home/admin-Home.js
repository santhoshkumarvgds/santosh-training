import React from "react";
import history from "../history";
import "../assets/css/home.css";
import PendingRequestList from "../component/pendingRequestList";

class AdminHome extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      role: "",
      user: "",
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
    console.log(body);
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

  render() {
    return (
      <div>
        <div className="header">
          <h3>Codingmart || Admin</h3>
          <div className="right">
            <a onClick={this.getInfo}>Get info</a>
            <a className="logout-btn" onClick={this.handleLogout}>
              Logout
            </a>
          </div>
        </div>
        <div className="body">
          <p>{this.state.name}</p>
          <p>{this.state.email}</p>
          <p>{this.state.role}</p>
          <p>{this.state.user}</p>
          <PendingRequestList />
        </div>
      </div>
    );
  }
}

export default AdminHome;
