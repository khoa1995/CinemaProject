import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
  Modal,
  Paper,
  Select,
  Typography,
} from "@material-ui/core";
import { Field, Form, withFormik } from "formik";
import React, { Component } from "react";
import { connect } from "react-redux";
import * as Yup from "yup";
import { actAddNewUser } from "./../../modules/action";

class AddUserModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        taiKhoan: "",
        matKhau: "",
        email: "",
        soDt: "",
        maNhom: "GP01",
        maLoaiNguoiDung: "",
        hoTen: "",
      },
      modal: false,
    };
  }

  // handleOnChange = (e) => {
  //   let { name, value } = e.target;
  //   this.setState({
  //     [name]: value,
  //   });
  // };

  // handleSubmit = (e) => {
  //   e.preventDefault();
  //   // console.log(this.state)
  //   this.props.addNewUser(this.state);
  // };
  // handleOnClose = () => {
  //   this.props.handleClose();
  // };
  handleopen = () => {
    this.setState({
      modal: true,
    });
    // console.log(open);
  };
  handleclose = () => {
    this.setState({
      modal: false,
    });
    // console.log(open);
  };

  render() {
    return (
      <>
        <button
          type="button"
          onClick={() => {
            this.handleopen();
          }}
        >
          Thêm Tài Khoản
        </button>
        <Modal
          handleOpen={this.handleopen}
          handleClose={this.handleclose}
          open={this.state.modal}
          onClose={() => {
            this.handleclose();
          }}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <Form>
            <Grid container spacing={0} justify="center" alignContent="center">
              <Grid item xs={6} md={4}>
                <Paper
                  elevation={4}
                  style={{ padding: "20px 15px", marginTop: "30px" }}
                >
                  <Typography variant="h4" display-4="true" gutterBottom>
                    Signup
                  </Typography>
                  <FormControl
                    style={{ width: "48%", marginRight: "10px" }}
                    margin="normal"
                    error={!!this.props.errors.ho && this.props.touched.ho}
                  >
                    <InputLabel>Họ</InputLabel>
                    <Field name="ho">
                      {({ field }) => <Input fullWidth {...field} />}
                    </Field>
                    {this.props.touched.ho && (
                      <FormHelperText>{this.props.errors.ho}</FormHelperText>
                    )}
                  </FormControl>
                  <FormControl
                    style={{ width: "48%" }}
                    margin="normal"
                    error={!!this.props.errors.ten && this.props.touched.ten}
                  >
                    <InputLabel>Tên</InputLabel>
                    <Field name="ten">
                      {({ field }) => <Input fullWidth {...field} />}
                    </Field>
                    {this.props.touched.ten && (
                      <FormHelperText>{this.props.errors.ten}</FormHelperText>
                    )}
                  </FormControl>
                  <FormControl
                    fullWidth
                    margin="normal"
                    error={
                      !!this.props.errors.taiKhoan &&
                      this.props.touched.taiKhoan
                    }
                  >
                    <InputLabel>Tài Khoản</InputLabel>
                    <Field name="taiKhoan">
                      {({ field }) => <Input fullWidth {...field} />}
                    </Field>
                    {this.props.touched.taiKhoan && (
                      <FormHelperText>
                        {this.props.errors.taiKhoan}
                      </FormHelperText>
                    )}
                  </FormControl>
                  <FormControl
                    fullWidth
                    margin="normal"
                    error={
                      !!this.props.errors.matKhau && this.props.touched.matKhau
                    }
                  >
                    <InputLabel>Password</InputLabel>
                    <Field name="matKhau">
                      {({ field }) => <Input fullWidth {...field} />}
                    </Field>
                    {this.props.touched.matKhau && (
                      <FormHelperText>
                        {this.props.errors.matKhau}
                      </FormHelperText>
                    )}
                  </FormControl>
                  <FormControl
                    fullWidth
                    margin="normal"
                    error={
                      !!this.props.errors.email && this.props.touched.email
                    }
                  >
                    <InputLabel>Email</InputLabel>
                    <Field name="email">
                      {({ field }) => <Input fullWidth {...field} />}
                    </Field>
                    {this.props.touched.email && (
                      <FormHelperText>{this.props.errors.email}</FormHelperText>
                    )}
                  </FormControl>
                  <FormControl
                    fullWidth
                    margin="normal"
                    error={
                      !!this.props.errors.maLoaiNguoiDung &&
                      this.props.touched.maLoaiNguoiDung
                    }
                  >
                    <InputLabel>Loại tài khoản</InputLabel>
                    <Field name="maLoaiNguoiDung">
                      {({ field }) => <Input fullWidth {...field} />}
                    </Field>
                    {this.props.touched.maLoaiNguoiDung && (
                      <FormHelperText>
                        {this.props.errors.maLoaiNguoiDung}
                      </FormHelperText>
                    )}
                  </FormControl>

                  <FormControl
                    fullWidth
                    margin="normal"
                    error={!!this.props.errors.soDt && this.props.touched.soDt}
                  >
                    <InputLabel>Số Điện Thoại</InputLabel>
                    <Field name="soDt">
                      {({ field }) => <Input type="tel" fullWidth {...field} />}
                    </Field>
                    {this.props.touched.soDt && (
                      <FormHelperText>{this.props.errors.soDt}</FormHelperText>
                    )}
                  </FormControl>
                  <FormControl fullWidth margin="normal">
                    <Button variant="contained" color="primary" type="submit">
                      Signup
                    </Button>
                  </FormControl>
                </Paper>
              </Grid>
            </Grid>
          </Form>
        </Modal>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addNewUser: (user) => {
      dispatch(actAddNewUser(user));
    },
  };
};

const FormikForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues() {
    return {
      ho: "",
      ten: "",
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      maNhom: "GP01",
      maLoaiNguoiDung: "",
      hoTen: "",
    };
  },

  validationSchema: Yup.object().shape({
    taiKhoan: Yup.string()
      .required("K được bỏ trống trường này!")
      .min(5, "Tài khoản phải có 6 ký tự trở lên!"),
    matKhau: Yup.string().required("K được bỏ trống trường này!"),
    email: Yup.string()
      .required("K được bỏ trống trường này!")
      .email("Email không hợp lệ!"),
    ho: Yup.string().required("K được bỏ trống trường này!"),
    ten: Yup.string().required("K được bỏ trống trường này!"),
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    setTimeout(() => {
      // alert(JSON.stringify(values, null, 2));
      let user = {
        taiKhoan: values.taiKhoan,
        matKhau: values.matKhau,
        email: values.email,
        maNhom: values.maNhom,
        maLoaiNguoiDung: values.maLoaiNguoiDung,
        hoTen: values.ho + " " + values.ten,
        soDt: values.soDt,
      };
      console.log(user);
      props.addNewUser(user);
      setSubmitting(false);
    }, 1000);
  },

  displayName: "BasicForm",
})(AddUserModal);

export default connect(null, mapDispatchToProps)(FormikForm);
