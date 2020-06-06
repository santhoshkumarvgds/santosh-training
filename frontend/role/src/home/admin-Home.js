import React from "react";
import history from "../history";
import "../assets/css/home.css";
import  PendingRequstList from "../component/pendingRequestList";
import AddAdmin from "../component/addAdmin";
import Auth from "../auth/auth";
import {UserProvider} from "../context/context";
import Info from '../component/getinfo';

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

 async getInfo(){
    const response = await fetch("http://localhost:4000/user/getinfo", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.token,
      },
    });
    const body = await response.json();
    // alert(body.role);

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
      case "getinfo":
        return <Info/>
    }
  }
  componentWillMount(){
    this.getInfo();
  }

  render() {
    return (
            <div>
            <UserProvider value={{name:this.state.name,email:this.state.email,role:this.state.role}}>
              <div className="header">
               <h3>Codingmart || Admin</h3>

                <div className="right">
                  <a
                    onClick={() => {
                      this.handleClick("getinfo");
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

                {this.renderComp()}
              </div>

              </UserProvider>
            </div>


    );
   }
}

export default AdminHome;
