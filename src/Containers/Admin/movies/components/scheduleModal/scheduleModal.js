import {
  FormControl,
  FormHelperText,
  Input,
  Button,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";

import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actGetHTR, actGetHTCR, actPostNewSchedule } from "./modules/actions";

export default function ScheduleModal(props) {
  const { movie } = props;
  const dispatch = useDispatch();
  const listHTR = useSelector((state) => state.scheduleMovieReducer.heThongRap);
  const listCumRap = useSelector(
    (state) => state.scheduleMovieReducer.heThongCumRap
  );
  let initialValues = {
    heThongRap: "",
    cumRap: "",
    maRap: "",
    ngayChieuGioChieu: "",
    giaVe: 0,
  };

  useEffect(() => {
    dispatch(actGetHTR());
  }, [dispatch]);

  const handleSelectHTROptions = () => {
    if (!listHTR) return;
    return listHTR.map((item, index) => {
      return (
        <MenuItem key={index} value={item.maHeThongRap}>
          {item.tenHeThongRap}
        </MenuItem>
      );
    });
  };

  const handleSelectCROptions = () => {
    if (!listCumRap) return;
    return listCumRap.map((item, index) => {
      return (
        <MenuItem key={index} value={item.maCumRap}>
          {item.tenCumRap}
        </MenuItem>
      );
    });
  };

  const handleSelectRapOptions = (value) => {
    if (!listCumRap) return;
    const listRap = listCumRap.filter((item) => item.maCumRap === value);
    if (listRap && listRap[0]) {
      return listRap[0].danhSachRap.map((item) => {
        return (
          <MenuItem key={item.maRap} value={item.maRap}>
            {item.tenRap}
          </MenuItem>
        );
      });
    }
  };

  const handleOnHTRSelected = (e, setFieldValue) => {
    const value = e.target.value;
    setFieldValue("heThongRap", value);
    dispatch(actGetHTCR(value));
  };

  const handleOnCRSelected = (e, setFieldValue) => {
    const value = e.target.value;
    setFieldValue("cumRap", value);
  };

  const handleOnRapSelected = (e, setFieldValue) => {
    const value = e.target.value;
    setFieldValue("maRap", value);
  };

  const handleSubmit = (values) => {
    const newSchedule = {
      maPhim: movie.maPhim,
      maRap: values.maRap,
      ngayChieuGioChieu: values.ngayChieuGioChieu,
      giaVe: values.giaVe,
    };
    dispatch(actPostNewSchedule(newSchedule));
  };

  const renderBodyForm = () => {
    const validationSchema = Yup.object().shape({
      heThongRap: Yup.string().required("K được bỏ trống trường này!"),
      cumRap: Yup.string().required("K được bỏ trống trường này!"),
      maRap: Yup.string().required("K được bỏ trống trường này!"),
      ngayChieuGioChieu: Yup.string().required("K được bỏ trống trường này!"),
      giaVe: Yup.number("giá vé phải là số")
        .positive("giá vé phải là số dương")
        .integer("giá vé phải là số nguyên dương")
        .min(75000, "giá vé phải từ 75.000 -> 200.000")
        .max(200000, "giá vé phải từ 75.000 -> 200.000")
        .required("K được bỏ trống trường này!"),
    });
    return (
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            handleSubmit(values);
            actions.setSubmitting(false);
          }, 500);
        }}
      >
        {(formikprops) => {
          const { values, errors, touched, setFieldValue } = formikprops;
          return (
            <Form>
              <Typography>{movie.tenPhim}</Typography>
              <FormControl
                style={{ width: "48%", marginRight: "2%" }}
                margin="normal"
                error={!!errors.heThongRap && touched.heThongRap}
              >
                <InputLabel>Hệ Thống Rạp</InputLabel>
                <Field name="heThongRap">
                  {({ field }) => (
                    <Select
                      fullWidth
                      {...field}
                      onChange={(e) => {
                        handleOnHTRSelected(e, setFieldValue);
                      }}
                    >
                      {handleSelectHTROptions()}
                    </Select>
                  )}
                </Field>
                {touched.heThongRap && (
                  <FormHelperText>{errors.heThongRap}</FormHelperText>
                )}
              </FormControl>
              <FormControl
                style={{ width: "48%", marginRight: "2%" }}
                margin="normal"
                disabled={listCumRap.length === 0 ? true : false}
                error={!!errors.cumRap && touched.cumRap}
              >
                <InputLabel>Cụm Rạp</InputLabel>
                <Field name="cumRap">
                  {({ field }) => (
                    <Select
                      fullWidth
                      {...field}
                      onChange={(e) => {
                        handleOnCRSelected(e, setFieldValue);
                      }}
                    >
                      {handleSelectCROptions()}
                    </Select>
                  )}
                </Field>
                {touched.cumRap && (
                  <FormHelperText>{errors.cumRap}</FormHelperText>
                )}
              </FormControl>
              <FormControl
                style={{ width: "48%", marginRight: "2%" }}
                margin="normal"
                disabled={!values.cumRap ? true : false}
                error={!!errors.maRap && touched.maRap}
              >
                <InputLabel>Rạp</InputLabel>
                <Field name="maRap">
                  {({ field }) => (
                    <Select
                      fullWidth
                      {...field}
                      onChange={(e) => {
                        handleOnRapSelected(e, setFieldValue);
                      }}
                    >
                      {handleSelectRapOptions(values.cumRap)}
                    </Select>
                  )}
                </Field>
                {touched.maRap && (
                  <FormHelperText>{errors.maRap}</FormHelperText>
                )}
              </FormControl>
              <FormControl
                style={{ width: "48%", marginRight: "2%" }}
                margin="normal"
                error={!!errors.ngayChieuGioChieu && touched.ngayChieuGioChieu}
              >
                <InputLabel>ngày giờ chiếu</InputLabel>
                <Field name="ngayChieuGioChieu">
                  {({ field }) => (
                    <Input
                      fullWidth
                      placeholder="dd/MM/yyyy hh:mm:ss"
                      {...field}
                    />
                  )}
                </Field>
                {touched.ngayChieuGioChieu && (
                  <FormHelperText>{errors.ngayChieuGioChieu}</FormHelperText>
                )}
              </FormControl>
              <FormControl
                style={{ width: "48%", marginRight: "2%" }}
                margin="normal"
                error={!!errors.giaVe && touched.giaVe}
              >
                <InputLabel>Giá Vé</InputLabel>
                <Field name="giaVe">
                  {({ field }) => <Input {...field} />}
                </Field>
                {touched.giaVe && (
                  <FormHelperText>{errors.giaVe}</FormHelperText>
                )}
              </FormControl>
              <FormControl className="mt-2" fullWidth margin="normal">
                <Button
                  className="text-primary"
                  variant="outlined"
                  type="submit"
                  style={{ outline: "none" }}
                >
                  Thêm Lịch Chiếu
                </Button>
              </FormControl>
            </Form>
          );
        }}
      </Formik>
    );
  };

  return (
    <>
      <div
        className="modal fade"
        id="scheduleModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="scheduleModalId"
        aria-hidden="true"
        data-focus="false"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-primary">Thêm Lịch Chiếu</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">{renderBodyForm()}</div>
          </div>
        </div>
      </div>
    </>
  );
}
