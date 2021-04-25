import React, { Component } from "react";
import CarouselComponent from "../carousel";
import HeaderComponent from "../header/header";
import FooterComponent from "../footer";
import LoadingComponent from "../loading";
class HomeTemplate extends Component {
  render() {
    let { loading, err } = this.props;
    if (loading) {
      return (
        <>
          <HeaderComponent />
          <LoadingComponent />
        </>
      );
    }
    if (err) {
      return <h5>Something was wrong</h5>;
    }
    return (
      <>
        <HeaderComponent />
        <CarouselComponent />
        {this.props.children}
        <FooterComponent />
      </>
    );
  }
}

export default HomeTemplate;
