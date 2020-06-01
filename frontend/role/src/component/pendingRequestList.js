import React, { useEffect, useState } from "react";

const PendingRequstList = () => {
  const [listUser, setUser] = useState([]);
  const getList = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/user/pendingapprovel",
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      const arr=[];
      for(var i=0;i<data.emaillist.length;i++){
        arr.push(data.emaillist[i].email);
      }
      setUser(arr);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getList();
  },[]);
  const accept = async(email)=>{
    try{
        const responseAccept = await fetch("http://localhost:4000/user/accept", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
      })
    });
    }catch(error){
      console.log(error);
    }
  }
  const reject = async(email)=>{
   try{
        const responseAccept = await fetch("http://localhost:4000/user/reject", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
      })
    });
    const a="a";
    setUser(a);
    }catch(error){
      console.log(error);
    }
  }
  return (
    <div className="PendingRequstList">
      <p>PendingRequstList</p>
      <div className="table">
      <table>
      <thead>
      <tr key="thead">
        <th>User Mail</th>
        <th>Accept</th>
        <th>Reject</th>
      </tr>
      </thead>
      <tbody key="tbody">
        {listUser.map((item)=>
        <tr key={item}>
          <td>{item}</td>
          <td><a onClick={()=>accept(item)}>Accept</a></td>
          <td><a onClick={()=>reject(item)}>Reject</a></td>
        </tr>

      )}
      </tbody>
      </table>
      </div>
    </div>
  );
};

export default PendingRequstList;
