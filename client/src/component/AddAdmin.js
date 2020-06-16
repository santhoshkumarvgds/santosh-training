import React,{useState} from "react";
import "../assets/css/index.css";

export default function AddAdmin(props){
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
    const response = await fetch("http://localhost:4000/user/addadmin", {
      method: "post",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: nameval,
        email: emailval,
        password: passwordval,
        role: roleval,
      }),
    });
    const body = await response.json();
      alert(body.message);
  };

  return (
    <div className="section">
      <div className="form">
        <form onSubmit={(e) => handleSubmit(e)}>
          <h1>Add Admin</h1>

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
