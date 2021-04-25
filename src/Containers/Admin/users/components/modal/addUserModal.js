import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";

export default function AddUserModal(props) {
  const { initialState, updatingUser, handleSubmit, handleUpdate } = props;

  function renderModal() {
    const validationSchema = Yup.object().shape({
      taiKhoan: Yup.string().required("Không được bỏ trống trường này!"),
      matKhau: Yup.string().required("Không được bỏ trống trường này!"),
      email: Yup.string()
        .required("Không được bỏ trống trường này!")
        .email("Email không hợp lệ!"),
      hoTen: Yup.string().required("Không được bỏ trống trường này!"),
      soDt: Yup.number("chỉ được chứa ký tự số!")
        .required("Không được bỏ trống trường này!")
        .positive("chỉ được chứa ký tự số!"),
      maLoaiNguoiDung: Yup.string().required("Mời chọn loại tài khoản!"),
    });
    return (
      <>
        <div className="modal-body">
          <Formik
            initialValues={initialState}
            validationSchema={validationSchema}
            enableReinitialize
            // onSubmit={(values) => console.log(values)}
            onSubmit={(values, actions) => {
              setTimeout(() => {
                if (!updatingUser) {
                  handleSubmit(values);
                } else {
                  handleUpdate(values);
                }

                actions.resetForm({
                  taiKhoan: "",
                  matKhau: "",
                  email: "",
                  soDt: "",
                  maNhom: "GP01",
                  maLoaiNguoiDung: "",
                  hoTen: "",
                });
                actions.setSubmitting(false);
              }, 1000);
            }}
          >
            {(formikProps) => {
              const { touched, errors } = formikProps;
              // console.log({ values, touched, errors });
              return (
                <Form autoComplete="off">
                  {/* <Paper
                        elevation={4}
                        style={{ padding: "20px 15px", marginTop: "30px" }}
                      > */}
                  {/* <Typography variant="h4" display-4="true" gutterBottom>
                    Signup
                  </Typography> */}
                  <FormControl
                    style={{ width: "48%", marginRight: "2%" }}
                    margin="normal"
                    error={!!errors.hoTen && touched.hoTen}
                  >
                    <InputLabel>Họ Tên</InputLabel>
                    <Field name="hoTen">
                      {({ field }) => <Input fullWidth {...field} />}
                    </Field>
                    {touched.hoTen && (
                      <FormHelperText>{errors.hoTen}</FormHelperText>
                    )}
                  </FormControl>

                  <FormControl
                    style={{ width: "48%", marginRight: "2%" }}
                    margin="normal"
                    error={!!errors.maLoaiNguoiDung && touched.maLoaiNguoiDung}
                  >
                    <InputLabel>Loại tài khoản</InputLabel>
                    <Field name="maLoaiNguoiDung">
                      {({ field }) => (
                        <Select fullWidth {...field}>
                          <MenuItem value={"KhachHang"}>Khách Hàng</MenuItem>
                          <MenuItem value={"QuanTri"}>Quản Trị</MenuItem>
                        </Select>
                      )}
                    </Field>
                    {touched.maLoaiNguoiDung && (
                      <FormHelperText>{errors.maLoaiNguoiDung}</FormHelperText>
                    )}
                  </FormControl>

                  <FormControl
                    style={{ width: "48%", marginRight: "2%" }}
                    margin="normal"
                    error={!!errors.taiKhoan && touched.taiKhoan}
                  >
                    <InputLabel>Tài Khoản</InputLabel>
                    <Field name="taiKhoan">
                      {({ field }) => <Input fullWidth {...field} />}
                    </Field>
                    {touched.taiKhoan && (
                      <FormHelperText>{errors.taiKhoan}</FormHelperText>
                    )}
                  </FormControl>
                  <FormControl
                    style={{ width: "48%", marginRight: "2%" }}
                    margin="normal"
                    error={!!errors.matKhau && touched.matKhau}
                    autoComplete="new-password"
                  >
                    <InputLabel>Mật khẩu</InputLabel>
                    <Field name="matKhau">
                      {({ field }) => (
                        <Input
                          autoComplete="new-password"
                          type="password"
                          fullWidth
                          {...field}
                        />
                      )}
                    </Field>
                    {touched.matKhau && (
                      <FormHelperText>{errors.matKhau}</FormHelperText>
                    )}
                  </FormControl>
                  <FormControl
                    style={{ width: "48%", marginRight: "2%" }}
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
                    style={{ width: "48%", marginRight: "2%" }}
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
                  <FormControl fullWidth margin="normal">
                    <Button
                      className={
                        !updatingUser
                          ? "mt-4 text-success"
                          : "mt-4 text-primary"
                      }
                      variant="outlined"
                      type="submit"
                      style={{ outline: "none" }}
                    >
                      {!updatingUser ? "Thêm Mới" : "Cập Nhật"}
                    </Button>
                  </FormControl>
                  {/* </Paper> */}
                </Form>
              );
            }}
          </Formik>
        </div>
      </>
    );
  }

  return (
    <>
      <div
        className="modal fade"
        id="userModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="userModalLabel"
        aria-hidden="true"
        data-focus="false"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className={
                  updatingUser
                    ? "modal-title text-primary"
                    : "modal-title text-success"
                }
                id="userModalLabel"
              >
                {updatingUser ? "Cập nhật Người Dùng" : "Thêm Người Dùng"}
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            {renderModal()}
          </div>
        </div>
      </div>
    </>
  );
}
