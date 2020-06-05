import { useEffect } from "react";
import history from "../history";

class Auth {
  constructor(props) {
    this.authenticateStatus = false;
    this.pendingStatus = false;
    this.userEmail = "";
    this.userPassword = "";
  }
  

  async login(cb) {
    localStorage.clear();
    const [email, password] = [this.userEmail, this.userPassword];
    const response = await fetch("http://localhost:4000/user/login", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email[0],
        password: password[0],
      }),
    });
    const body = await response.json();
    if (body.message == "success" && body.role == "User") {
      localStorage.setItem("token", body.token);
      this.authenticateStatus = "user";
      //   history.push("/user");
      cb();
    } else if (body.message == "success" && body.role == "Admin") {
      localStorage.setItem("token", body.token);
      this.authenticateStatus = "admin";
      //   history.push("/admin");
      cb();
    } else if (body.message == "success" && body.role == "Seller") {
      localStorage.setItem("token", body.token);
      this.authenticateStatus = "seller";
      //   history.push("/seller");
      cb();
    } else if (body.message == "Approvel pending" && body.status != "reject") {
      localStorage.setItem("redirect", "pendingapprovel");
      this.pendingStatus = true;
      this.authenticateStatus = "seller";
      //   history.push("/pendingapprovel")
      cb();
    } else if (body.message == "Approvel pending" && body.status == "reject") {
      alert("You're rejected by Admin!!!");
      this.authenticateStatus = "reject";
    } else {
      alert(body.message);
    }
  }

  logout() {
    localStorage.clear();
    Auth.authenticateStatus = false;
    history.push("/");
  }

  isAuthenticate() {
    return this.authenticateStatus;
  }
}

export default new Auth();
