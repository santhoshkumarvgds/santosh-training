import React from "react";
import history from "../history";
import "../assets/css/home.css";

class SellerHome extends React.Component {
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
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.token,
      },
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

  render() {
    return (
      <div>
        <div className="header">
          <h3>Codingmart || Seller</h3>
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
        </div>
      </div>
    );
  }
}

export default SellerHome;
