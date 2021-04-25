import {
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  makeStyles,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { actUpdateInfor } from "./../modules/actions";

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
    "& .MuiSvgIcon-root": {
      color: "wheat",
    },
  },
}));

export default function ChangePasswordComponent(props) {
  const { user } = props;
  const [showPassword, setshowPassword] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleClickShowPassword = () => {
    setshowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (values) => {
    if (values.matKhauHienTai !== user.matKhau) {
      Swal.fire({
        icon: "error",
        title: "Mật khẩu hiện tại không đúng!",
      });
    } else {
      let userClone = { ...user };
      userClone = {
        ...userClone,
        maLoaiNguoiDung: "KhachHang",
        matKhau: values.matKhauMoi,
        soDt: user.soDT,
      };
      delete userClone.thongTinDatVe;
      delete userClone.loaiNguoiDung;
      delete userClone.soDT;
      dispatch(actUpdateInfor(userClone, true));
    }
  };

  const changePasswordForm = () => {
    let initialState = {
      matKhauHienTai: "",
      matKhauMoi: "",
      matKhauConfirm: "",
    };
    const validationSchema = Yup.object().shape({
      matKhauHienTai: Yup.string().required("Không được bỏ trống!"),
      matKhauMoi: Yup.string().required("Không được bỏ trống!"),
      matKhauConfirm: Yup.string()
        .required("Không được bỏ trống!")
        .oneOf(
          [Yup.ref("matKhauMoi"), null],
          "Mật khẩu xác nhận không trùng khớp!"
        ),
    });
    return (
      <>
        <Formik
          initialValues={initialState}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={(values) => {
            handleSubmit(values);
          }}
        >
          {(formikProps) => {
            const { touched, errors } = formikProps;
            // console.log({ values, touched, errors });
            return (
              <Form className={classes.root}>
                <div className="form__row row">
                  <span>Mật khẩu hiện tại</span>
                  <FormControl
                    style={{ width: "50%" }}
                    margin="normal"
                    error={!!errors.matKhauHienTai && touched.matKhauHienTai}
                    autoComplete="new-password"
                  >
                    <Field name="matKhauHienTai">
                      {({ field }) => (
                        <Input
                          autoComplete="new-password"
                          type={showPassword ? "text" : "password"}
                          fullWidth
                          {...field}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                              >
                                {showPassword ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                      )}
                    </Field>
                    {touched.matKhauHienTai && (
                      <FormHelperText>{errors.matKhauHienTai}</FormHelperText>
                    )}
                  </FormControl>
                </div>

                <div className="form__row row">
                  <span>Mật khẩu mới</span>
                  <FormControl
                    style={{ width: "50%" }}
                    margin="normal"
                    error={!!errors.matKhauMoi && touched.matKhauMoi}
                    autoComplete="new-password"
                  >
                    <Field name="matKhauMoi">
                      {({ field }) => (
                        <Input
                          autoComplete="new-password"
                          type={showPassword ? "text" : "password"}
                          fullWidth
                          {...field}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                              >
                                {showPassword ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                      )}
                    </Field>
                    {touched.matKhauMoi && (
                      <FormHelperText>{errors.matKhauMoi}</FormHelperText>
                    )}
                  </FormControl>
                </div>
                <div className="form__row row">
                  <span>Xác nhận mật khẩu</span>
                  <FormControl
                    style={{ width: "50%" }}
                    margin="normal"
                    error={!!errors.matKhauConfirm && touched.matKhauConfirm}
                    autoComplete="new-password"
                  >
                    <Field name="matKhauConfirm">
                      {({ field }) => (
                        <Input
                          autoComplete="new-password"
                          type={showPassword ? "text" : "password"}
                          fullWidth
                          {...field}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                              >
                                {showPassword ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                      )}
                    </Field>
                    {touched.matKhauConfirm && (
                      <FormHelperText>{errors.matKhauConfirm}</FormHelperText>
                    )}
                  </FormControl>
                </div>
                <div className="btn__content mt-4">
                  <Button
                    type="submit"
                    className="btnCapNhat"
                    style={{
                      outline: "none",
                      color: "white",
                      backgroundColor: "#fb4226",
                    }}
                  >
                    Xác nhận
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
    <div className="changePassword__content col-sm-12">
      <h6 className="text-right col-sm-8 mb-3">Thay đổi mật khẩu</h6>
      {changePasswordForm()}
    </div>
  );
}
