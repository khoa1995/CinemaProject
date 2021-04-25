import { Button, FormControl, FormHelperText, Input } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Field, Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { actUpdateInfor } from "./../modules/actions";
import "./component.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    "& label.Mui-focused": {
      color: "white",
    },
    "& label": {
      color: "white",
    },
    "& .MuiInput-underline:before": {
      borderBottomColor: "wheat",
    },
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      borderBottomColor: "gray",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "white",
    },
    "& .MuiInput-underline.Mui-error:after": {
      borderBottomColor: "#f44336",
    },
    "& .MuiInput-input": {
      color: "white",
    },
    "& .MuiInputBase-input:-webkit-autofill": {
      animation: "none",
    },
  },
}));

export default function UpdateInforComponent(props) {
  const { user } = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleOnSubmit = (values) => {
    let userClone = { ...user };
    userClone = {
      ...userClone,
      maLoaiNguoiDung: "KhachHang",
      hoTen: values.hoTen,
      email: values.email,
      soDt: values.soDt,
    };
    delete userClone.thongTinDatVe;
    delete userClone.loaiNguoiDung;
    delete userClone.soDT;
    delete userClone.undefined;
    console.log(userClone);
    dispatch(actUpdateInfor(userClone, false));
  }; //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoidGVzdGFjY291bnQxMjMxMiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IktoYWNoSGFuZyIsIm5iZiI6MTYwOTM0MzE5MCwiZXhwIjoxNjA5MzQ2NzkwfQ.FB3z-mkPI7jL-B8LQy6Qmk50Iwe8u-6a_hSYS9Uu4DI

  const updateInforForm = () => {
    const user = JSON.parse(localStorage.getItem("userMember"));
    const regex = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
    let initialState = {
      hoTen: user.hoTen,
      email: user.email,
      soDt: user.soDT,
    };
    const validationSchema = Yup.object().shape({
      hoTen: Yup.string().required("Không được bỏ trống!"),
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
            if (
              values.hoTen !== user.hoTen ||
              values.email !== user.email ||
              values.soDt !== user.soDT
            )
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
                <div className="form__row row">
                  <span>Họ tên</span>
                  <FormControl
                    className={classes.color}
                    style={{ width: "50%" }}
                    margin="normal"
                    error={!!errors.hoTen && touched.hoTen}
                  >
                    {/* <InputLabel>Họ tên</InputLabel> */}
                    <Field name="hoTen">
                      {({ field }) => <Input fullWidth {...field} />}
                    </Field>
                    {touched.hoTen && (
                      <FormHelperText>{errors.hoTen}</FormHelperText>
                    )}
                  </FormControl>
                </div>
                <div className="form__row row">
                  <span>Email</span>
                  <FormControl
                    style={{ width: "50%" }}
                    margin="normal"
                    error={!!errors.email && touched.email}
                  >
                    {/* <InputLabel>Email</InputLabel> */}
                    <Field name="email">
                      {({ field }) => <Input fullWidth {...field} />}
                    </Field>
                    {touched.email && (
                      <FormHelperText>{errors.email}</FormHelperText>
                    )}
                  </FormControl>
                </div>

                <div className="form__row row">
                  <span>Số điện thoại</span>
                  <FormControl
                    style={{ width: "50%" }}
                    margin="normal"
                    error={!!errors.soDt && touched.soDt}
                  >
                    {/* <InputLabel>Số Điện Thoại</InputLabel> */}
                    <Field name="soDt">
                      {({ field }) => <Input type="tel" fullWidth {...field} />}
                    </Field>
                    {touched.soDt && (
                      <FormHelperText>{errors.soDt}</FormHelperText>
                    )}
                  </FormControl>
                </div>
                <div className="btn__content mt-4">
                  <Button
                    type="submit"
                    className="btnCapNhat"
                    style={{ outline: "none", backgroundColor: "#fb4226" }}
                  >
                    Cập nhật
                  </Button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </>
    );
  };

  return (
    <div className="updateInfor__content col-sm-12">
      <h6 className="text-right col-sm-8 mb-3">Cập nhật thông tin</h6>

      {/* <div className="infor__item">
        <p className="title">Tài khoản</p>
        <p className="infor">{user.taiKhoan}</p>
      </div> */}
      {updateInforForm()}
      {/* <div className="infor__item">
          <p className="title">Họ tên</p>
          <p className="infor">
            <input
              type="text"
              defaultValue={user.hoTen}
              className="updateInfor__input"
            />
          </p>
        </div>
        <div className="infor__item">
          <p className="title">Email</p>
          <p className="infor">
            <input
              type="text"
              defaultValue={user.email}
              className="updateInfor__input"
            />
          </p>
        </div>
        <div className="infor__item">
          <p className="title">Số điện thoại</p>
          <p className="infor">
            <input
              type="text"
              defaultValue={user.soDT ? user.soDT : user.soDt}
              className="updateInfor__input"
            />
          </p>
        </div>
       */}
    </div>
  );
}
