import React from "react";
import "./index.scss";
export default function KhuyenMaiComponent() {
  const km = "/img/magazine/km-";
  const iconLike = "/img/magazine/like.png";
  const iconComment = "/img/magazine/comment.png";
  const renderAmout = () => {
    return Math.round(Math.random() * (3 - 0) + 0);
  };
  return (
    <div>
      <div className="row mag__detail1">
        <div className="col-xs-12 col-md-6 text-center itemMagazine">
          <div className="mag__content1">
            <img className="imgTitle" src={`${km}1.jpg`} alt="" />
          </div>
          <div className="mag__content2 text-left">
            <p className="p__title">BHD 59K/VÉ CẢ TUẦN !!!</p>
            <p class="p__content">
              Tận hưởng Ưu Đãi lên đến 3 VÉ BHD Star mỗi tuần chỉ với giá 59k/vé
              khi mua vé trên TIX hoặc Mục Vé Phim trên ZaloPay.
            </p>
          </div>
          <div className="iconMagazine text-left">
            <div className="wrapIcon">
              <img className="iconFacebook" src={`${iconLike}`} alt="" />
              <p className="amount">{renderAmout()}</p>
            </div>
            <div className="wrapIcon">
              <img className="iconFacebook" src={`${iconComment}`} alt="" />
              <p className="amount">{renderAmout()}</p>
            </div>
          </div>
        </div>
        <div className="col-xs-12 col-md-6 text-center itemMagazine">
          <div className="mag__content1">
            <img className="imgTitle" src={`${km}2.jpg`} alt="" />
          </div>
          <div className="mag__content2 text-left">
            <p className="p__title">TIX 1K/VÉ NGẠI CHI GIÁ VÉ</p>
            <p class="p__content">
              Đồng giá 1k/vé cả tuần tất cả các rạp trên TIX + Nhận thêm 02
              voucher thanh toán ZaloPay thả ga
            </p>
          </div>
          <div className="iconMagazine text-left">
            <div className="wrapIcon">
              <img className="iconFacebook" src={`${iconLike}`} alt="" />
              <p className="amount">{renderAmout()}</p>
            </div>
            <div className="wrapIcon">
              <img className="iconFacebook" src={`${iconComment}`} alt="" />
              <p className="amount">{renderAmout()}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="row mag__detail1">
        <div className="col-xs-12 col-sm-4 itemMagazine">
          <div className="mag__content1">
            <img className="imgTitle" src={`${km}3.png`} alt="" />
          </div>
          <div className="mag__content2 text-left">
            <p className="p__title">ĐỒNG GIÁ 1K/VÉ KHI MUA VÉ QUA TIX</p>
            <p class="p__content">
              ĐỒNG GIÁ 1K/VÉ KHI MUA VÉ QUA TIX Hành trình tìm Ròm và Phúc chỉ
              với 1k cả tuần + nhận thêm 02 voucher khi đặt vé qua TIX.
            </p>
          </div>
          <div className="iconMagazine text-left">
            <div className="wrapIcon">
              <img className="iconFacebook" src={`${iconLike}`} alt="" />
              <p className="amount">{renderAmout()}</p>
            </div>
            <div className="wrapIcon">
              <img className="iconFacebook" src={`${iconComment}`} alt="" />
              <p className="amount">{renderAmout()}</p>
            </div>
          </div>
        </div>
        <div className="col-xs-12 col-sm-4 itemMagazine">
          <div className="mag__content1">
            <img className="imgTitle" src={`${km}4.jpg`} alt="" />
          </div>
          <div className="mag__content2 text-left">
            <p className="p__title">BHD STAR VÉ CHỈ 59.000Đ CẢ TUẦN!</p>
            <p class="p__content">
              Tận hưởng Ưu Đãi lên đến 3 VÉ BHD Star mỗi tuần chỉ với giá 59k/vé
              khi mua vé trên TIX và thanh toán bằng ZaloPay hoặc Mục Vé Phim
              trên ZaloPay.
            </p>
          </div>
          <div className="iconMagazine text-left">
            <div className="wrapIcon">
              <img className="iconFacebook" src={`${iconLike}`} alt="" />
              <p className="amount">{renderAmout()}</p>
            </div>
            <div className="wrapIcon">
              <img className="iconFacebook" src={`${iconComment}`} alt="" />
              <p className="amount">{renderAmout()}</p>
            </div>
          </div>
        </div>
        <div className="col-xs-12 col-sm-4 itemMagazine itemMagazine2">
          <div className="wrapItem2">
            <div className="imgMagazine2">
              <img className="img-fluid" src={`${km}5.png`} alt="" />
            </div>
            <div className="magazine2__content">
              <p className="textMagazine2">
                Beta Cineplex trở lại với hàng loạt ưu đãi lớn
              </p>
            </div>
          </div>
          <div className="clear"></div>
          <div className="wrapItem2">
            <div className="imgMagazine2">
              <img className="img-fluid" src={`${km}6.jpg`} alt="" />
            </div>
            <div className="magazine2__content">
              <p className="textMagazine2">
                [123Phim] Thứ 6 Không Đen Tối - Ưu đãi huỷ diệt 11k/vé...
              </p>
            </div>
          </div>
          <div className="clear"></div>
          <div className="wrapItem2">
            <div className="imgMagazine2">
              <img className="img-fluid" src={`${km}7.jpg`} alt="" />
            </div>
            <div className="magazine2__content">
              <p className="textMagazine2">
                [123Phim] NHẬP MÃ 'PSM30K' - Giảm ngay 30k khi đặt vé Pháp...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
