import React, { Component } from "react";
import MovieItem from "./movieItem";
import { connect } from "react-redux";
import { getMovies } from "./modules/action";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.scss";
import LoadingComponent from "Containers/Home/Components/loading";
import Slider from "react-slick";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import ModalVideo from "react-modal-video";

class MovieList extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      videoId: "",
    };
    this.openModal = this.openModal.bind(this);
  }

  openModal() {
    this.setState({ isOpen: true });
  }

  onPlayTrailer = (url) => {
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

  componentDidMount() {
    this.props.getMovies();
  }

  renderMovieList = () => {
    let index = this.props.movieList.findIndex((x) => x.maPhim === 4665);
    return this.props.movieList
      .slice(index, index + 15)
      .reverse()
      .map((item, index) => {
        return (
          <MovieItem
            onPlayTrailer={this.onPlayTrailer}
            key={index}
            movie={item}
          />
        );
      });
  };

  render() {
    const { loading, err } = this.props;
    // console.log(movieList);
    if (err) {
      // TODO: <ErrorMessage />
      return <p>{err || "Something went wrong"}</p>;
    }

    if (loading) {
      // TODO: <Loading />
      return <LoadingComponent />;
    }
    var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesPerRow: 2,
      slidesToShow: 4,
      slidesToScroll: 4,
      arrows: true,
    };

    return (
      <div className="container py-5 movieList__main">
        {/* <div className="row">
          {movieList
            .slice()
            .reverse()
            .slice(0, 8)
            .map((item, index) => {
              return <MovieItem key={index} movie={item} />;
            })}
        </div> */}
        <Slider className="example1" {...settings}>
          {this.renderMovieList()}
        </Slider>
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
}

const mapStateToProps = (state) => {
  return {
    movieList: state.moviesReducer.movieList,
    loading: state.moviesReducer.loading,
    err: state.moviesReducer.err,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMovies: (data) => {
      dispatch(getMovies(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieList);
