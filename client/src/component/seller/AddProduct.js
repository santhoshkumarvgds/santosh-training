import React, { useState } from "react";
import axios from "axios";
import "../../assets/css/addproduct.css";
// import { UserConsumer } from "../Containers/Context/Context";
// import moduleName from 'react-filepond';

export default class AddProduct extends React.Component {
  constructor() {
    super();
    this.state = {
      productName: "",
      productImage: "",
      productPrize: "",
      productCategory: "",
      productCompanyName: "",
      productWarranty: "",
      productDescription: "",
    };
  }
  async handleChangefile(e) {
    this.setState({
      [e.target.name]: [e.target.files[0]],
    });
    // alert(e.target.value);
    var myHeaders = new Headers();

    var formdata = new FormData();
    formdata.append("productimage", e.target.files[0]);

    var requestOptions = {
      method: "POST",
      credentials: "include",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch("http://localhost:4000/user/productimage", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: [e.target.value],
    });
  }
  async add(e) {
    e.preventDefault();

    const response = await fetch("http://localhost:4000/user/addproduct", {
      method: "post",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productname: this.state.productName[0],
        productimage: "file",
        productprize: this.state.productPrize[0],
        productcategory: this.state.productCategory[0],
        productcompanyname: this.state.productCompanyName[0],
        productwarranty: this.state.productWarranty[0],
        productdescription: this.state.productDescription[0],
      }),
    });

    const body = await response.json();
    if (body.status == "success") {
      alert("product added");
      window.location.reload();
    } else {
      alert("product add failed");
    }
  }
  render() {
    return (
      <React.Fragment>
        <div className="product">
          <div className="product add">
            <form onSubmit={(e) => this.add(e)}>
              <input
                type="text"
                name="productName"
                placeholder="Product name"
                value={this.state.productName}
                onChange={(e) => this.handleChange(e)}
              />
              <br />
              <br />
              <input
                type="file"
                name="productImage"
                accept="image/*"
                onChange={(e) => this.handleChangefile(e)}
              />
              <br />
              <br />

              <input
                type="text"
                name="productPrize"
                value={this.state.productPrize}
                placeholder="product prize"
                onChange={(e) => this.handleChange(e)}
              />
              <br />
              <br />
              <input
                type="text"
                name="productCategory"
                placeholder="productCategory"
                value={this.state.productCategory}
                onChange={(e) => this.handleChange(e)}
              />
              <br />
              <br />
              <input
                type="text"
                name="productCompanyName"
                placeholder="productCompanyName"
                value={this.state.productCompanyName}
                onChange={(e) => this.handleChange(e)}
              />
              <br />
              <br />
              <input
                type="text"
                name="productWarranty"
                placeholder="productWarranty"
                value={this.state.productWarranty}
                onChange={(e) => this.handleChange(e)}
              />
              <br />
              <br />
              <textarea
                placeholder="product details & description"
                value={this.state.productDescription}
                onChange={(e) => this.handleChange(e)}
                name="productDescription"
              ></textarea>
              <br />
              <br />
              <input type="submit" />
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
