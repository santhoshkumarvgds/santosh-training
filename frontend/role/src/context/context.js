import React, { useState, createContext, useEffect, Children } from "react";
import Auth from "../auth/auth";

const AuthContext = createContext();

export default ({children}) => {
  const [currentUserEmail, setemail] = useState();
  const [currentUserRole, setrole] = useState();
  useEffect(() => {
      setemail(Auth.userEmail);
      setrole(Auth.authenticateStatus);
  }, []);
  return (
    <div>
        <AuthContext.Provider value={{ email : currentUserEmail,role :currentUserRole}}>
          {Children}
        </AuthContext.Provider>
    </div>
  );
};
