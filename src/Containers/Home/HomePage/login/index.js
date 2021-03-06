import logoFB from "assets/img/loginImg/fb_icon_2013.svg.png";
import logoGG from "assets/img/loginImg/gg_icon.png";
import logo from "assets/img/loginImg/logoWithSlogan.png";
import logoTW from "assets/img/loginImg/tw_icon.png";
import logoZL from "assets/img/loginImg/zalo_.jpg";
import Axios from "axios";
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Button, FormFeedback, FormGroup, Input, Label } from "reactstrap";
import "./index.scss";
import Signup from "./signup";

class UserLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taiKhoan: "",
      matKhau: "",
      invalid: false,
    };
  }
  handleSubmit = () => {
    let data = { taiKhoan: this.state.taiKhoan, matKhau: this.state.matKhau };
    Axios({
      url: "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap",
      method: "POST",
      data: data,
    })
      .then((res) => {
        if (res.data.maLoaiNguoiDung === "KhachHang") {
          localStorage.setItem("userMember", JSON.stringify(res.data));
          this.setState({ invalid: false });
          if (!this.props.location.state) {
            this.props.history.push("");
          }
          if (
            this.props.location.state &&
            this.props.location.state.scheduleId
          ) {
            this.props.history.push(
              `/checkout/${this.props.location.state.scheduleId}`
            );
          }
        } else {
          this.setState({ invalid: true });
        }
      })
      .catch((err) => {
        this.setState({ invalid: true });
      });
  };
  handleOnChange = (e) => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
  };
  handleAddClassClick = () => {
    var loginForm = document.getElementById("loginForm");
    var signupForm = document.getElementById("signUpForm");
    loginForm.classList.add("signUp__mode");
    signupForm.classList.add("signUp__show");
  };
  handleRemoveClassClick = () => {
    var loginForm = document.getElementById("loginForm");
    var signupForm = document.getElementById("signUpForm");
    loginForm.classList.remove("signUp__mode");
    signupForm.classList.remove("signUp__show");
  };
  renderSocialLogo = () => {
    return (
      <>
        <Link to="#">
          <img
            className="logo__item"
            src={logoFB}
            style={{ width: "40px", height: "40px" }}
            alt=""
          />
        </Link>

        <Link to="#">
          <img
            className="logo__item"
            src={logoGG}
            style={{ width: "40px", height: "40px" }}
            alt=""
          />
        </Link>
        <Link to="#">
          <img
            className="logo__item"
            src={logoZL}
            style={{ width: "40px", height: "40px" }}
            alt=""
          />
        </Link>
        <Link to="#">
          <img
            className="logo__item"
            src={logoTW}
            style={{ width: "40px", height: "40px" }}
            alt=""
          />
        </Link>
      </>
    );
  };

  handleSignUp = () => {};

  render() {
    return (
      <div className="userLogin">
        <div className="signup__content" id="signUpForm">
          <Link to="/">
            <img className="logo" src={logo} alt="logo" />
          </Link>
          <div className="form__content">
            <h6 className="text-white text-left">
              M???i ??i???n th??ng tin v??o form b??n d?????i
            </h6>
            <Signup />
          </div>
          <p className="text-white m-0">
            b???n ???? c?? t??i kho???n?{" "}
            <Link
              onClick={() => {
                this.handleRemoveClassClick();
              }}
              to="#"
              className="a-link"
            >
              ????ng nh???p ngay!
            </Link>
          </p>
          {/* <p className="text-white ">Ho???c ????ng nh???p v???i</p>
          <div className="social__logo">{this.renderSocialLogo()}</div> */}
        </div>

        <div className="login__content" id="loginForm">
          <Link to="/">
            <img className="logo" src={logo} alt="logo" />
          </Link>
          <div className="form__content">
            <FormGroup>
              <Label for="taiKhoan">T??i Kho???n</Label>
              <Input
                // placeholder="T??i Kho???n"
                type="text"
                name="taiKhoan"
                id="taiKhoan"
                onChange={this.handleOnChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="matKhau">M???t kh???u</Label>
              <Input
                invalid={this.state.invalid}
                type="password"
                name="matKhau"
                id="matKhau"
                onChange={this.handleOnChange}
              />
              <FormFeedback>T??i kho???n ho???c m???t kh???u kh??ng ????ng!</FormFeedback>
            </FormGroup>
            <Button
              className="btn-submit"
              onClick={() => {
                this.handleSubmit();
              }}
            >
              ????ng nh???p
            </Button>
          </div>
          <p className="text-white m-0">
            b???n ch??a c?? t??i kho???n?{" "}
            <Link
              onClick={() => {
                this.handleAddClassClick();
              }}
              to="#"
              className="a-link"
            >
              ????ng k?? ngay!
            </Link>
          </p>
          <p className="text-white mb-1">Ho???c ????ng nh???p v???i</p>
          <div className="social__logo">{this.renderSocialLogo()}</div>
        </div>
      </div>
    );
  }
}
export default withRouter(UserLogin);
