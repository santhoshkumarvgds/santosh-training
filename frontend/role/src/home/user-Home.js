import React from "react";
import history from "../history";
import "../assets/css/home.css";
import Auth from "../auth/auth";
import {UserProvider} from "../context/context";
import Info from '../component/getinfo';

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
       <UserProvider value={{name:this.state.name,email:this.state.email,role:this.state.role}}>
        <div className="header">
          <h3>Codingmart || User</h3>
          <div className="right">
            <a onClick={this.getInfo}>Get info</a>
            <a className="logout-btn" onClick={Auth.logout}>
              Logout
            </a>
          </div>
        </div>
        <div className="body">
         <Info/>
        </div>
        </UserProvider>
      </div>
    );
  }
}

export default UserHome;
