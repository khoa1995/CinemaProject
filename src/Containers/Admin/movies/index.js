import { Button } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  actGetMovieWithPagination,
  actDeleteMovie,
  actSendMovieUpdating,
} from "./modules/actions";
import MovieItem from "./components/movieItem/movieItem";
import MovieModal from "./components/movieModal/MovieModal";
import ScheduleModal from "./components/scheduleModal/scheduleModal";
import "./index.scss";
import dayjs from 'dayjs';

function MovieManagement(props) {
  const responseData = useSelector(
    (state) => state.movieListWithPaginationReducer.movieList
  );
  const [page, setpage] = useState(1);
  const [updatingMovie, setUpdatingMovie] = useState(false);
  const movieNeedUpdate = useSelector(
    (state) => state.movieListWithPaginationReducer.movieNeedUpdate
  );
  const movie = {
    maPhim: 0,
    tenPhim: "",
    biDanh: "",
    trailer: "",
    hinhAnh: "",
    moTa: "",
    maNhom: "GP01",
    ngayKhoiChieu: "",
    danhGia: 0,
  };
  const [movieNeedAddSchedule, setMovieNeedAddSchedule] = useState({
    maPhim: 0,
    tenPhim: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(getMovies());
    dispatch(actGetMovieWithPagination(page));
  }, [dispatch, page]);

  function handleOnChangePage(e, value) {
    setpage(value);
  }

  function handleUpdate(item) {
    setUpdatingMovie(true);
    let cloneItem = {...item,ngayKhoiChieu:dayjs(item.ngayKhoiChieu).format("DD/MM/YYYY").toString() }
    
    // setMovie({
    //   ...movie,
    //   [name]: value,
    // });

    dispatch(actSendMovieUpdating(cloneItem));
  }

  function handleDelete(id) {
    dispatch(actDeleteMovie(id));
  }

  return (
    <>
      <h1 className="text-center text-success display-4">Movie Management</h1>
      <nav className="mb-4 d-flex justify-content-end">
        {/* <input type="search" /> */}
        <Button
          className="text-success border-success mr-4"
          variant="outlined"
          data-toggle="modal"
          data-target="#movieModal"
          style={{ outline: "none" }}
          onClick={() => {
            setUpdatingMovie(false);
            // dispatch(actSendMovieUpdating({}));
          }}
        >
          Thêm Phim Mới
        </Button>
      </nav>
      <table className="table">
        <thead>
          <tr>
            <th>Mã Phim</th>
            <th>Tên Phim</th>
            <th className="text-center">Đánh Giá</th>
            <th className="text-center">Ngày Khởi Chiếu</th>
            <th>Hình Ảnh</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          <MovieItem
            movieList={responseData.items ? responseData.items : []}
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
            handleSchedule={setMovieNeedAddSchedule}
          />
        </tbody>
      </table>
      <div id="paginationId">
        <Pagination
          count={responseData ? responseData.totalPages : 10}
          page={page}
          size="large"
          color="standard"
          onChange={handleOnChangePage}
        />
      </div>
      <MovieModal
        movie={updatingMovie ? movieNeedUpdate : movie}
        updatingMovie={updatingMovie}
      />
      <ScheduleModal movie={movieNeedAddSchedule} />
    </>
  );
}

export default MovieManagement;
