import React from "react";
import "../../assets/css/home.css";
import Context from "../Context/Context";
import Home from './home';

export default function SellerHome(){
  return (
    <Context>
      <Home />
    </Context>
  );
};
