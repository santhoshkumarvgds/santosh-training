import React, { useState } from "react";
import "../../assets/css/home.css";
import Auth from "../Auth/Auth";
import Info from "../../component/GetInfo";
import Context from "../Context/Context";

export default function UserHome(){
  const [info, setInfo] = useState(false);
  const getInfo = () => {
    setInfo(true);
  };
  return (
    <Context>
      <div className="header">
        <h3>Codingmart || User</h3>
        <div className="right">
          <a onClick={getInfo}>Get info</a>
          <a href="/" className="logout-btn" onClick={Auth.logout}>
            Logout
          </a>
        </div>
      </div>
      <div className="body">{info ? <Info /> : ""}</div>
    </Context>
  );
};
