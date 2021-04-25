import React from "react";
import "./news.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
export default function News() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  return (
    <section className="news" id="idUngDung">
      <div className="wrapper">
        <div className="mainMaxWidth">
          <div className="row">
            <div className="col-sm-6 news__left">
              <div>
                <p className="textLeft">Ứng dụng tiện lợi dành cho</p>
                <p className="textLeft">người yêu điện ảnh</p>
                <p className="textSmallLeft">
                  Không chỉ đặt vé, bạn còn có thể bình luận phim, chấm điểm rạp
                  và đổi quà hấp dẫn.
                </p>
                <br />
                <button className="buttonLeft">
                  App miễn phí - Tải về ngay!
                </button>
                <p className="textAppUnder">
                  TIX có hai phiên bản
                  <a
                    className="tagA"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://itunes.apple.com/us/app/123phim-mua-ve-lien-tay-chon/id615186197?mt=8"
                  >
                    iOS
                  </a>
                  &amp;
                  <a
                    className="tagA"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://play.google.com/store/apps/details?id=vn.com.vng.phim123"
                  >
                    Android
                  </a>
                </p>
              </div>
            </div>
            <div className="col-sm-6 news__right text-center">
              <img
                src="/img/mobilenews/mobilenews.png"
                height={422}
                width={220}
                alt="Loading"
              />
              <Slider className="text-center news__slider" {...settings}>
                <div className="news__img1 news__img img-fluid"></div>
                <div className="news__img2 news__img img-fluid"></div>
                <div className="news__img3 news__img img-fluid"></div>
                <div className="news__img4 news__img img-fluid"></div>
                <div className="news__img5 news__img img-fluid"></div>
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
