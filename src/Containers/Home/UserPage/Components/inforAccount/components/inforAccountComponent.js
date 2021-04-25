import React from "react";

export default function InforAccountComponent(props) {
  const { user } = props;
  return (
    <div className="col-sm-12">
      <h6 className="text-right col-sm-8 mb-3">Thông tin tài khoản</h6>

      <div className="infor__item row">
        <p className="title">Tài khoản</p>
        <p className="infor">{user.taiKhoan}</p>
      </div>
      <div className="infor__item row">
        <p className="title">Họ tên</p>
        <p className="infor">{user.hoTen}</p>
      </div>
      <div className="infor__item row">
        <p className="title">Email</p>
        <p className="infor">{user.email}</p>
      </div>
      <div className="infor__item row">
        <p className="title">Số điện thoại</p>
        <p className="infor">{user.soDT ? user.soDT : user.soDt}</p>
      </div>
    </div>
  );
}
