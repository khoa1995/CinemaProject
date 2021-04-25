import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "./index.scss";
import { actLogin } from "./modules/action";
import bg from "assets/img/background/rs__background.jpg";
import { Button } from "@material-ui/core";

function LoginPage() {
  const [user, setUser] = useState({ taiKhoan: "", matKhau: "" });
  const history = useHistory();
  const dispatch = useDispatch();
  function handleOnChange(e) {
    let { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    console.log(user);
    dispatch(actLogin(user, history));
  }
  return (
    <div
      className="background__Login"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="login__container" style={{ color: "lightgray" }}>
        <h1 className="display-4 text-center">Login</h1>
        <form className="login__form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Username</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter username"
              name="taiKhoan"
              onChange={handleOnChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              name="matKhau"
              onChange={handleOnChange}
            />
          </div>
          <Button type="submit" variant="contained" style={{ outline: "none" }}>
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
