import { Button, Input, InputAdornment } from "@material-ui/core";
import { green, red } from "@material-ui/core/colors";
import { Search } from "@material-ui/icons";
import BuildIcon from "@material-ui/icons/Build";
import DeleteIcon from "@material-ui/icons/Delete";
import Pagination from "@material-ui/lab/Pagination";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import AddUserModal from "./components/modal/addUserModal";
import "./index.scss";
import {
  actAddNewUser,
  actDeleteUser,
  actGetAllUser,
  actPushUserNeedUpdate,
  actUpdateUser,
} from "./modules/action";

function UserManagement(props) {
  const responseData = useSelector((state) => state.userReducer.data);

  const UserNeedUpdate = useSelector(
    (state) => state.userReducer.userNeedUpdate
  );

  const dispatch = useDispatch();
  const [page, setPage] = React.useState(1);
  const [keyWord, setKeyWord] = useState("");
  const [updatingUser, setUpdatingUser] = useState(false);
  const typingTimeoutRef = useRef(null);
  let initialState = {
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDt: "",
    maNhom: "GP01",
    maLoaiNguoiDung: "",
    hoTen: "",
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      setKeyWord(value);
    }, 400);
    setPage(1);

    // console.log(keyWord);
    // dispatch(actGetAllUser(keyWord, 1, 8));
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };
  useEffect(() => {
    dispatch(actGetAllUser(keyWord, page, 8));
  }, [dispatch, page, keyWord]);

  const createNewUser = (user) => {
    dispatch(actAddNewUser(user));
  };

  function handleDelete(taiKhoan) {
    Swal.fire({
      allowOutsideClick: false,
      title: "Vui lòng xác nhận",
      text: `Bạn chắc chắn muốn xóa tài khoản ${taiKhoan} ?`,
      denyButtonText: `Xóa`,
      showDenyButton: true,
      showConfirmButton: false,
      showCancelButton: true,
      cancelButtonText: "Không xóa",
    }).then((res) => {
      if (res.isDenied) dispatch(actDeleteUser(taiKhoan));
    });
  }

  function getUserNeedToUpdate(user) {
    console.log(UserNeedUpdate);
    setUpdatingUser(true);
    dispatch(actPushUserNeedUpdate(user));
  }

  const handleUpdate = (user) => {
    const newUser = { ...user, maNhom: "GP01" };
    dispatch(actUpdateUser(newUser));
  };

  function handleRenderTable() {
    if (responseData) {
      return responseData.items.map((item, index) => {
        return (
          <tr
            style={{ backgroundColor: index % 2 === 0 ? "beige" : "white" }}
            key={index}
          >
            <td>{item.taiKhoan}</td>
            <td>{item.hoTen}</td>
            <td
              style={{
                maxWidth: "290px",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {item.email}
            </td>
            <td>{item.maLoaiNguoiDung}</td>
            <td className="d-flex justify-content-center">
              <Button
                size="small"
                style={{ outline: "none" }}
                onClick={() => {
                  getUserNeedToUpdate(item);
                }}
                data-toggle="modal"
                data-target="#userModal"
                title="Cập nhật tài khoản"
              >
                <BuildIcon fontSize="small" style={{ color: green[500] }} />
              </Button>
              <Button
                size="small"
                style={{ outline: "none" }}
                title="Xóa tài khoản"
                onClick={() => {
                  handleDelete(item.taiKhoan);
                }}
              >
                <DeleteIcon fontSize="small" style={{ color: red[500] }} />
              </Button>
            </td>
          </tr>
        );
      });
    }
  }
  return (
    <div id="userAdmin__content">
      <h1 className="text-center display-4 text-success">User Management</h1>
      <nav className="d-flex justify-content-between mb-4">
        <Input
          variant="contained"
          onChange={handleSearchChange}
          placeholder="Search Here..."
          endAdornment={
            <InputAdornment position="end">
              <Search />
            </InputAdornment>
          }
          type="search"
        />
        <Button
          className="text-success border-success"
          variant="outlined"
          data-toggle="modal"
          data-target="#userModal"
          style={{ outline: "none" }}
          onClick={() => {
            setUpdatingUser(false);
            // dispatch(actSendMovieUpdating({}));
          }}
        >
          Thêm Người Dùng
        </Button>
      </nav>
      <table className="table mt-5">
        <thead>
          <tr>
            <th>Tài Khoản</th>
            <th>Họ Tên</th>
            <th>Email</th>
            <th>Loại TK</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>{handleRenderTable()}</tbody>
      </table>
      <Pagination
        count={responseData ? responseData.totalPages : 10}
        page={page}
        size="large"
        color="standard"
        onChange={handlePageChange}
      />

      <AddUserModal
        initialState={updatingUser ? UserNeedUpdate : initialState}
        updatingUser={updatingUser}
        handleSubmit={createNewUser}
        handleUpdate={handleUpdate}
      />
    </div>
  );
}

export default UserManagement;
