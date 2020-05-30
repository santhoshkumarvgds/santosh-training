import React, { useState } from "react";
import history from "../history";
import "../index.css";

export default class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: [e.target.value],
    });
  }
  async handleSubmit(e) {
    localStorage.clear();
    e.preventDefault();
    const { email, password } = this.state;
    // console.log(name);
    const response = await fetch("http://localhost:4000/user/login", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email[0],
        password: password[0],
      }),
    });
    // console.log(response);
    const body = await response.json();
    // console.log(body);
    // console.log(response.status);
    if (body.message == "success" && body.role == "User") {
      localStorage.setItem("token", body.token);
      localStorage.setItem("redirect", "user");
      history.push("/user");
      // localStorage.clear();
      // console.log(localStorage);
      // localStorage.setItem("role", body.role);
      // localStorage.setItem("count",1);
      // alert(localStorage.role);
    } else if (body.message == "Approvel pending") {
      localStorage.setItem("redirect", "pendingapprovel");
      localStorage.setItem("pendingrequest", body.pendingrequest);
      history.push("/pendingapprovel");

      // localStorage.clear();
      // alert("Role " + localStorage.role);
      // localStorage.setItem("role", body.role);
      // alert("Role " + localStorage.role);
      // localStorage.setItem("count", 1);
    } else if (body.message == "success" && body.role == "Seller") {
      localStorage.setItem("token", body.token);
      localStorage.setItem("redirect", "seller");
      history.push("/seller");
      // localStorage.setItem("role", body.role);
    } else {
      alert(body.message);
    }
  }

  render() {
    return (
      <div className="section">
        <div className="form">
          <form onSubmit={this.handleSubmit}>
            <h1>LOG IN</h1>
            <input
              className="box"
              type="email"
              name="email"
              value={this.state.email}
              placeholder="E-Mail"
              required
              onChange={this.handleChange}
            />
            <br />

            <input
              className="box"
              type="password"
              name="password"
              value={this.state.password}
              placeholder="Password"
              required
              onChange={this.handleChange}
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
  }
}
// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const onSubmitLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("http://localhost:4000/user/login", {
//         method: "post",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           email: email,
//           password: password,
//         }),
//       });
//       const body = await response.json();
//       // console.log(body);
//       // console.log(response.status);
//       if (body.message == "success") {
//         localStorage.setItem("token", body.token);
//         localStorage.setItem("email", email);
//         history.push("/user");
//       } else if (body.message == "Approvel pending") {
//         history.push("pendingapprovel");
//       } else {
//         alert(body.message);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="section">
//       <div className="form">
//         <form onSubmit={onSubmitLogin}>
//           <h1>LOG IN</h1>
//           <input
//             className="box"
//             type="email"
//             name="email"
//             id="email"
//             placeholder="E-Mail"
//             required
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <br />

//           <input
//             className="box"
//             type="password"
//             name="password"
//             id="password"
//             placeholder="Password"
//             required
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <br />
//           <input
//             type="submit"
//             id="submitDetails"
//             name="submitDetails"
//             value="Submit"
//           />
//           <br />
//           <p>Have not account yet?</p>
//           <a
//             onClick={(e) => {
//               history.push("/signup");
//             }}
//           >
//             Sign up
//           </a>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Login;
