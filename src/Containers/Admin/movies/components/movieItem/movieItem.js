import React from "react";
import PropTypes from "prop-types";
import { Button, Icon } from "@material-ui/core";
import BuildIcon from "@material-ui/icons/Build";
import DeleteIcon from "@material-ui/icons/Delete";
import { red } from "@material-ui/core/colors";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import dayjs from "dayjs";
MovieItem.propTypes = {
  movieList: PropTypes.array,
};

function MovieItem(props) {
  function handleUpdate(value) {
    props.handleUpdate(value);
  }

  function handleDelete(id) {
    props.handleDelete(id);
  }

  return (
    <>
      {props.movieList.map((item, index) => {
        return (
          <tr
            style={{ backgroundColor: index % 2 === 0 ? "beige" : "white" }}
            key={item.maPhim}
          >
            <td>{item.maPhim}</td>
            <td style={{ maxWidth: "300px" }}>{item.tenPhim}</td>
            <td className="text-center">{item.danhGia}</td>
            <td className="text-center">
              {dayjs(item.ngayKhoiChieu).format("DD/MM/YYYY")}
            </td>
            <td>
              <img
                src={item.hinhAnh}
                alt="hinhAnh"
                style={{ width: "45px", height: "70px" }}
              />
            </td>
            <td className="d-flex justify-content-center">
              <Button
                size="small"
                style={{
                  outline: "none",
                  minWidth: "32px",
                  marginRight: "10px",
                }}
                title="Cập nhật phim"
                onClick={() => {
                  handleUpdate(item);
                }}
                data-toggle="modal"
                data-target="#movieModal"
              >
                <BuildIcon
                  className="text-success"
                  fontSize="small"
                  style={{ padding: 0 }}
                />
              </Button>
              <Button
                className="text-primary"
                size="small"
                style={{
                  outline: "none",
                  minWidth: "32px",
                  marginRight: "10px",
                }}
                title="Thêm lịch chiếu"
                onClick={() => {
                  props.handleSchedule(item);
                }}
                data-toggle="modal"
                data-target="#scheduleModal"
              >
                <Icon fontSize="small" style={{ padding: 0 }}>
                  add_circle
                </Icon>
              </Button>
              <Button
                size="small"
                style={{ outline: "none", minWidth: "32px" }}
                title="Xóa phim"
                onClick={() => {
                  Swal.fire({
                    allowOutsideClick: false,
                    title: "Vui lòng xác nhận",
                    text: `Bạn chắc chắn muốn xóa phim ${item.tenPhim}?`,
                    denyButtonText: `Xóa`,
                    showDenyButton: true,
                    showConfirmButton: false,
                    showCancelButton: true,
                  }).then((res) => {
                    if (res.isDenied) handleDelete(item.maPhim);
                  });
                }}
              >
                <DeleteIcon fontSize="small" style={{ color: red[500] }} />
              </Button>
            </td>
          </tr>
        );
      })}
    </>
  );
}

export default MovieItem;
