import React, { useState } from "react";
import history from "../../history";
import "../../assets/css/index.css";

export default (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePass = (e) => {
    setPassword(e.target.value);
  };
  const handleChangename = (e) => {
    setName(e.target.value);
  };
  const handleChangeRole = (e) => {
    setRole(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const [nameval, emailval, passwordval, roleval] = [
      name,
      email,
      password,
      role,
    ];
    const response = await fetch("http://localhost:4000/user/signup", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: nameval,
        email: emailval,
        password: passwordval,
        role: roleval,
      }),
    });
    const body = await response.json();
    if (body.message === "Mail exists") {
      alert("Mail exists");
    } else if (body.message === "success") {
      alert("Signup success");
      history.push("/login");
    } else {
      alert(body.message);
    }
  };

  return (
    <div className="section">
      <div className="form">
        <form onSubmit={(e) => handleSubmit(e)}>
          <h1>SIGN UP</h1>

          <input
            className="box"
            type="text"
            name="name"
            value={name}
            placeholder="Name"
            required
            onChange={(e) => handleChangename(e)}
          />
          <br />

          <input
            className="box"
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            required
            onChange={(e) => handleChangeEmail(e)}
          />
          <br />

          <input
            className="box"
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            required
            onChange={(e) => handleChangePass(e)}
          />
          <br />
          <select
            value={role}
            name="role"
            onChange={(e) => handleChangeRole(e)}
          >
            <option value="Select">Select</option>
            <option value="User">User</option>
            <option value="Seller">Seller</option>
          </select>
          <br />
          <br />
          <input
            type="submit"
            id="submitDetails"
            name="submitDetails"
            value="Submit"
          />
          <br />
        </form>
      </div>
    </div>
  );
};
