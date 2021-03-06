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
      heThongRap: Yup.string().required("K ???????c b??? tr???ng tr?????ng n??y!"),
      cumRap: Yup.string().required("K ???????c b??? tr???ng tr?????ng n??y!"),
      maRap: Yup.string().required("K ???????c b??? tr???ng tr?????ng n??y!"),
      ngayChieuGioChieu: Yup.string().required("K ???????c b??? tr???ng tr?????ng n??y!"),
      giaVe: Yup.number("gi?? v?? ph???i l?? s???")
        .positive("gi?? v?? ph???i l?? s??? d????ng")
        .integer("gi?? v?? ph???i l?? s??? nguy??n d????ng")
        .min(75000, "gi?? v?? ph???i t??? 75.000 -> 200.000")
        .max(200000, "gi?? v?? ph???i t??? 75.000 -> 200.000")
        .required("K ???????c b??? tr???ng tr?????ng n??y!"),
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
                <InputLabel>H??? Th???ng R???p</InputLabel>
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
                <InputLabel>C???m R???p</InputLabel>
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
                <InputLabel>R???p</InputLabel>
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
                <InputLabel>ng??y gi??? chi???u</InputLabel>
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
                <InputLabel>Gi?? V??</InputLabel>
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
                  Th??m L???ch Chi???u
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
              <h5 className="modal-title text-primary">Th??m L???ch Chi???u</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">??</span>
              </button>
            </div>
            <div className="modal-body">{renderBodyForm()}</div>
          </div>
        </div>
      </div>
    </>
  );
}
