import React, { useState, useEffect } from "react";
import "../../assets/css/addproduct.css";

export default function UserProduct() {
  const [list, setList] = useState([]);
  const getList = async () => {
    try {
      const response = await fetch("http://localhost:4000/user/sellerproduct", {
        method: "post",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      const arr = [];
      for (var i = data.productlist.length - 1; i >= 0; i--) {
        arr.push(data.productlist[i]);
      }
      setList(arr);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getList();
  }, []);
  return (
    <React.Fragment>
      <div className="product-list">
        {list.map((item) => (
          <div key={item.id} className="list">
                <h3>{item.product_name}</h3>
                <img src={item.product_image}/>
                <p>Rs.{item.product_prize}</p>
                <p>{item.product_companyname}</p>
                {item.product_assured?<p className="product-assured">{item.product_assured}</p>:<p className="product-assured">...</p>}

              </div>
        ))}
      </div>
    </React.Fragment>
  );
}
