import React, { Component } from "react";
// import Swiper core and required components
import SwiperCore, {
  A11y,
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
} from "swiper";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";

import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/swiper.scss";
import "./index.scss";
import "react-modal-video/scss/modal-video.scss";
import ModalVideo from "react-modal-video";
import SelectMovie from "../selectMovie";
import { withRouter } from "react-router-dom";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);

class CarouselComponent extends Component {
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

  handlePlayTrailer = (value) => {
    this.setState({ isOpen: true, videoId: value });
    // this.props.actGetMovieTrailerSource(e.target.title);
  };

  handlePushToMovieDetail = (e, movieId) => {
    if (e.target.className === "swiper-slide") {
      this.props.history.push(`/movie/${movieId}`);
    }
  };

  render() {
    return (
      <div className="carouselMain" id="carouselId">
        <Swiper
          className="carouselMovie"
          spaceBetween={30}
          slidesPerView={1}
          navigation
          allowTouchMove={false}
          autoplay={{ delay: 15000 }}
          loop
        >
          <SwiperSlide>
            <div
              onClick={(e) => {
                this.handlePushToMovieDetail(e, 5031);
              }}
              className="swiper-slide"
              style={{ backgroundImage: "url(./img/carousel_4.jpg)" }}
            >
              <button
                className="play__trailer"
                onClick={() => {
                  this.handlePlayTrailer("0qaStyeKpLo");
                }}
              >
                <i className="material-icons__play material-icons">
                  play_arrow
                </i>
              </button>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              onClick={(e) => {
                this.handlePushToMovieDetail(e, 5029);
              }}
              className="swiper-slide"
              style={{ backgroundImage: "url(./img/carousel_5.jpg)" }}
            >
              <button
                className="play__trailer"
                onClick={() => {
                  this.handlePlayTrailer("Vk-gqL3c5qU");
                }}
              >
                <i className="material-icons__play material-icons">
                  play_arrow
                </i>
              </button>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div
              onClick={(e) => {
                this.handlePushToMovieDetail(e, 4987);
              }}
              className="swiper-slide"
              style={{ backgroundImage: "url(./img/carousel_1.jpg)" }}
            >
              <button
                className="play__trailer"
                onClick={() => {
                  this.handlePlayTrailer("9SA7FaKxZVI");
                }}
              >
                <i
                  className="material-icons__play material-icons"
                  title="trailer"
                >
                  play_arrow
                </i>
              </button>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              onClick={(e) => {
                this.handlePushToMovieDetail(e, 4893);
              }}
              className="swiper-slide"
              style={{ backgroundImage: "url(./img/carousel_2.jpg)" }}
            >
              <button
                className="play__trailer"
                onClick={() => {
                  this.handlePlayTrailer("L3pk_TBkihU");
                }}
              >
                <i className="material-icons__play material-icons">
                  play_arrow
                </i>
              </button>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              onClick={(e) => {
                this.handlePushToMovieDetail(e, 4668);
              }}
              className="swiper-slide"
              style={{ backgroundImage: "url(./img/carousel_3.jpg)" }}
            >
              <button
                className="play__trailer"
                onClick={() => {
                  this.handlePlayTrailer("IpKmt4MpctM");
                }}
              >
                <i className="material-icons__play material-icons">
                  play_arrow
                </i>
              </button>
            </div>
          </SwiperSlide>
        </Swiper>
        <div className="selectMovieDiv">
          <SelectMovie />
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
}

export default withRouter(CarouselComponent);
