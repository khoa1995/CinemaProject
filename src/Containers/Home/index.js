import React, { Component } from "react";
import { Route } from "react-router-dom";
import HomeTemplate from "./Components/Template";
// import Template from "./Components/Template";

class Home extends Component {
  render() {
    return (
      <HomeTemplate>
        <Route
          exact={this.props.exact}
          path={this.props.path}
          component={this.props.component}
        />
      </HomeTemplate>
    );
  }
}

export default Home;
