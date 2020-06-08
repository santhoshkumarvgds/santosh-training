import React from "react";
import "../../assets/css/home.css";
import PendingRequstList from "../../component/PendingRequestList";
import AddAdmin from "../../component/AddAdmin";
import Auth from "../Auth/Auth";
import Context from "../Context/Context";
import Info from "../../component/GetInfo";

class AdminHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      render: "",
    };
  }

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
        return <Info />;
      default:
        return "";
    }
  }
  render() {
    return (
      <Context>
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
        <div className="body">{this.renderComp()}</div>
      </Context>
    );
  }
}

export default AdminHome;
