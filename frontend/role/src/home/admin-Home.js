import React, { useEffect } from "react";
import history from "../history";
import "../assets/css/home.css";
import PendingRequstList from "../component/pendingRequestList";
import AddAdmin from "../component/addAdmin";
import Auth from "../auth/auth";
import context from "../context/context";

class AdminHome extends React.Component {
  constructor(props) {
    super(props);
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
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.token,
      },
    });
    const body = await response.json();
    // console.log(body);
    this.setState({
      name: body.name,
      email: body.email,
      role: body.role,
      render: "",
    });
  };
  handleClick(compName) {
    this.setState({
      render: compName,
    });
  }
  renderComp() {
    switch (this.state.render) {
      case "pendingUser":
        return <PendingRequstList />;
      case "addAdmin":
        return <AddAdmin />;
    }
  }
  render() {
    return (
            <div>
              <div className="header">
               <h3>Codingmart || Admin</h3>
                <div className="right">
                  <a
                    onClick={() => {
                      this.getInfo();
                    }}
                  >
                    Get Info
                  </a>
                  <a
                    onClick={() => {
                      this.handleClick("addAdmin");
                    }}
                  >
                    Add Admin
                  </a>
                  <a
                    onClick={() => {
                      this.handleClick("pendingUser");
                    }}
                  >
                    Pending user
                  </a>
                  <a className="logout-btn" onClick={Auth.logout}>
                    Logout
                  </a>
                </div>
              </div>
              <div className="body">
                <p>{this.state.name}</p>
                <p>{this.state.email}</p>
                <p>{this.state.role}</p>
                <p>{this.state.user}</p>
                {this.renderComp()}
              </div>
            </div>


    );
   }
}

export default AdminHome;
