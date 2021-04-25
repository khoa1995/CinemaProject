import backgroundImg from "assets/img/background/user__background2.jpg";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { CSSTransitionGroup } from "react-transition-group";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import LoadingComponent from "../Components/loading";
import HeaderComponent from "./../Components/header/header";
import InforAccount from "./Components/inforAccount/inforAccount";
import InforTicket from "./Components/inforTicket/inforTicket";
import { getUserInformation } from "./Components/modules/actions";
import "./index.scss";

export default function UserComponent() {
  const [selected, setSelected] = useState("inforAccount");
  const userInformation = useSelector(
    (state) => state.userInforReducer.userInfor
  );
  const loading = useSelector((state) => state.userInforReducer.loading);
  const error = useSelector((state) => state.userInforReducer.err);
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userMember"));
    if (user) {
      dispatch(getUserInformation(user.taiKhoan));
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Bạn vẫn chưa đăng nhập.",
      });
      history.push("/login");
      return;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (location && location.state) {
      setSelected(location.state.selected);
    }
  }, [location]);

  const handleSelect = (value) => {
    setSelected(value);
  };

  const renderUserContent = () => {
    const user = JSON.parse(localStorage.getItem("userMember"));
    if (!user) return;
    switch (selected) {
      case "inforAccount":
        return (
          <div className="item" key={1}>
            <InforAccount handleSelect={handleSelect} user={userInformation} />
          </div>
        );
      case "inforTicket":
        return (
          <div className="item" key={2}>
            <InforTicket handleSelect={handleSelect} infor={userInformation} />
          </div>
        );
      default:
        return null;
    }
  };
  if (loading) return <LoadingComponent />;
  if (error) return <h1>Oops... something went wrong!</h1>;

  return (
    <>
      <HeaderComponent />
      <div className="user__container">
        <div className="background__content">
          {/* <img src={backgroundImg} alt="" className="user__background" /> */}
          <div
            className="user__background"
            style={{ backgroundImage: `url(${backgroundImg})` }}
          ></div>
          <div className="background__filter"></div>
        </div>
        <div className="header">
          <ul className="nav">
            <li
              className={
                selected === "inforAccount" ? "li-item selected" : "li-item"
              }
              onClick={() => {
                handleSelect("inforAccount");
              }}
            >
              Thông tin tài khoản
            </li>
            <li
              className={
                selected === "inforTicket" ? "li-item selected" : "li-item"
              }
              onClick={() => {
                handleSelect("inforTicket");
              }}
            >
              Lịch sử đặt vé
            </li>
          </ul>
        </div>

        <div className="cssAnimation__content">
          <CSSTransitionGroup
            transitionName="item"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={400}
          >
            {renderUserContent()}
          </CSSTransitionGroup>
        </div>
      </div>
    </>
  );
}
