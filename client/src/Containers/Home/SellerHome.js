import React, { useState, useContext } from "react";
import "../../assets/css/home.css";
import { UserContext } from "../Context/Context";
import AddProduct from "../../component/seller/AddProduct";
import UserProduct from "../../component/seller/Products";
import Auth from "../Auth/Auth";
import Info from "../../component/GetInfo";

export default function SellerHome() {
 const [render, setRender] = useState("");
 const { role, loginStatus } = useContext(UserContext);
 const handleClick = (compName) => {
   setRender(compName);
 };
 const renderComp = () => {
   switch (render) {
    //  case "product":
    //    return <UserProduct />;
     case "Add Product":
       return <AddProduct />;
     case "getinfo":
       return <Info />;
     default:
       return <UserProduct />;
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
              >Product</a>
             <a
               onClick={() => {
                 handleClick("getinfo");
               }}
             >
               Get Info
             </a>
             <a
               onClick={() => {
                 handleClick("Add Product");
               }}
             >
              Add Product
             </a>

             <a className="logout-btn" onClick={Auth.logout}>
               Logout
             </a>
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
     {loginStatus? <div className="body">{renderComp()}</div>:""}
   </React.Fragment>
 );
}
