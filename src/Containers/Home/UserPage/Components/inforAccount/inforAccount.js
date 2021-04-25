import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import ChangePasswordComponent from "./components/changePasswordComponent";
import InforAccountComponent from "./components/inforAccountComponent";
import UpdateInforComponent from "./components/updateInforComponent";
import { CSSTransitionGroup } from "react-transition-group";

export default function InforAccount(props) {
  const { user } = props;
  const [key, setKey] = useState("inforAccount");
  const history = useHistory();

  const renderComponent = () => {
    switch (key) {
      case "inforAccount":
        return (
          <div className="accComponent" key={1}>
            <InforAccountComponent user={user} />
          </div>
        );
      case "updateInfor":
        return (
          <div className="accComponent" key={2}>
            <UpdateInforComponent user={user} />
          </div>
        );
      case "changePassword":
        return (
          <div className="accComponent" key={3}>
            <ChangePasswordComponent user={user} />
          </div>
        );
      default:
        return;
    }
  };

  const handleSelect = (value) => {
    setKey(value);
  };

  const handleLogout = () => {
    localStorage.removeItem("userMember");
    history.push("/");
  };

  return (
    <div className="user__content row">
      {/* <h3>Thông Tin Tài Khoản</h3> */}
      <div
        className="sideBar col-sm-4"
        style={{ borderRight: "1px solid #868686" }}
      >
        <nav>
          <ul>
            <li
              onClick={() => {
                handleSelect("inforAccount");
              }}
              className={
                key === "inforAccount" ? "li-item text-white" : "li-item"
              }
            >
              Thông tin tài khoản
            </li>
            <li
              onClick={() => {
                handleSelect("updateInfor");
              }}
              className={
                key === "updateInfor" ? "li-item text-white" : "li-item"
              }
            >
              Cập nhật thông tin
            </li>
            <li
              onClick={() => {
                handleSelect("changePassword");
              }}
              className={
                key === "changePassword" ? "li-item text-white" : "li-item"
              }
            >
              Thay đổi mật khẩu
            </li>
            <li
              onClick={() => {
                props.handleSelect("inforTicket");
              }}
              className="li-item"
            >
              Lịch sử đặt vé
            </li>
            <li
              onClick={() => {
                handleLogout();
              }}
              className="li-item"
            >
              Đăng xuất
            </li>
          </ul>
        </nav>
      </div>
      <div className="user__infor col-sm-8">
        <CSSTransitionGroup
          transitionName="accComponent"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={400}
        >
          {renderComponent()}
        </CSSTransitionGroup>
      </div>
    </div>
  );
}
