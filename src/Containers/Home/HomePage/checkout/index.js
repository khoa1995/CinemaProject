import {
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Input,
  InputLabel,
  Radio,
  RadioGroup,
  makeStyles,
} from "@material-ui/core";
import LoadingComponent from "Containers/Home/Components/loading";
import dayjs from "dayjs";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import Header from "./components/header";
import "./index.scss";
import { actBookingTickets, actGetTicketRoom } from "./modules/actions";
import * as Yup from "yup";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormLabel-root.Mui-focused": {
      color: "#f79400",
    },
    "& .MuiInput-underline:after": {
      borderBottom: "2px solid #f79400",
    },
    "& .MuiInput-underline.Mui-focused:after": {
      borderColor: "#f79400",
    },
    "& .MuiRadio-colorSecondary.Mui-checked": {
      color: "#f79400",
    },
    "& .MuiFormControl-root": {
      height: "55px",
    },
  },
}));

export default function CheckOut() {
  const classes = useStyles();
  const [timeString, settimeString] = useState("");
  const ticketRoom = useSelector((state) => state.ticketRoomReducer.ticketRoom);
  const loading = useSelector((state) => state.ticketRoomReducer.loading);
  const dispatch = useDispatch();
  const history = useHistory();
  const { scheduleId } = useParams();
  const [warning, setWarning] = useState(true);
  const [state, setstate] = useState([]);
  const [datVe, setDatVe] = useState({
    maLichChieu: "",
    taiKhoanNguoiDung: "",
    danhSachVe: [],
  });
  const [listGheDangChon, setListGheDangChon] = useState([]);
  const [radioButtonValue, setradioButtonValue] = useState("");

  const handleRadioButtonChange = (event) => {
    setradioButtonValue(event.target.value);
  };

  // lấy thông tin phòng chiếu và thông tin người đặt vé
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userMember"));
    if (!user) {
      Swal.fire({
        title: "Bạn chưa đăng nhập!",
        text: "Hãy đăng nhập trước khi đặt vé.",
      });
      history.push("/login");
      return;
    }

    const { taiKhoan } = user;
    const datVeClone = {
      ...datVe,
      maLichChieu: scheduleId,
      taiKhoanNguoiDung: taiKhoan,
    };
    setDatVe(datVeClone);

    dispatch(actGetTicketRoom(scheduleId));
    // setTimeout(() => {
    //   alert("TIME UP!!!");
    //   window.location.reload();
    // }, 10000);
    let timeCountDown = 300;
    const intervalCountDown = setInterval(() => {
      handleCountDown(timeCountDown);
      timeCountDown -= 1;
      if (timeCountDown < 0) {
        setTimeout(() => {
          clearInterval(intervalCountDown);
          Swal.fire({
            allowOutsideClick: false,
            title: "Hết thời gian giữ ghế",
            text: "Vui lòng đặt vé trong vòng 5 phút!",
            confirmButtonText: `Ok!`,
          }).then((res) => {
            if (res.isConfirmed) window.location.reload();
          });
        }, 300);
      }
    }, 1000);

    return () => {
      clearInterval(intervalCountDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // lấy danh sách ghế
  useEffect(() => {
    if (ticketRoom && ticketRoom.danhSachGhe) {
      const { ngayChieu, gioChieu } = ticketRoom.thongTinPhim;
      const partTimes = ngayChieu.split("/");

      const timeChieuChuan = dayjs(
        `${+partTimes[2]}/${partTimes[1]}/${+partTimes[0]}T${gioChieu}`
      )
        .add(768, "minute")
        .format();
      const timeBooking = dayjs().format();

      if (dayjs(timeBooking).diff(timeChieuChuan) > 0) {
        history.push("/");
        Swal.fire({
          icon: "info",
          title: "Suất chiếu này đã bắt đầu!",
          text: "Mời bạn chọn suất chiếu khác!",
        });
      }
      let DSG = [...ticketRoom.danhSachGhe];
      // eslint-disable-next-line
      DSG = DSG.map((item) => {
        if (+item.stt / 16 <= 1 && item.daDat === false) {
          return { ...item, dangChon: false, tenGhe: `A${item.tenGhe}` };
        } else if (+item.stt / 16 <= 1 && item.daDat === true) {
          return {
            ...item,
            dangChon: true,
            tenGhe: `A${item.tenGhe}`,
          };
        } else if (+item.stt / 16 <= 2 && item.daDat === false) {
          return {
            ...item,
            dangChon: false,
            tenGhe:
              "B" +
              `0${+item.tenGhe % 16 === 0 ? 16 : +item.tenGhe % 16}`.slice(-2),
          };
        } else if (+item.stt / 16 <= 2 && item.daDat === true) {
          return {
            ...item,
            dangChon: true,
            tenGhe:
              "B" +
              `0${+item.tenGhe % 16 === 0 ? 16 : +item.tenGhe % 16}`.slice(-2),
          };
        } else if (+item.stt / 16 <= 3 && item.daDat === false) {
          return {
            ...item,
            dangChon: false,
            tenGhe:
              "C" +
              `0${+item.tenGhe % 16 === 0 ? 16 : +item.tenGhe % 16}`.slice(-2),
          };
        } else if (+item.stt / 16 <= 3 && item.daDat === true) {
          return {
            ...item,
            dangChon: true,
            tenGhe:
              "C" +
              `0${+item.tenGhe % 16 === 0 ? 16 : +item.tenGhe % 16}`.slice(-2),
          };
        } else if (+item.stt / 16 <= 4 && item.daDat === false) {
          return {
            ...item,
            dangChon: false,
            tenGhe:
              "D" +
              `0${+item.tenGhe % 16 === 0 ? 16 : +item.tenGhe % 16}`.slice(-2),
          };
        } else if (+item.stt / 16 <= 4 && item.daDat === true) {
          return {
            ...item,
            dangChon: true,
            tenGhe:
              "D" +
              `0${+item.tenGhe % 16 === 0 ? 16 : +item.tenGhe % 16}`.slice(-2),
          };
        } else if (+item.stt / 16 <= 5 && item.daDat === false) {
          return {
            ...item,
            dangChon: false,
            tenGhe:
              "E" +
              `0${+item.tenGhe % 16 === 0 ? 16 : +item.tenGhe % 16}`.slice(-2),
          };
        } else if (+item.stt / 16 <= 5 && item.daDat === true) {
          return {
            ...item,
            dangChon: true,
            tenGhe:
              "E" +
              `0${+item.tenGhe % 16 === 0 ? 16 : +item.tenGhe % 16}`.slice(-2),
          };
        } else if (+item.stt / 16 <= 6 && item.daDat === false) {
          return {
            ...item,
            dangChon: false,
            tenGhe:
              "F" +
              `0${+item.tenGhe % 16 === 0 ? 16 : +item.tenGhe % 16}`.slice(-2),
          };
        } else if (+item.stt / 16 <= 6 && item.daDat === true) {
          return {
            ...item,
            dangChon: true,
            tenGhe:
              "F" +
              `0${+item.tenGhe % 16 === 0 ? 16 : +item.tenGhe % 16}`.slice(-2),
          };
        } else if (+item.stt / 16 <= 7 && item.daDat === false) {
          return {
            ...item,
            dangChon: false,
            tenGhe:
              "G" +
              `0${+item.tenGhe % 16 === 0 ? 16 : +item.tenGhe % 16}`.slice(-2),
          };
        } else if (+item.stt / 16 <= 7 && item.daDat === true) {
          return {
            ...item,
            dangChon: true,
            tenGhe:
              "G" +
              `0${+item.tenGhe % 16 === 0 ? 16 : +item.tenGhe % 16}`.slice(-2),
          };
        } else if (+item.stt / 16 <= 8 && item.daDat === false) {
          return {
            ...item,
            dangChon: false,
            tenGhe:
              "H" +
              `0${+item.tenGhe % 16 === 0 ? 16 : +item.tenGhe % 16}`.slice(-2),
          };
        } else if (+item.stt / 16 <= 8 && item.daDat === true) {
          return {
            ...item,
            dangChon: true,
            tenGhe:
              "H" +
              `0${+item.tenGhe % 16 === 0 ? 16 : +item.tenGhe % 16}`.slice(-2),
          };
        } else if (+item.stt / 16 <= 9 && item.daDat === false) {
          return {
            ...item,
            dangChon: false,
            tenGhe:
              "I" +
              `0${+item.tenGhe % 16 === 0 ? 16 : +item.tenGhe % 16}`.slice(-2),
          };
        } else if (+item.stt / 16 <= 9 && item.daDat === true) {
          return {
            ...item,
            dangChon: true,
            tenGhe:
              "I" +
              `0${+item.tenGhe % 16 === 0 ? 16 : +item.tenGhe % 16}`.slice(-2),
          };
        } else if (+item.stt / 16 <= 10 && item.daDat === false) {
          return {
            ...item,
            dangChon: false,
            tenGhe:
              "K" +
              `0${+item.tenGhe % 16 === 0 ? 16 : +item.tenGhe % 16}`.slice(-2),
          };
        } else if (+item.stt / 16 <= 10 && item.daDat === true) {
          return {
            ...item,
            dangChon: true,
            tenGhe:
              "K" +
              `0${+item.tenGhe % 16 === 0 ? 16 : +item.tenGhe % 16}`.slice(-2),
          };
        }
      });
      setstate(DSG);
    }
    // eslint-disable-next-line
  }, [dispatch, ticketRoom]);

  //check Ghế
  useEffect(() => {
    let isCheck = isValidCheckoutStep2();
    if (isCheck) {
      setWarning(true);
    } else {
      setWarning(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listGheDangChon]);

  const handleCountDown = (time) => {
    if (time < 0) return;
    let min = Math.floor(time / 60);
    let second = Math.floor(time % 60);
    min = `0${min}`.slice(-2);
    second = `0${second}`.slice(-2);
    settimeString(`${min}:${second}`);
  };

  const isValidCheckoutStep1 = (item) => {
    // return false -> cho phép đặt vé
    // check ghế trống đầu tiên của 2 dãy phụ
    if (
      +item.stt % 16 === 1 ||
      +item.stt % 16 === 4 ||
      +item.stt % 16 === 5 ||
      +item.stt % 16 === 12 ||
      +item.stt % 16 === 13 ||
      +item.stt % 16 === 0
    )
      return false;
    if (state[+item.stt].daDat === true || state[+item.stt - 2].daDat === true)
      return false;
    if (
      (item.stt % 16 === 2 || item.stt % 16 === 14) &&
      state[+item.stt - 2].dangChon === false
    ) {
      if (
        state[+item.stt].dangChon === true &&
        state[+item.stt + 1].dangChon === true
      )
        return false;
      else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Bạn không thể bỏ trống ghế đầu tiên!",
        });
        // setWarning(true);
        return true;
      }
    } else if (
      (item.stt % 16 === 3 || item.stt % 16 === 15) &&
      state[+item.stt].dangChon === false
    ) {
      if (
        state[+item.stt - 3].dangChon === true &&
        state[+item.stt - 2].dangChon === true
      )
        return false;
      else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Bạn không thể bỏ trống ghế đầu tiên!",
        });
        // setWarning(true);
        return true;
      }
    } else if (item.stt % 16 === 6 && state[+item.stt - 2].dangChon === false) {
      for (let i = +item.stt; i <= +item.stt + 5; i++) {
        if (state[i].daDat === true) return false;
        if (state[i].dangChon === false) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Bạn không thể bỏ trống ghế đầu tiên!",
          });
          return true;
        }
      }
      return false;
    } else if (item.stt % 16 === 11 && state[+item.stt].dangChon === false) {
      if (
        state[item.stt].dangChon === false &&
        state[item.stt - 2].dangChon === false
      ) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Bạn không thể bỏ trống ghế đầu tiên!",
        });
        return true;
      }
      for (let i = +item.stt - 2; i <= +item.stt - 7; i--) {
        if (state[i].daDat === true) return false;
        if (state[i].dangChon === false) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Bạn không thể bỏ trống ghế đầu tiên!",
          });
          return true;
        }
      }
      return false;
    } else if (
      item.stt % 16 >= 7 &&
      item.stt % 16 <= 10
      // state[+item.stt].dangChon === false
    ) {
      if (
        state[+item.stt - 2].dangChon === false &&
        state[+item.stt - 3].dangChon === true
      ) {
        // if(state[+item.stt].daDat === true) return false;
        for (
          let i = +item.stt - 1;
          i <= Math.floor(+item.stt / 16) * 16 + 11;
          i++
        ) {
          if (state[i].daDat === true) return false;
          if (state[i].dangChon === false) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Bạn không thể bỏ trống ghế đầu tiên!",
            });
            return true;
          }
        }
      }

      if (
        state[+item.stt].dangChon === false &&
        state[+item.stt + 1].dangChon === true
      ) {
        for (
          let i = Math.floor(+item.stt / 16) * 16 + 4;
          i <= +item.stt - 1;
          i++
        ) {
          if (state[i].daDat === true) return false;
          if (state[i].dangChon === false) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Bạn không thể bỏ trống ghế đầu tiên!",
            });
            return true;
          }
        }
      }
    }
  };
  const isValidCheckoutStep2 = () => {
    //check listGhe/ tìm ghế trống ở giữa
    if (listGheDangChon.length < 1) return true;
    if (listGheDangChon.length > 10) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Bạn không thể đặt trên 10 ghế cùng lúc!",
      });

      return true;
    }
    let isCheck = false;
    for (let i = 0; i < listGheDangChon.length; i++) {
      isCheck = isValidCheckoutStep1(listGheDangChon[i]);

      if (isCheck) return true;
    }

    if (listGheDangChon.length > 1) {
      for (let i = 0; i < listGheDangChon.length - 1; i++) {
        if (
          listGheDangChon[i].stt % 16 === 3 ||
          listGheDangChon[i].stt % 16 === 4 ||
          listGheDangChon[i].stt % 16 === 11 ||
          listGheDangChon[i].stt % 16 === 12
        ) {
          continue;
        }
        if (
          listGheDangChon[i].stt - listGheDangChon[i + 1].stt === -2 &&
          listGheDangChon[i].tenGhe.charAt(0) ===
            listGheDangChon[i + 1].tenGhe.charAt(0) &&
          state[+listGheDangChon[i].stt].dangChon === false
        ) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Bạn không thể để trống 1 ghế ở giữa!",
          });

          return true;
        }

        // if ở đây... thiếu 1 if....
      }
    }

    return false;
  };

  const handleAddorRemoveSeat = (item) => {
    if (item.dangChon) {
      let cloneListGhe = [...listGheDangChon];
      let index = cloneListGhe.findIndex((ghe) => ghe.maGhe === item.maGhe);
      cloneListGhe.splice(index, 1);
      cloneListGhe.sort((a, b) => a.stt - b.stt);
      setListGheDangChon(cloneListGhe);
    } else {
      let cloneListGhe = [...listGheDangChon];
      cloneListGhe.push(item);
      cloneListGhe.sort((a, b) => a.stt - b.stt);
      setListGheDangChon(cloneListGhe);
    }
  };

  const changeStatusOfSeatsList = (item) => {
    let cloneState = [...state];
    cloneState[+item.stt - 1].dangChon = !item.dangChon;
    setstate(cloneState);
  };

  const handleButtonChange = (item) => {
    handleAddorRemoveSeat(item);
    changeStatusOfSeatsList(item);
  };

  const renderSeats = () => {
    if (ticketRoom && ticketRoom.danhSachGhe) {
      return state.map((item) => {
        if (item.daDat === true) {
          return (
            <Button
              key={item.stt}
              disabled
              style={{ backgroundColor: "rgb(223 223 223 / 26%)" }}
            >
              X
            </Button>
          );
        } else if (item.loaiGhe === "Vip") {
          return (
            <Button
              onClick={() => {
                handleButtonChange(item);
              }}
              key={item.stt}
              style={{
                color: "#582819",
                backgroundColor:
                  item.dangChon === true ? "rgb(77 232 26)" : "orange",
              }}
            >
              {item.dangChon ? item.tenGhe.slice(-2) : ""}
              {/* <StopSharpIcon style={{ color: green[500] }} fontSize="large" /> */}
            </Button>
          );
        } else {
          return (
            <Button
              onClick={() => {
                handleButtonChange(item);
              }}
              key={item.stt}
              style={{
                color: "#582819",
                backgroundColor: item.dangChon
                  ? "rgb(77 232 26)"
                  : "rgb(73 104 124)",
              }}
            >
              {item.dangChon ? item.tenGhe.slice(-2) : ""}
            </Button>
          );
        }
      });
    }
  };

  const renderGiaVe = () => {
    if (listGheDangChon.length === 0) return 0;
    let tongGiaVe = 0;
    for (let i = 0; i < listGheDangChon.length; i++) {
      tongGiaVe += listGheDangChon[i].giaVe;
    }
    return tongGiaVe.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + "đ";
  };

  const renderDSGhe = () => {
    if (listGheDangChon.length > 0) {
      let count = listGheDangChon.length;
      return listGheDangChon.map((item, index) => {
        if (index === count - 1) {
          return (
            <span key={item.stt} className="ml-1" style={{ color: "#f79400" }}>
              {item.tenGhe}
            </span>
          );
        } else {
          return (
            <span key={item.stt} className="ml-1" style={{ color: "#f79400" }}>
              {item.tenGhe},
            </span>
          );
        }
      });
    }
  };

  const handleOnSubmit = (values) => {
    let isCheck = false;
    if (!radioButtonValue) {
      Swal.fire({
        icon: "info",
        title: "Bạn chưa chọn hình thức thanh toán",
      });
    } else isCheck = true;
    if (!isCheck) return;
    if (!values.soDt || !values.email) {
      Swal.fire({
        icon: "info",
        title: "Bạn vui lòng điền email và số điện thoại",
      });
    } else {
      let thongTinDatVe = { ...datVe };
      let ketQuaDatVe = {
        payment: radioButtonValue,
        thongTinPhim: ticketRoom.thongTinPhim,
        danhSachGhe: listGheDangChon,
      };
      let danhSachGheDat = [];
      for (let i = 0; i < listGheDangChon.length; i++) {
        let item = {
          maGhe: listGheDangChon[i].maGhe,
          giaVe: listGheDangChon[i].giaVe,
        };
        danhSachGheDat.push(item);
      }
      thongTinDatVe.danhSachVe = danhSachGheDat;
      // console.log(thongTinDatVe);
      dispatch(actBookingTickets(thongTinDatVe, ketQuaDatVe));
      setTimeout(() => {
        // window.open("/checkout/result");
        // history.replace("/");
        history.replace("/checkout/result");
      }, 500);
    }
  };

  const renderTypeOfMovie = (tenPhim) => {
    const firstChar = tenPhim.charCodeAt(0);
    if (firstChar <= 70) return <span className="c13">C13</span>;
    else return <span className="p">P</span>;
  };

  const renderCheckoutForm = () => {
    const user = JSON.parse(localStorage.getItem("userMember"));
    const regex = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
    let initialState = {
      email: user.email,
      soDt: user.soDT,
    };
    const validationSchema = Yup.object().shape({
      email: Yup.string()
        .required("Không được bỏ trống!")
        .email("Email không hợp lệ!"),
      soDt: Yup.string()
        .required("Không được bỏ trống!")
        .matches(regex, "Số điện thoại không đúng!"),
    });
    return (
      <>
        <Formik
          initialValues={initialState}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={(values, actions) => {
            //   setTimeout(() => {
            handleOnSubmit(values);
            //     actions.resetForm({
            //       email: "",
            //       soDt: "",
            //     });
            //     actions.setSubmitting(false);
            //   }, 1000);
          }}
        >
          {(formikProps) => {
            const { touched, errors } = formikProps;

            return (
              <Form className={classes.root}>
                <FormControl
                  fullWidth
                  margin="normal"
                  error={!!errors.email && touched.email}
                >
                  <InputLabel>Email</InputLabel>
                  <Field name="email">
                    {({ field }) => <Input fullWidth {...field} />}
                  </Field>
                  {touched.email && (
                    <FormHelperText>{errors.email}</FormHelperText>
                  )}
                </FormControl>

                <FormControl
                  fullWidth
                  margin="normal"
                  error={!!errors.soDt && touched.soDt}
                >
                  <InputLabel>Số Điện Thoại</InputLabel>
                  <Field name="soDt">
                    {({ field }) => <Input type="tel" fullWidth {...field} />}
                  </Field>
                  {touched.soDt && (
                    <FormHelperText>{errors.soDt}</FormHelperText>
                  )}
                </FormControl>
                <FormControl className="mt-3" component="fieldset">
                  <FormLabel component="legend">Hình thức thanh toán</FormLabel>
                  <RadioGroup
                    aria-label="payments"
                    name="radioButtonGroup"
                    value={radioButtonValue}
                    onChange={handleRadioButtonChange}
                  >
                    <FormControlLabel
                      value="ATM nội địa"
                      control={<Radio />}
                      label="ATM nội địa"
                    />
                    <FormControlLabel
                      value="Ví Momo"
                      control={<Radio />}
                      label="Ví Momo"
                    />
                    <FormControlLabel
                      value="ZaloPay"
                      control={<Radio />}
                      label="ZaloPay"
                    />
                  </RadioGroup>
                </FormControl>
                {/* </Paper> */}
                <div className="checkout__fixed">
                  <p className="note">
                    Note: Vé đã đặt không thể hoàn trả. Thông tin đặt vé sẽ được
                    gửi qua tin nhắn(Zalo) và email của bạn. Xin cám ơn!
                  </p>
                  <Button
                    // onClick={() => {
                    //   handleOnSubmit();
                    // }}
                    type="submit"
                    disabled={warning}
                    fullWidth
                    className="btnDatVe"
                  >
                    Đặt vé
                  </Button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </>
    );
  };

  const renderNgayChieu = (ngayChieu) => {
    const now = dayjs().format("DD/MM/YYYY");
    const tomorrow = dayjs().add(1, "day").format("DD/MM/YYYY");
    if (now === ngayChieu) return `Hôm nay ${ngayChieu}`;
    else if (tomorrow === ngayChieu) return `Ngày mai ${ngayChieu}`;
    else return ngayChieu;
  };

  const renderThongTinDatVe = () => {
    if (!ticketRoom || !ticketRoom.thongTinPhim) return;
    const {
      tenPhim,
      ngayChieu,
      gioChieu,
      tenRap,
      tenCumRap,
    } = ticketRoom.thongTinPhim;

    return (
      <>
        <div className="ticketRoom__info" style={{ padding: "0 15px" }}>
          <h1 className="text-center" style={{ color: "#f79400" }}>
            {renderGiaVe()}
          </h1>

          <h5 style={{ fontSize: 17 }}>
            {renderTypeOfMovie(tenPhim)}
            {tenPhim}
          </h5>
          <p style={{ fontSize: 15 }}>{tenCumRap}</p>
          <p style={{ fontSize: 15 }}>
            {renderNgayChieu(ngayChieu)} - {gioChieu} - {tenRap}
          </p>
          <hr />

          <div className="listGheDangChon__render" style={{ color: "#f79400" }}>
            Ghế: {renderDSGhe()}
            <hr />
          </div>
          {renderCheckoutForm()}
        </div>
      </>
    );
  };

  const renderThongTinRap = () => {
    if (ticketRoom && ticketRoom.thongTinPhim) {
      return (
        <div className="infor__left row">
          <img
            src={ticketRoom.thongTinPhim.hinhAnh}
            style={{ height: 80, marginRight: 15 }}
            alt="logo"
          />
          <div className="infor__theater">
            <h6>{ticketRoom.thongTinPhim.tenCumRap}</h6>
            <p>
              {ticketRoom.thongTinPhim.gioChieu}
              {" - "}
              {ticketRoom.thongTinPhim.tenRap}
            </p>
          </div>
        </div>
      );
    } else return null;
  };

  if (loading) return <LoadingComponent />;

  return (
    <div
      className="row"
      style={{
        // backgroundImage: "url('assets/img/background/carousel_1.jpg')",
        width: "100%",
        // height: "400px",
        margin: 0,
      }}
    >
      <div className="col-lg-9" style={{ padding: 0 }}>
        <Header step={1} />
        <div className="wapper">
          <div className="theater__infor" style={{ height: "90px" }}>
            {renderThongTinRap()}
            <div className="text-center">
              <small>Thời gian giữ ghế</small>
              <p style={{ fontSize: "30px", color: "#F79400" }}>{timeString}</p>
            </div>
          </div>
        </div>
        <div
          className="seats__booking"
          style={{ paddingBottom: 30 }} //, backgroundColor: "brown"
        >
          <img
            className="screen__img"
            style={{ width: "90%", height: 80, marginLeft: "5%" }}
            src="./../img/screen.png"
            alt=""
          />
          <div className="listOfSeat">
            {renderSeats()}
            <div className="row0">
              <span className="span__item">1</span>
              <span className="span__item">2</span>
              <span className="span__item">3</span>
              <span className="span__item">4</span>
              <span className="span__item"></span>
              <span className="span__item">5</span>
              <span className="span__item">6</span>
              <span className="span__item">7</span>
              <span className="span__item">8</span>
              <span className="span__item">9</span>
              <span className="span__item">10</span>
              <span className="span__item">11</span>
              <span className="span__item">12</span>
              <span className="span__item"></span>
              <span className="span__item">13</span>
              <span className="span__item">14</span>
              <span className="span__item">15</span>
              <span className="span__item">16</span>
            </div>
            <div className="column0">
              <span className="column__item"></span>
              <span className="column__item">A</span>
              <span className="column__item">B</span>
              <span className="column__item">C</span>
              <span className="column__item">D</span>
              <span className="column__item">E</span>
              <span className="column__item">F</span>
              <span className="column__item">G</span>
              <span className="column__item">H</span>
              <span className="column__item">I</span>
              <span className="column__item">K</span>
            </div>
            <div className="lane1"></div>
            <div className="lane2"></div>
          </div>
          <div className="expland__seats">
            <Button style={{ backgroundColor: "rgb(73 104 124)" }}>
              {/* <StopSharpIcon fontSize="large" /> */}
            </Button>
            <small>Ghế thường</small>
            <Button style={{ backgroundColor: "orange" }}>
              {/* <StopSharpIcon style={{ color: green[500] }} fontSize="large" /> */}
            </Button>
            <small>Ghế Vip</small>
            <Button style={{ backgroundColor: "rgb(77, 232, 26)" }}>
              {/* <StopSharpIcon fontSize="large" /> */}
            </Button>
            <small>Ghế đang chọn</small>
            <Button
              disabled
              style={{ backgroundColor: "rgb(223 223 223 / 26%)" }}
            >
              X
            </Button>
            <small>Ghế đã được đặt</small>
          </div>
        </div>
      </div>

      <div
        className="col-lg-3 checkout__right"
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          height: "100vh",
          // backgroundColor: "gray",
          padding: 0,
        }}
      >
        {renderThongTinDatVe()}
      </div>
    </div>
  );
}
