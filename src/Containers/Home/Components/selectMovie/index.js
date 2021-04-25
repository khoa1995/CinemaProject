import { Button } from "@material-ui/core";
import Axios from "axios";
import dayjs from "dayjs";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Select from "react-select";
import { compose } from "redux";
import "./index.scss";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
// import MenuList from "./CustomMenuList/menuList";

class SelectMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maPhim: "",
      maRap: "",
      selectRapOpen: false,
      ngayXem: "",
      selectNgayXemOpen: false,
      suatChieu: "",
      selectSuatChieuOpen: false,
      scheduleMovieInfor: null,
      scheduleMovie: null,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.maPhim.value &&
      this.state.maPhim.value !== prevState.maPhim.value
    ) {
      Axios({
        url: `https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${this.state.maPhim.value}`,
        data: this.state.maPhim.value,
      })
        .then((res) => {
          this.setState({
            maRap: "",
            ngayXem: "",
            suatChieu: "",
            selectRapOpen: true,
            selectNgayXemOpen: false,
            selectSuatChieuOpen: false,
            scheduleMovieInfor: res.data,
          });
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
    if (
      this.state.maRap.value &&
      this.state.maRap.value !== prevState.maRap.value
    ) {
      this.setState({ ngayXem: "", suatChieu: "", selectSuatChieuOpen: false });
    }
    if (
      this.state.ngayXem.value &&
      this.state.ngayXem.value !== prevState.ngayXem.value
    ) {
      this.setState({ suatChieu: "" });
    }
  }

  handleMovieChange = (item) => {
    this.setState({ maPhim: item });
    // console.log(item.value);
  };
  renderMovieList = () => {
    const { movieList } = this.props;
    let movieNameList = [];
    // console.log(movieList);
    if (!movieList || movieList.length <= 0) return;
    let index = movieList.findIndex((x) => x.maPhim === 5125);
    movieList
      .slice(0, index + 1)
      .reverse()
      .forEach((item) => {
        movieNameList.push({
          value: `${item.maPhim}`,
          label: `${item.tenPhim}`,
        });
      });
    // console.log(movieNameList);
    return movieNameList;
  };

  handleTheaterOpen = () => {
    this.setState({ selectRapOpen: true });
  };

  handleTheaterClose = () => {
    this.setState({ selectRapOpen: false });
  };

  handleTheaterChange = (item) => {
    if (item.value !== null) {
      this.setState({ maRap: item });

      const { scheduleMovieInfor } = this.state;
      const giDay = scheduleMovieInfor.heThongRapChieu
        .find((x) => x.maHeThongRap === item.maHTR)
        .cumRapChieu.find((x) => x.maCumRap === item.value);
      this.setState({
        scheduleMovie: giDay,
        selectRapOpen: false,
        selectNgayXemOpen: true,
      });
    }
  };
  renderTheaterList = () => {
    const { scheduleMovieInfor } = this.state;
    let movieTheaterList = [];
    if (!scheduleMovieInfor) {
      movieTheaterList.push({ value: null, label: "Mời chọn phim trước!" });
    } else {
      scheduleMovieInfor.heThongRapChieu.forEach((itemHTR) => {
        itemHTR.cumRapChieu.forEach((itemCR) => {
          movieTheaterList.push({
            value: `${itemCR.maCumRap}`,
            label: `${itemCR.tenCumRap}`,
            maHTR: `${itemHTR.maHeThongRap}`,
          });
        });
      });
    }
    return movieTheaterList;
  };

  handleTimeOpen = () => {
    this.setState({ selectNgayXemOpen: true });
  };

  handleTimeClose = () => {
    this.setState({ selectNgayXemOpen: false });
  };

  handleTimeChange = (time) => {
    if (time.value === null) return;
    this.setState({ ngayXem: time, selectSuatChieuOpen: true });
  };

  renderTimeList = () => {
    const now = dayjs();
    let timeList = [];
    if (!this.state.maPhim || !this.state.maRap) {
      timeList.push({ value: null, label: "Mời chọn phim và rạp trước!" });
    } else {
      for (let i = 0; i < 5; i++) {
        if (i === 0) {
          timeList.push({
            value: `${now.format("DD/MM/YYYY")}`,
            label: "Hôm Nay",
          });
        } else if (i === 1)
          timeList.push({
            value: `${now.add(i, "day").format("DD/MM/YYYY")}`,
            label: "Ngày Mai",
          });
        else
          timeList.push({
            value: `${now.add(i, "day").format("DD/MM/YYYY")}`,
            label: `${now.add(i, "day").format("DD/MM/YYYY")}`,
          });
      }
    }
    return timeList;
  };
  handleScheduleMovieOpen = () => {
    this.setState({ selectSuatChieuOpen: true });
  };

  handleScheduleMovieClose = () => {
    this.setState({ selectSuatChieuOpen: false });
  };

  handleScheduleMovieChange = (item) => {
    if (item.value === null) return;
    this.setState({ suatChieu: item });
  };

  renderScheduleMovie = () => {
    const now = dayjs();
    let scheduleMovieList = [];

    if (this.state.maPhim && this.state.maRap && this.state.ngayXem) {
      const scheduleMovieValid = this.state.scheduleMovie.lichChieuPhim.filter(
        (item) => {
          return (
            dayjs(item.ngayChieuGioChieu).format("DD/MM/YYYY") ===
              this.state.ngayXem.value &&
            dayjs(item.ngayChieuGioChieu).diff(now) > 0
          );
        }
      );
      scheduleMovieValid.sort((a, b) =>
        dayjs(a.ngayChieuGioChieu).diff(dayjs(b.ngayChieuGioChieu))
      );
      scheduleMovieValid.forEach((item) => {
        scheduleMovieList.push({
          value: `${item.maLichChieu}`,
          label: `${dayjs(item.ngayChieuGioChieu).format("HH:mm")}`,
        });
      });
      if (scheduleMovieList.length > 0) return scheduleMovieList;
      else {
        scheduleMovieList.push({
          value: null,
          label: "Không có suất chiếu nào!",
        });
        return scheduleMovieList;
      }
    }
    scheduleMovieList.push({
      value: null,
      label: "Mời chọn phim, rạp và ngày xem trước!",
    });
    return scheduleMovieList;
  };

  handleOrder = () => {
    const user = JSON.parse(localStorage.getItem("userMember"));
    if (!user) {
      Swal.fire({
        title: "Bạn chưa đăng nhập!",
        text: "Hãy đăng nhập trước khi đặt vé.",
      });
      setTimeout(() => {
        this.props.history.push({
          pathname: "/login",
          state: {
            scheduleId: `${this.state.suatChieu.value}`,
            time: `${this.state.suatChieu.label}`,
          },
        });
      }, 500);
    } else {
      this.props.history.push({
        pathname: `/checkout/${this.state.suatChieu.value}`,
        time: `${this.state.suatChieu.label}`,
      });
    }
  };

  render() {
    const { maPhim, maRap, ngayXem, suatChieu } = this.state;

    return (
      <div className="select__content">
        <div className="selectFilm" style={{ width: "30%" }}>
          <Select
            isSearchable
            placeholder="Chọn Phim..."
            value={maPhim}
            onChange={this.handleMovieChange}
            options={this.renderMovieList()}
          />
        </div>
        <div className="selectTheater" style={{ width: "22%" }}>
          <Select
            isSearchable={maPhim !== "" ? true : false}
            // isDisabled={!maPhim}
            placeholder="Chọn Rạp..."
            menuIsOpen={this.state.selectRapOpen}
            onMenuClose={this.handleTheaterClose}
            onMenuOpen={this.handleTheaterOpen}
            // components={{ MenuList }}
            value={maRap}
            onChange={this.handleTheaterChange}
            options={this.renderTheaterList()}
          />
        </div>
        <div className="selectTime" style={{ width: "calc(48% / 3)" }}>
          <Select
            isSearchable={false}
            // isDisabled={!maPhim}
            menuIsOpen={this.state.selectNgayXemOpen}
            onMenuClose={this.handleTimeClose}
            onMenuOpen={this.handleTimeOpen}
            placeholder="Ngày Xem..."
            // components={{ MenuList }}
            value={ngayXem}
            onChange={this.handleTimeChange}
            options={this.renderTimeList()}
          />
        </div>
        <div
          className="selectScheduleMoviee"
          style={{ width: "calc(48% / 3)" }}
        >
          <Select
            isSearchable={false}
            menuIsOpen={this.state.selectSuatChieuOpen}
            onMenuClose={this.handleScheduleMovieClose}
            onMenuOpen={this.handleScheduleMovieOpen}
            placeholder="Suất Chiếu..."
            value={suatChieu}
            onChange={this.handleScheduleMovieChange}
            options={this.renderScheduleMovie()}
          />
        </div>
        <div className="datVeContainer" style={{ width: "calc(48% / 3)" }}>
          <Button
            className="btn-datVe"
            disabled={!suatChieu}
            variant="contained"
            onClick={() => {
              this.handleOrder();
            }}
          >
            Đặt vé
          </Button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    movieList: state.moviesReducer.movieList,
  };
};
export default compose(withRouter, connect(mapStateToProps, null))(SelectMovie);
