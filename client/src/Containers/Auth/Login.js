import React, { useState } from "react";
import history from "../../history";
import "../../assets/css/index.css";
import Auth from "./Auth";

export default (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePass = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    Auth.userEmail = email;
    Auth.userPassword = password;
    Auth.login(() => {
      if (Auth.pendingStatus) props.history.push("/pendingapprovel");
      else props.history.push(Auth.authenticateStatus);
    });
  };

  return (
    <div className="section">
      <div className="form">
        <form onSubmit={(e) => handleSubmit(e)}>
          <h1>LOG IN</h1>
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
          <input
            type="submit"
            id="submitDetails"
            name="submitDetails"
            value="Submit"
          />
          <br />
          <p>Have not account yet?</p>
          <a
            href="#/"
            onClick={(e) => {
              history.push("/signup");
            }}
          >
            Sign up
          </a>
        </form>
      </div>
    </div>
  );
};
