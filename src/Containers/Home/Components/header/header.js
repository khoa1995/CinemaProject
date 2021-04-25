import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import tixLogo from "assets/img/tix-logo.png";
import "./index.scss";
import Select from "react-select";

class HeaderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locationSelect: { value: 1, label: "Hồ Chí Minh" },
      locationSelectOpen: false,
    };
  }

  locationList = () => {
    return [
      { value: 1, label: "Hồ Chí Minh" },
      { value: 2, label: "Hà Nội" },
      { value: 3, label: "Hải Phòng" },
      { value: 4, label: "Đà Nẵng" },
      { value: 5, label: "Đồng Nai" },
      { value: 6, label: "Bà Rịa" },
      { value: 7, label: "Vũng Tàu" },
    ];
  };

  handleLocationChange = (value) => {
    // console.log(e.target.value);
    this.setState({
      locationSelect: value,
      // locationSelectOpen: false,
    });
    // setTimeout(() => {
    //   window.location.reload();
    // }, 500);
  };

  handleClickTK = () => {
    // if (this.props.location.pathname === "/user") return;
    this.props.history.push({
      pathname: `/user`,
      state: { selected: "inforAccount" },
    });
  };
  handleClickThoat = () => {
    // console.log("Logout!");
    if (this.props.location.pathname === "/user") {
      localStorage.removeItem("userMember");
      this.props.history.push("");
    } else {
      localStorage.removeItem("userMember");
      window.location.reload();
    }
  };
  renderUserInfor = () => {
    const user = JSON.parse(localStorage.getItem("userMember"));
    if (user)
      return (
        <div to="#" href="#" className="signin logged">
          <i className="fa fa-user-circle"></i>
          <img src="/img/avatar-login.png" alt="" />
          <span> {user.taiKhoan}</span>
          <ul className="dropdown-content">
            <li
              className="li__item"
              onClick={() => {
                this.handleClickTK();
              }}
            >
              Tài khoản
            </li>

            <Link
              className="li__item moveVeDaDatLink"
              to={{
                pathname: "/user",
                state: { selected: "inforTicket" },
              }}
            >
              Vé đã đặt
            </Link>

            <li
              className="li__item"
              onClick={() => {
                this.handleClickThoat();
              }}
            >
              Thoát
            </li>
          </ul>
        </div>
      );
    else
      return (
        <Link to="/login" href="#" className="signin">
          <i className="fa fa-user-circle"></i>
          <img src="/img/avatar-login.png" alt="" />
          <span>Đăng nhập</span>
        </Link>
      );
  };
  handleLinkClick = (elementId) => {
    setTimeout(() => {
      var ele = document.getElementById(elementId);
      ele.scrollIntoView();
    }, 300);
  };
  render() {
    return (
      <header>
        <Link
          onClick={() => {
            this.handleLinkClick("carouselId");
          }}
          to={{ pathname: "/" }}
          className="logo"
        >
          <img src={tixLogo} alt="" />
        </Link>
        <nav className="header__menu">
          <ul className="mb-0">
            <li>
              {/* <a href="#idPhimDangChieu" to="/">
                Lịch chiếu
              </a> */}
              <Link
                onClick={() => {
                  this.handleLinkClick("idPhimDangChieu");
                }}
                to={{ pathname: "/" }}
              >
                Lịch chiếu
              </Link>
            </li>
            <li>
              <Link
                onClick={() => {
                  this.handleLinkClick("idCumRap");
                }}
                to={{ pathname: "/" }}
              >
                Cụm rạp
              </Link>
            </li>
            <li>
              <Link
                onClick={() => {
                  this.handleLinkClick("idTinTuc");
                }}
                to={{ pathname: "/" }}
              >
                Tin tức
              </Link>
            </li>
            <li>
              <Link
                onClick={() => {
                  this.handleLinkClick("idUngDung");
                }}
                to={{ pathname: "/" }}
              >
                Ứng dụng
              </Link>
            </li>
          </ul>
        </nav>
        <div className="header__right__content">
          {this.renderUserInfor()}
          <div className="location">
            <i
              className="locationIcon material-icons"
              style={{ color: "#b9b9b9" }}
            >
              location_on
            </i>
            {/* <InputLabel htmlFor="locationSelect">Age</InputLabel> */}
            <Select
              className="selectLocation"
              isSearchable={false}
              value={this.state.locationSelect}
              onChange={this.handleLocationChange}
              options={this.locationList()}
            />
          </div>
        </div>
      </header>
    );
  }
}

export default withRouter(HeaderComponent);
