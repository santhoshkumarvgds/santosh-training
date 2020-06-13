import React, { useState, useContext } from "react";
import "../../assets/css/home.css";
import Context,{ UserContext } from "../Context/Context";
import Auth from "../Auth/Auth";
import AllProduct from "../../component/AllProduct";
import Info from "../../component/GetInfo";
import Orders from '../../component/UserOrder';

export default function UserHome() {
   const [render, setRender] = useState("");
   const { role, loginStatus } = useContext(UserContext);
   const handleClick = (compName) => {
     setRender(compName);
   };
   const renderComp = () => {
     switch (render) {
       case "getinfo":
         return <Info />;
       case "product":
        return <AllProduct />;
       case "orders":
        return <Orders />;
      default:
        return <AllProduct />;
     }
   };
   return (
     <Context>
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
              <div className="right">
              <a
                onClick={() => {
                  handleClick("orders");
                }}
              >
                Orders
              </a>
               <a
                 onClick={() => {
                   handleClick("getinfo");
                 }}
               >
                 Get Info
               </a>
               <a className="logout-btn" onClick={Auth.logout}>
                 Logout
               </a>
             </div>
             </div>
           </React.Fragment>
         ) : (
           <React.Fragment>
             <div className="right">
               <a href="/" className="login-btn">
                 Login
               </a>
             </div>
           </React.Fragment>
         )}
       </div>
       <div className="body">{renderComp()}</div>
     </Context>
   );
}
