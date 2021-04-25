// import { Hidden } from "@material-ui/core";
// import { connect } from "formik";
import React, { Component } from "react";
import "./index.scss";
class HTCRItem extends Component {
  renderTitleTheater = (item, maHTR) => {
    let titleTheater = "";
    switch (maHTR) {
      case "BHDStar":
        titleTheater = "BHD Star";
        break;
      case "CGV":
        titleTheater = "CGV";
        break;
      case "CineStar":
        titleTheater = "CNS";
        break;
      case "MegaGS":
        titleTheater = "MegaGS";
        break;
      case "Galaxy":
        titleTheater = "GLX";
        break;
      case "LotteCinima":
        titleTheater = "Lotte";
        break;
      default:
        break;
    }
    if (titleTheater && titleTheater.length > 0) {
      // console.log(item);
      let infoTheater = item.tenCumRap.substring(titleTheater.length);
      // let infoTheater = item;
      return (
        <>
          <span className={`titleTheater ${maHTR}`}>{titleTheater}</span>
          {infoTheater}
        </>
      );
    } else {
      return null;
    }
  };

  render() {
    const { item, maCR, maHTR } = this.props;

    return (
      <li
        className="cardItem list-group-item row"
        style={{
          height: "91px",
          overflow: "hidden",
        }}
        onClick={() => {
          this.props.maCumRap(item.maCumRap);
        }}
      >
        <img
          style={{ opacity: item.maCumRap === maCR ? 1 : 0.55 }}
          src={
            item.maCumRap.includes("glx-nguyen-du")
              ? `/img/imagesTheater/glx-nguyen-du.png`
              : `/img/imagesTheater/${item.maCumRap}.jpg`
          }
          alt=""
        />

        <div
          className="content__right"
          style={{ opacity: item.maCumRap === maCR ? 1 : 0.55 }}
        >
          <h6 className="titleTheater">
            {this.renderTitleTheater(item, maHTR)}
          </h6>
          <p style={{ margin: 0 }} className="addressTheater">
            {this.props.item.diaChi}
          </p>
        </div>
      </li>
    );
  }
}

export default HTCRItem;
