import React, { Component } from "react";
import { connect } from "react-redux";
import { actGetMovieSchedule } from "./modules/action";
import "./index.scss";

class HeThongRapComponent extends Component {
  componentDidMount = () => {
    this.props.actGetMovieSchedule();
  };
  handleClick = (item) => {
    this.props.maHTR(item);
  };
  renderHTRC = () => {
    let { data, maHeThongRap } = this.props;

    if (data && data.length > 0) {
      return data.map((item, index) => {
        return (
          <li
            className="list-group-item"
            style={{
              padding: 20,
              // opacity: item.maHeThongRap === maHeThongRap ? 1 : 0.4,
            }}
            key={index}
            onClick={() => {
              this.handleClick(item);
            }}
          >
            <img
              src={item.logo}
              alt=""
              style={{
                width: "50px",
                height: "50px",
                opacity: item.maHeThongRap === maHeThongRap ? 1 : 0.55,
              }}
            />
          </li>
        );
      });
    }
  };
  render() {
    return <ul className="list-group">{this.renderHTRC()}</ul>;
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.heThongRapReducer.loading,
    data: state.heThongRapReducer.data,
    err: state.heThongRapReducer.err,
    maHeThongRap: state.hTCRReducer.maHTR,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actGetMovieSchedule: () => {
      dispatch(actGetMovieSchedule());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeThongRapComponent);
