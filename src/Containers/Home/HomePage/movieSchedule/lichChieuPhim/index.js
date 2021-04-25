import dayjs from "dayjs";
import React, { Component } from "react";
import { connect } from "react-redux";
import { actGetScheduleMovie } from "./modules/actions";
import MovieItem from "./movieItem";

class LichChieuPhimComponent extends Component {
  componentDidMount = () => {
    // console.log(this.props.maHTR);
    this.props.actGetScheduleMovie(this.props.maHTR, "GP01");
  };

  componentDidUpdate(prevProps) {
    if (this.props.maHTR !== prevProps.maHTR) {
      this.props.actGetScheduleMovie(this.props.maHTR, "GP01");
    }
  }
  // ham render ra danhSachPhim (lichChieuTheoHTR[0].lstCumRap.maCumRap = props)
  getMovieList = () => {
    let movieList = [];

    let { lichChieuTheoHTR, maCumRap } = this.props;

    if (lichChieuTheoHTR && lichChieuTheoHTR !== null && maCumRap !== null) {
      movieList = lichChieuTheoHTR[0].lstCumRap;
      return movieList.map((item) => {
        return item.maCumRap === maCumRap ? item.danhSachPhim : null;
      });
    }
  };
  renderMovies = () => {
    const movieList = this.getMovieList();

    if (movieList && movieList.length > 0) {
      let lastMovieList = movieList.filter((item) => {
        return item !== null;
      });

      // dayjs(item.ngayChieuGioChieu).format("DD/MM/YYYY") === now

      if (lastMovieList[0] && lastMovieList[0] !== null) {
        let now = dayjs().format();
        let count = 0;

        const listMovieItem = lastMovieList[0].map((movie) => {
          let isCheck = false;

          for (let i = 0; i < movie.lstLichChieuTheoPhim.length; i++) {
            if (
              dayjs(movie.lstLichChieuTheoPhim[i].ngayChieuGioChieu).format(
                "DD/MM/YYYY"
              ) === dayjs(now).format("DD/MM/YYYY") &&
              dayjs(movie.lstLichChieuTheoPhim[i].ngayChieuGioChieu).format() >
                dayjs(now).format()
            ) {
              isCheck = true;
              count++;
            }
          }

          if (isCheck) {
            return <MovieItem key={movie.maPhim} movie={movie} />;
          } else return null;
        });
        if (count === 0)
          return (
            <p className="text-center mt-2">Rạp không có suất chiếu nào!</p>
          );
        else return listMovieItem;
      }
    }
  };
  render() {
    return <>{this.renderMovies()}</>;
  }
}

const mapStateToProps = (state) => {
  return {
    lichChieuTheoHTR: state.lichChieuPhimReducer.lichChieuTheoHTR,
    maHTR: state.hTCRReducer.maHTR,
    maCumRap: state.lichChieuPhimReducer.maCumRap,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actGetScheduleMovie: (maHTR, maNhom) => {
      dispatch(actGetScheduleMovie(maHTR, maNhom));
    },
    actGetMaCumRap: (data) =>
      dispatch({ type: "GET_MA_CUM_RAP", payload: data }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LichChieuPhimComponent);
