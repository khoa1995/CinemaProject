import React from "react";
import "./App.css";
import { routesAdminPage, routesHomePage } from "./Routes";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Containers/Home";
import Admin from "./Containers/Admin";
import LoginPage from "./Containers/Admin/login";
import CheckOut from "Containers/Home/HomePage/checkout";
import MovieDetail from "Containers/Home/HomePage/MovieDetail";
import UserLogin from "Containers/Home/HomePage/login";
import UserComponent from "Containers/Home/UserPage";
import Result from "Containers/Home/HomePage/checkout/result/result";
function App() {
  const showLayoutHomePage = (routes) => {
    if (routes && routes.length > 0) {
      return routes.map((item, index) => {
        return (
          <Home
            key={index}
            path={item.path}
            exact={item.exact}
            component={item.component}
          />
        );
      });
    }
  };
  const showLayoutAdminPage = (routes) => {
    if (routes && routes.length > 0) {
      return routes.map((item, index) => {
        return (
          <Admin
            key={index}
            path={item.path}
            exact={item.exact}
            component={item.component}
          />
        );
      });
    }
  };
  return (
    <BrowserRouter>
      <Switch>
        {showLayoutHomePage(routesHomePage)}
        {showLayoutAdminPage(routesAdminPage)}
        <Route path="/user" component={UserComponent} />
        <Route path="/login" component={UserLogin} />
        <Route path="/admin/login" component={LoginPage} />
        <Route path="/movie/:id" component={MovieDetail} />
        <Route path="/checkout/result" exact component={Result} />
        <Route path="/checkout/:scheduleId" exact component={CheckOut} />

        <Route path="" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
