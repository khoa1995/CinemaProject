import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";
import Template from "./components/template";

class Admin extends Component {
  render() {
    if (localStorage.getItem("adminMember")) {
      return (
        <Template>
          <Route
            exact={this.props.exact}
            path={this.props.path}
            component={this.props.component}
          />
        </Template>
      );
    }
    alert("Login first plz!");
    return <Redirect to="login" />;
  }
}

export default Admin;
// import React from "react";
// import { Route } from "react-router-dom";
// import Template from "./components/template";
// import { Redirect } from "react-router-dom";

// export default function Admin({ Component, ...props }) {
//   // const userLogin = JSON.parse(localStorage.getItem("userAdmin"));
//   // if(!userLogin || userLogin !== "QuanTri"){
//   //   alert("Access Denied!");

//   // }
//   return (
//     <Route
//       {...props}
//       render={(propsComponent) => {
//         if (localStorage.getItem("userAdmin")) {
//           return (
//             <Template>
//               <Component {...propsComponent} />
//             </Template>
//           );
//         }
//         alert("Login first plz!");
//         return <Redirect to="/admin" />;
//       }}
//     />
//   );
// }
