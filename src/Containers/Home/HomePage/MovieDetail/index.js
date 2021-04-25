import React, { Component } from "react";
import ModalVideo from "react-modal-video";
import { connect } from "react-redux";
import { actGetMovieDetail } from "./modules/action";
import LoadingComponent from "../../Components/loading";
import HeaderComponent from "../../Components/header/header";
import NewsComponent from "../news";
import FooterComponent from "Containers/Home/Components/footer";
import "./index.scss";
import dayjs from "dayjs";
import CircularDeterminate from "./circle-component";
import ShowingComponent from "./showing-component";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

class MovieDetailComponent extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      videoId: "",
      showing: "lichChieu",
    };
    this.openModal = this.openModal.bind(this);
  }
  handlePlayTrailer = (url) => {
    // eslint-disable-next-line
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[7].length === 11) {
      var videoId = match[7];
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Phim này hiện chưa có trailer...",
      });
      return;
    }
    this.setState({ videoId: videoId, isOpen: true });
  };
  openModal() {
    this.setState({ isOpen: true });
  }
  componentDidMount() {
    this.props.actGetMovieDetail(this.props.match.params.id);
  }

  //hàm ramdom từ 1-10 => dùng để random số người đánh giá
  randomNumber() {
    return Math.round(Math.random() * (10 - 1) + 1);
  }

  //hàm render Star theo điểm vote
  renderStarReview() {
    let { movieDetail } = this.props;
    let amountStar = movieDetail.danhGia;
    let arr = [];
    if (amountStar && amountStar === 1) {
      return <img src="/img/star1.2.png" alt="" />;
    }
    if (amountStar && amountStar % 2 === 0 && amountStar > 0) {
      let a = amountStar / 2;
      for (let i = 0; i < a; i++) {
        arr.push(<img key={i} src="/img/star1.png" alt="" />);
      }
      return arr;
    }
    if (amountStar && amountStar % 2 !== 0 && amountStar > 0) {
      var a = amountStar / 2 - 0.5;
      for (let i = 0; i < a; i++) {
        arr.push(<img key={i} src="/img/star1.png" alt="" />);
      }
      arr.push(<img key={6} src="/img/star1.2.png" alt="" />);
      return arr;
    }
    return <span>Chưa có đánh giá</span>;
  }
  renderMovieDetail = () => {
    let { movieDetail } = this.props;
    if (movieDetail && movieDetail !== null) {
      return (
        <div className="movie__detail">
          <div
            className="movie__background"
            style={{
              backgroundImage: `url(${movieDetail.hinhAnh})`,
            }}
          ></div>
          <div className="movie__backgroundPlus"></div>
          <div className="row movie__content mainMaxWidth2">
            {" "}
            <div className="col-sm-3 col-xs-4 filmPoster">
              <img
                className="img-fluid imgPoster"
                src={movieDetail.hinhAnh}
                alt=""
              />
              <button
                className="play__trailer"
                onClick={() => {
                  this.handlePlayTrailer(movieDetail.trailer);
                }}
              >
                <img src="/img/icon-play-video.png" alt="player__trailer" />
              </button>
            </div>
            <div className="col-sm-6">
              <div>
                <span className="showtimeMovie">
                  {dayjs(`${movieDetail.ngayKhoiChieu}`).format("DD.MM.YYYY")}
                </span>
              </div>
              <div className="mb-4">
                <span className="nameMovie">{movieDetail.tenPhim}</span>
                <div className="">
                  <span className="">120 phút - 0 IMDb - 2D/Digital</span>
                </div>
              </div>

              <a
                className="btnMovieDetail"
                href="#showing__main"
                to="/"
                onClick={() => {
                  this.props.actFetchShowing();
                }}
              >
                Mua vé
              </a>
            </div>
            <div className="col-sm-2 reviewScore">
              <CircularDeterminate movie={this.props.movieDetail} />
              <div className="starReview">{this.renderStarReview()}</div>
              <div className="numberReview">
                {this.randomNumber()} người đánh giá
              </div>
            </div>
          </div>
          <div className="contentMain">
            <ShowingComponent movieDetail={movieDetail} />
          </div>
          <ModalVideo
            youtube={{
              autoplay: "true",
            }}
            channel="youtube"
            isOpen={this.state.isOpen}
            videoId={this.state.videoId}
            onClose={() => this.setState({ isOpen: false })}
          />
        </div>
      );
    }
  };
  render() {
    let { loading, err } = this.props;
    if (loading) {
      return (
        <>
          <HeaderComponent />
          <LoadingComponent />
        </>
      );
    }
    if (err) {
      return <h5>Something was wrong</h5>;
    }
    return (
      <>
        <HeaderComponent />
        <div className="movieDetail__wrapper">
          <>{this.renderMovieDetail()}</>
        </div>
        <NewsComponent />
        <FooterComponent />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    movieDetail: state.movieDetailReducer.movieDetail,
    loading: state.movieDetailReducer.loading,
    err: state.movieDetailReducer.err,
    showing: state.movieDetailReducer.showing,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actGetMovieDetail: (id) => {
      dispatch(actGetMovieDetail(id));
    },
    actFetchShowing: () =>
      dispatch({ type: "UPDATE_SHOWING", payload: "lichChieu" }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieDetailComponent);
