import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
} from "@material-ui/core";
import dayjs from "dayjs";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { actPostNewMovie, actUpdateMovie } from "./../../modules/actions";
import "./MovieModal.scss";

function MovieModal(props) {
  const { updatingMovie, movie } = props;
  const [previewImage, setpreviewImage] = useState("");
  const dispatch = useDispatch();
  const movieNeedUpdate = useSelector(
    (state) => state.movieListWithPaginationReducer.movieNeedUpdate
  );
  const [picture, setpicture] = useState(null);

  // useEffect(() => {
  //   if (movieNeedUpdate.hinhAnh) {
  //     let headers = new Headers();

  //     headers.append("Content-Type", "application/json");
  //     headers.append("Accept", "application/json");
  //     headers.append(
  //       "Authorization",
  //       "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiaXByb2tmYzU2MSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlF1YW5UcmkiLCJuYmYiOjE2MDgwMzUyNjgsImV4cCI6MTYwODAzODg2OH0.B2NGBu8nDcVU6FjQ5GtN72FzurcBd9Wk2_RgJKYHvog"
  //     );
  //     headers.append("Origin", "http://localhost:3000");
  //     fetch(movieNeedUpdate.hinhAnh, {
  //       // mode: "no-cors",
  //       mode: "cors",
  //       credentials: "include",

  //       method: "GET",
  //       headers: headers,

  //       // "Content-Type": "image/jpeg",
  //       // "Access-Control-Allow-Origin": "*",
  //       // "Access-Control-Allow-Credentials": "true",
  //       // headers: {
  //       //   Authorization:
  //       //     "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiaXByb2tmYzU2MSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlF1YW5UcmkiLCJuYmYiOjE2MDgwMzUyNjgsImV4cCI6MTYwODAzODg2OH0.B2NGBu8nDcVU6FjQ5GtN72FzurcBd9Wk2_RgJKYHvog",
  //       // },
  //     })
  //       .then((res) => res.blob())
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //     // .then((blob) => {
  //     //   console.log(blob);
  //     //   const file = new File([blob], "hinh-anh.jpg", { type: "image/jpg" });
  //     //   console.log(file, file.name);
  //     //   setpicture(file);
  //     // }).catch((err)=>{console.log(err);});
  //   }

  //   return () => {};
  // }, [movieNeedUpdate]);

  function handleImageChange(e, setFieldValue) {
    if (!e.target.files[0]) return;
    setpicture(e.target.files[0]);
    setFieldValue("hinhAnh", e.target.files[0].name, false);

    getBase64(e.target.files[0]);
  }

  //tenPhim,moTa,trailer,hinhAnh,ngayKhoiChieu|maPhim,danhGia,maNhom,biDanh
  function createNewMovie(values) {
    var frm = new FormData();
    frm.append("hinhAnh", picture, picture.name);
    frm.append("tenPhim", values.tenPhim);
    frm.append("moTa", values.moTa);
    frm.append("maNhom", "GP01");
    frm.append("trailer", values.trailer);
    frm.append("ngayKhoiChieu", values.ngayKhoiChieu);
    dispatch(actPostNewMovie(frm));
  }
  function updateMovie(values) {
    var frm = new FormData();
    values.ngayKhoiChieu = dayjs(values.ngayKhoiChieu).format("DD/MM/YYYY");
    frm.append("hinhAnh", picture, picture.name);
    frm.append("tenPhim", values.tenPhim);
    frm.append("maNhom", "GP01");
    frm.append("trailer", values.trailer);
    frm.append("ngayKhoiChieu", values.ngayKhoiChieu);
    frm.append("biDanh", values.biDanh);
    frm.append("maPhim", values.maPhim);
    frm.append("danhGia", values.danhGia);
    frm.append("moTa", values.moTa);

    dispatch(actUpdateMovie(frm));
  }
  function getBase64(file) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (e) => {
      setpreviewImage(e.target.result);
    };
  }

  function renderBody() {
    const validationSchema = Yup.object().shape({
      tenPhim: Yup.string()
        .required("K được bỏ trống trường này!")
        .min(3, "Tên phim phải có 3 ký tự trở lên!"),
      moTa: Yup.string().required("K được bỏ trống trường này!"),
      ngayKhoiChieu: Yup.string().required("K được bỏ trống trường này!"),
      trailer: Yup.string().required("K được bỏ trống trường này!"),
      hinhAnh: Yup.string().required("K được bỏ trống trường này!"),
    });
    //dayjs(this.form.value.ngayKhoiChieu).format('DD/MM/YYYY')
    return (
      <Formik
        initialValues={updatingMovie ? movieNeedUpdate : movie}
        validationSchema={validationSchema}
        enableReinitialize
        // onSubmit={(values) => console.log(values)}
        onSubmit={(values, actions) => {
          if (!updatingMovie) {
            createNewMovie(values);
          } else {
            updateMovie(values);
          }

          setTimeout(() => {
            actions.resetForm({
              tenPhim: "",
              trailer: "",
              hinhAnh: "",
              moTa: "",
              maNhom: "GP01",
              ngayKhoiChieu: "",
            });
            actions.setSubmitting(false);
          }, 1000);
        }}
      >
        {(formikProps) => {
          const { values, touched, errors, setFieldValue } = formikProps;

          // console.log({ values, touched, errors });
          // values = movieNeedUpdate ? movieNeedUpdate : "";
          return (
            <Form>
              <FormControl
                fullWidth
                margin="normal"
                error={!!errors.tenPhim && touched.tenPhim}
              >
                <InputLabel>Tên Phim</InputLabel>
                <Field name="tenPhim">
                  {({ field }) => <Input fullWidth {...field} />}
                </Field>
                {touched.tenPhim && (
                  <FormHelperText>{errors.tenPhim}</FormHelperText>
                )}
              </FormControl>
              <FormControl
                fullWidth
                margin="normal"
                error={!!errors.moTa && touched.moTa}
              >
                <InputLabel>Mô tả</InputLabel>
                <Field name="moTa">
                  {({ field }) => <Input fullWidth {...field} />}
                </Field>
                {touched.moTa && <FormHelperText>{errors.moTa}</FormHelperText>}
              </FormControl>
              <FormControl
                style={{ width: "70%", marginRight: "10px" }}
                margin="normal"
                error={!!errors.ngayKhoiChieu && touched.ngayKhoiChieu}
              >
                <InputLabel>ngày khởi chiếu</InputLabel>
                <Field name="ngayKhoiChieu">
                  {({ field }) => (
                    <Input fullWidth placeholder="dd/MM/yyyy" {...field} />
                  )}
                </Field>
                {touched.ngayKhoiChieu && (
                  <FormHelperText>{errors.ngayKhoiChieu}</FormHelperText>
                )}
              </FormControl>

              <FormControl
                fullWidth
                margin="normal"
                error={!!errors.trailer && touched.trailer}
              >
                <InputLabel>trailer</InputLabel>
                <Field name="trailer">
                  {({ field }) => <Input fullWidth {...field} />}
                </Field>
                {touched.trailer && (
                  <FormHelperText>{errors.trailer}</FormHelperText>
                )}
              </FormControl>
              <small className="d-block">Hình ảnh</small>
              <Input
                style={{ width: "48%" }}
                name="hinhAnh"
                // accept="image/*"
                type="file"
                onChange={(e) => {
                  handleImageChange(e, setFieldValue);
                }}
              />

              <br />
              {touched.hinhAnh && (
                <small className="text-danger">{errors.hinhAnh}</small>
              )}
              <br />
              <div className="d-flex mt-2">
                {updatingMovie && !previewImage && (
                  <img
                    src={values.hinhAnh}
                    alt="hinhAnh"
                    style={{
                      width: "40%",
                      marginRight: "25px",
                    }}
                  />
                )}
                {previewImage && (
                  <img
                    src={previewImage}
                    alt="previewImage"
                    style={{ width: "40%", marginRight: "25px" }}
                  />
                )}

                {values.trailer && (
                  <iframe
                    title="trailer"
                    width="40%"
                    height="155"
                    // src="https://www.youtube.com/embed/HZ7PAyCDwEg"
                    src={values.trailer}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                )}
              </div>

              <hr />
              <Button
                className="text-success"
                type="submit"
                variant="outlined"
                style={{ outline: "none" }}
                // color={updatingMovie ? "" : "primary"}
              >
                {updatingMovie ? "Cập nhật" : "Thêm Phim"}
              </Button>
            </Form>
          );
        }}
      </Formik>
    );
  }

  return (
    <>
      <div
        className="modal fade"
        id="movieModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className={"modal-title text-success"} id="exampleModalLabel">
                {updatingMovie ? "Cập nhật phim" : "Thêm Phim Mới"}
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
            <div className="modal-body">{renderBody()}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MovieModal;
