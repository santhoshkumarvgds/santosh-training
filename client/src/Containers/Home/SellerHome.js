import React, { useState } from "react";
import history from "../../history";
import "../../assets/css/home.css";
import Auth from "../Auth/Auth";
import Info from "../../component/GetInfo";
import Context from "../Context/Context";

export default () => {
  const [info, setInfo] = useState(false);
  const getInfo = () => {
    setInfo(true);
  };
  return (
    <Context>
      <div className="header">
        <h3>Codingmart || Seller</h3>
        <div className="right">
          <a onClick={() => getInfo()}>Get info</a>
          <a className="logout-btn" onClick={Auth.logout}>
            Logout
          </a>
        </div>
      </div>
      <div className="body">{info ? <Info /> : ""}</div>
    </Context>
  );
};
