import React, { useState, useEffect, useContext } from "react";
import Context,{ UserContext } from "../Containers/Context/Context";
import "../assets/css/addproduct.css";
import DeleteProduct from "./DeleteProduct";
import history from "../history.js";

export default function UserProduct(props) {
  const [list, setList] = useState([]);
  const [temp,setTemp] = useState([]);
  const [search, setSearch] = useState("");
  const { role,loginStatus } = useContext(UserContext);
  const arr = [];
  const getList = async () => {
    try {
      const response = await fetch("http://localhost:4000/user/allproduct", {
        method: "post",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      for (var i = data.productlist.length - 1; i >= 0; i--) {
        arr.push(data.productlist[i]);
      }
      setTemp(arr);
      setList(arr);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getList();
  }, []);


  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const searchSubmit = async (e) => {
    setList(temp.filter(((value) => value.product_category == search)))
    e.preventDefault();
    // try {
    //   const response = await fetch("http://localhost:4000/user/searchproduct", {
    //     method: "post",
    //     credentials: "include",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       search: search,
    //     }),
    //   });
    //   const data = await response.json();
    //   for (var i = data.productlist.length - 1; i >= 0; i--) {
    //     arr.push(data.productlist[i]);

    //   }
    //   setList(arr);
    // } catch (error) {
    //   console.log(error);
    // }
  };


  const clickProduct = (id) => {
    history.push("/product?id="+id);
  };

  const allproduct=()=>{
    setList(temp);
    setSearch("");
  }
  return (
    <Context>
      <div className="product-list">
        <h3
          title="click to view all product"
          className="left"
          onClick={() => {
           allproduct()
          }}
        >
          All product
        </h3>
        <br />
        <div className="right">
          <form onSubmit={searchSubmit}>
            <input
              type="text"
              placeholder="search"
              value={search}
              onChange={handleChange}
              required
            />
            <input type="submit" />
          </form>
        </div>
        <br />
          <React.Fragment>
            {list.map((item) => (
              <div key={item.id} className="list">
                <h3>{item.product_name}</h3>
                <img src={item.product_image}/>
                <p>Rs.{item.product_prize}</p>
                <p>{item.product_companyname}</p>
                {item.product_assured?<p className="product-assured">{item.product_assured}</p>:<p className="product-assured">...</p>}
                <a onClick={() => clickProduct(item.id)}>view more </a>

              </div>
            ))}
          </React.Fragment>
      </div>
    </Context>
  );
}
