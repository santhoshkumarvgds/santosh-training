import React from "react";

const UserContext = React.createContext();
const UserProvider = UserContext.Provider;
const UserConsumer = UserContext.Consumer;

export {UserConsumer, UserProvider}


// export default ({children}) => {
//   const [currentUserEmail, setemail] = useState();
//   const [currentUserRole, setrole] = useState();

//       // setemail(Auth.userEmail);
//       // setrole(Auth.authenticateStatus);
//   return (
//     <div>
//         <AuthContext.Provider value={{ email : "hi",role :"hi"}}>
//           {children}
//         </AuthContext.Provider>
//     </div>
//   );
// };
