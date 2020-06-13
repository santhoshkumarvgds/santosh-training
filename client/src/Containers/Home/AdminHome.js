import React, { useContext, useState } from "react";
import "../../assets/css/home.css";
import Context from "../Context/Context";
import { UserContext } from "../Context/Context";
import AllProduct from "../../component/AllProduct";
import PendingRequstList from "../../component/PendingRequestList";
import AddAdmin from "../../component/AddAdmin";
import Auth from "../Auth/Auth";
import Info from "../../component/GetInfo";

export default function AdminHome() {
  const { role, loginStatus } = useContext(UserContext);
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
      case "product":
        return <AllProduct />;
      default:
        return <AllProduct />;
    }
  };
  return (
    <React.Fragment>


          <div className="header">
            <h3>Shoppy</h3>
          {loginStatus ? (
            <React.Fragment>
            <div className="right">
              <a
                onClick={() => {
                  handleClick("product");
                }}
              >
                Product
              </a>
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
              <a className="logout-btn" onClick={Auth.logout}>
                Logout
              </a>
          </div>
        </React.Fragment>
      ) :  (
         <React.Fragment>
           <div className="right">
             <a href="/" className="login-btn">
               Login
             </a>
           </div>
         </React.Fragment>
       )}
       </div>
      {loginStatus? <div className="body">{renderComp()}</div>:""}
    </React.Fragment>
  );
}
