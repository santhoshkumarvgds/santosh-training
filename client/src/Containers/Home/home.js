import React, { useState, useContext } from "react";
import { UserContext } from "../Context/Context";
import "../../assets/css/home.css";
import PendingRequstList from "../../component/PendingRequestList";
import AddAdmin from "../../component/AddAdmin";
import Auth from "../Auth/Auth";
import history from '../../history';
import Context from "../Context/Context";
import Info from "../../component/GetInfo";

export default function AdminHome() {
  const [render, setRender] = useState("");
  const { role, loginStatus } = useContext(UserContext);
  const handleClick = (compName) => {
    setRender(compName);
  };
  const renderComp = () => {
    switch (render) {
      case "pendingUser":
        return <PendingRequstList />;
      case "addAdmin":
        return <AddAdmin />;
      case "getinfo":
        return <Info />;
      default:
        return "";
    }
  };
  return (
    <div>
      {loginStatus ? (
        <React.Fragment>
          {" "}
          <div className="header">
                      <h3>Codingmart || {role}</h3>

            <div className="right">
              <a
                onClick={() => {
                  handleClick("getinfo");
                }}
              >
                Get Info
              </a>
              {role == "Admin" ? (
                <React.Fragment>
                  <a
                    onClick={() => {
                      handleClick("addAdmin");
                    }}
                  >
                    Add Admin
                  </a>
                  <a
                    onClick={() => {
                      handleClick("pendingUser");
                    }}
                  >
                    Pending user
                  </a>
                </React.Fragment>
              ) : (
                ""
              )}

              <a className="logout-btn" onClick={Auth.logout}>
                Logout
              </a>
            </div>
          </div>
          <div className="body">{renderComp()}</div>
        </React.Fragment>
      ) : "please login"}
    </div>
  );
}
