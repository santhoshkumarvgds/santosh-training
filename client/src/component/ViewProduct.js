import React, { useState, useEffect, useContext } from "react";
import history from "../history.js";
import DeleteProduct from "./DeleteProduct";

export default function ViewProduct(props) {
  const path = window.location.href.split("=");
  const idval = path[path.length - 1];

  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [image, setImgae] = useState();
  const [prize, setPrize] = useState();
  const [companyname, setCompanyname] = useState();
  const [warranty, setWarranty] = useState();
  const [assured, setAssured] = useState();
  const [description, setDescription] = useState();
  const [role, setRole] = useState();

  const deletepro = () => {
    DeleteProduct.delete(idval);
  };

  const order = async () => {
    try {
      const response = await fetch("http://localhost:4000/user/placeorder", {
        method: "post",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: idval,
        }),
      });
      const data = await response.json();
      if (data.status == "success") {
        alert("Placed Your Order");
      } else {
        alert("Try again");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const assuredProduct = async () => {
    try {
      const response = await fetch("http://localhost:4000/user/assured", {
        method: "post",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: idval,
        }),
      });
      const data = await response.json();
      if (data.status == "assured") {
        alert("product assured");
      } else {
        alert(data.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getProduct = async () => {
    try {
      const response = await fetch("http://localhost:4000/user/getproduct", {
        method: "post",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: idval,
        }),
      });
      const data = await response.json();

      setName(data.productlist.product_name);
      setImgae(data.productlist.product_image)
      setPrize(data.productlist.product_prize);
      setCompanyname(data.productlist.product_companyname);
      setWarranty(data.productlist.product_warranty);
      setDescription(data.productlist.product_description);
      setEmail(data.productlist.email);
      setAssured(data.productlist.product_assured);
      setRole(data.role);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProduct();
  }, []);

  const back = () => {
    var backhistory = role;
    if (role == null) {
      backhistory = "user";
    }
    history.push(backhistory);
  };

  return (
    <React.Fragment>
      <div className="header">
        <div className="left">
          <a
            className="login-btn"
            onClick={() => {
              back();
            }}
          >
            Back
          </a>
        </div>
        <div className="right">
          <a
            className="login-btn"
            onClick={() => {
              alert("Copy the link and share \n" + window.location.href);
            }}
          >
            Share
          </a>
        </div>
        <br />
        <br />
      </div>
      <div className="single-product">
        <center>
        <img
          src={`http://localhost:4000/${image}`}
          width="600px"
        />
        </center>
        <h1>{name}</h1>
        <br />
        <h2>Rs. {prize}</h2>
        <h3>Brand : {companyname}</h3>
        <h3>warranty : {warranty}</h3>
        <h3>{assured}</h3>
        <h3>{description}</h3>
        {role ? (
          role == "Admin" ? (
            <React.Fragment>
              <a
                title="click to open seller mail"
                className="mail"
                href={"mailto:" + email}
              >
                seller : {email}
              </a>
              <h3 className="delete" onClick={() => deletepro()}>
                delete
              </h3>
              <br />
              <h3 className="assured" onClick={() => assuredProduct()}>
                assured
              </h3>
            </React.Fragment>
          ) : (
            <h3
              className="buy"
              onClick={() => {
                order();
              }}
            >
              Buy Now
            </h3>
          )
        ) : (
          <h3
            className="buy"
            onClick={() => {
              history.push("/");
            }}
          >
            Login to Buy
          </h3>
        )}
      </div>
    </React.Fragment>
  );
}
