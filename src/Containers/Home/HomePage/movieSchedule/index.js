import React, { Component } from "react";
import HeThongRapComponent from "./heThongRap";
import HeThongCumRapComponent from "./heThongCumRap";
import { actGetHTCR } from "./heThongCumRap/modules/action";
import { connect } from "react-redux";
import LichChieuPhimComponent from "./lichChieuPhim";
import "./index.scss";
class MovieSchedule extends Component {
  maRapDangChon = "";
  sendProps = (item) => {
    if (item && item.maHeThongRap !== null) {
      this.maRapDangChon = item.maHeThongRap;
      this.props.actGetMaHTR(this.maRapDangChon);
      // console.log(this.maRapDangChon);
      this.props.actGetHTCR(this.maRapDangChon);
    }
  };

  // renderHTCR = () => {
  //   if (this.maRapDangChon && this.maRapDangChon !== null) {
  //     return <HeThongCumRapComponent maHTR={this.maRapDangChon} />;
  //   } else {
  //     return <HeThongCumRapComponent />;
  //   }
  // };
  render() {
    return (
      <div
        className=""
        style={{ width: "80%", margin: "0 auto", paddingBottom: 75 }}
      >
        <div id="idCumRap" className="idCumRap"></div>
        <div className="row">
          <div className="heThongRap__content">
            <HeThongRapComponent maHTR={this.sendProps} />
          </div>
          <div className="heThongCumRap__content">
            <HeThongCumRapComponent />
          </div>
          <div className="listMovie__content">
            <LichChieuPhimComponent />
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actGetHTCR: (maHTR) => {
      dispatch(actGetHTCR(maHTR));
    },
    actGetMaHTR: (data) => dispatch({ type: "GET_MA_HTR", payload: data }),
  };
};

export default connect(null, mapDispatchToProps)(MovieSchedule);
