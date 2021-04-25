import React from "react";
import { NavLink, useHistory, withRouter } from "react-router-dom";
import "./index.scss";

function Header(props) {
  const { step } = props;
  const history = useHistory();
  const handleClickTK = () => {
    history.push({
      pathname: `/user`,
      state: { selected: "inforAccount" },
    });
  };
  const handleClickThoat = () => {
    // console.log("Logout!");
    localStorage.removeItem("userMember");
    history.push("");
  };

  const renderUserInfor = () => {
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
                handleClickTK();
              }}
            >
              Tài khoản
            </li>

            <NavLink
              className="li__item moveVeDaDatLink"
              to={{
                pathname: "/user",
                state: { selected: "inforTicket" },
              }}
            >
              Vé đã đặt
            </NavLink>

            <li
              className="li__item"
              onClick={() => {
                handleClickThoat();
              }}
            >
              Thoát
            </li>
          </ul>
        </div>
      );
  };

  return (
    <nav
      className="checkout__header"
      style={{ height: "90px" }} //backgroundColor: "orange",
    >
      <ul className="checkout__ul">
        <li className={step === 1 ? "li-item active" : "li-item"}>
          <span className="step">01</span> Chọn ghế & thanh toán
        </li>
        <li className={step === 2 ? "li-item active" : "li-item"}>
          <span className="step">02</span> Kết quả đặt vé
        </li>
        {step === 2 && (
          <li
            onClick={() => {
              history.push("/");
            }}
            className="li-item btn__home"
            style={{ cursor: "pointer" }}
          >
            <span className="step"></span> Quay lại trang Chủ
          </li>
        )}
      </ul>
      <div id="user__content" className="user__content">
        {renderUserInfor()}
      </div>
    </nav>
  );
}
export default withRouter(Header);
