import React, { useState } from "react";
import "../../assets/css/home.css";
import PendingRequstList from "../../component/PendingRequestList";
import AddAdmin from "../../component/AddAdmin";
import Auth from "../Auth/Auth";
import Context from "../Context/Context";
import Info from "../../component/GetInfo";

export default () => {
  const [render, setRender] = useState("");
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
    <Context>
      <div className="header">
        <h3>Codingmart || Admin</h3>

        <div className="right">
          <a
            onClick={() => {
              handleClick("getinfo");
            }}
          >
            Get Info
          </a>
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
          <a href="/" className="logout-btn" onClick={Auth.logout}>
            Logout
          </a>
        </div>
      </div>
      <div className="body">{renderComp()}</div>
    </Context>
  );
};
