import React from "react";
import history from "../../history";
import "../../assets/css/home.css";
import Auth from "../Auth/Auth";
import Info from "../../component/GetInfo";
import Context from "../Context/Context";

class SellerHome extends React.Component {
  constructor() {
    super();
    this.state = {
      info: false,
    };
  }
  getInfo = () => {
    this.setState({
      info: true,
    });
  };
  handleLogout() {
    localStorage.clear();
    history.push("/");
  }
  render() {
    return (
      <Context>
        <div className="header">
          <h3>Codingmart || Seller</h3>
          <div className="right">
            <a onClick={this.getInfo}>Get info</a>
            <a  className="logout-btn" onClick={Auth.logout}>
              Logout
            </a>
          </div>
        </div>
        <div className="body">{this.state.info ? <Info /> : ""}</div>
      </Context>
    );
  }
}

export default SellerHome;
