import React, { Component } from "react";
import { connect } from "react-redux";
import HTCRItem from "./cumRapItem";
import { actGetHTCR } from "./modules/action";
class HeThongCumRapComponent extends Component {
  componentDidMount = () => {
    this.props.actGetHTCR(this.props.maHTR);
  };
  componentDidUpdate(prevProps) {
    if (this.props.maHTR !== prevProps.maHTR) {
      let maCR;
      switch (this.props.maHTR) {
        case "BHDStar":
          maCR = "bhd-star-cineplex-3-2";
          break;
        case "CGV":
          maCR = "cgv-aeon-binh-tan";
          break;
        case "CineStar":
          maCR = "cns-hai-ba-trung";
          break;
        case "Galaxy":
          maCR = "glx-huynh-tan-phat";
          break;
        case "LotteCinima":
          maCR = "lotte-cantavil";
          break;
        case "MegaGS":
          maCR = "megags-cao-thang";

          break;
        default:
          maCR = "";
          break;
      }
      this.props.actGetMaCumRap(maCR);
    }
  }

  getMaCumRap = (item) => {
    this.props.actGetMaCumRap(item);
  };

  handleRenderItem = () => {
    const { maCR, HTCRList, maHTR } = this.props;
    return HTCRList.map((item, index) => {
      return (
        <HTCRItem
          key={index}
          item={item}
          maCR={maCR}
          maCumRap={this.getMaCumRap}
          maHTR={maHTR}
        />
      );
    });
  };
  render() {
    return <ul className="list-group">{this.handleRenderItem()}</ul>;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actGetHTCR: (maHTR) => {
      dispatch(actGetHTCR(maHTR));
    },
    actGetMaCumRap: (data) =>
      dispatch({ type: "GET_MA_CUM_RAP", payload: data }),
  };
};
const mapStateToProps = (state) => {
  return {
    HTCRList: state.hTCRReducer.heThongCumRap,
    maHTR: state.hTCRReducer.maHTR,
    maCR: state.lichChieuPhimReducer.maCumRap,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeThongCumRapComponent);
