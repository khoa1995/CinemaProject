import React from "react";
import "./index.scss";
export default function DienAnhComponent() {
  const dienAnh = "/img/magazine/dien-anh-";
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
            <img className="imgTitle" src={`${dienAnh}1.jpg`} alt="" />
          </div>
          <div className="mag__content2 text-left">
            <p className="p__title">
              “Bóc tem” tổ hợp giải trí mới toanh của giới Hà Thành
            </p>
            <p className="p__content">
              Vào đúng ngày Nhà giáo Việt Nam 20/11, khu vui chơi sống ảo
              độc-lạ-chill nhất từ trước đến giờ sẽ chính thức khai trương tại
              360 Giải Phóng!{" "}
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
            <img className="imgTitle" src={`${dienAnh}2.png`} alt="" />
          </div>
          <div className="mag__content2 text-left">
            <p className="p__title">
              Tiệc Trăng Máu chính thức cán mốc 100 tỷ chỉ sau 2 tuần công chiếu
            </p>
            <p className="p__content">
              Sau 2 tuần ra mắt, Tiệc Trăng Máu chính thức gia nhập câu lạc bộ
              phim điện ảnh đạt 100 tỷ đồng doanh thu phòng vé. Dàn ngôi sao
              “bạc tỷ” của phim cũng lần đầu tiên hội tụ đầy đủ trong một khung
              hình để ăn mừng thành tích ấn tượng của tác phẩm.
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
            <img className="imgTitle" src={`${dienAnh}3.jpg`} alt="" />
          </div>
          <div className="mag__content2 text-left">
            <p className="p__title">
              NGÔ THANH VÂN CHÍNH THỨC KHỞI ĐỘNG CUỘC THI THIẾT KẾ...
            </p>
            <p className="p__content">
              Chiều tối ngày 30-10-2020, Ngô Thanh Vân và Studio68 đã chính thức
              phát động cuộc thi thiết kế trang phục cho siêu anh hùng VINAMAN
              với tổng giá trị giải thưởng lên đến 60 triệu đồng.
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
            <img className="imgTitle" src={`${dienAnh}4.png`} alt="" />
          </div>
          <div className="mag__content2 text-left">
            <p className="p__title">
              [ANTEBELLUM] - 4 lý do không thể bỏ lỡ siêu phẩm kinh dị...
            </p>
            <p className="p__content">
              Không đi theo lối mòn máu me, hù dọa mà đầu tư khai thác những
              mảng tối của xã hội trên nền một câu chuyện kinh dị, có sự tham
              gia của nhà sản xuất đã làm nên thành công của loạt tác phẩm ấn
              tượng “Get Out”, “Us” hay “BlacKkKlansman”, và còn nhiều lý do
              khác khiến người yêu phim không thể bỏ lỡ Ante
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
              <img className="img-fluid" src={`${dienAnh}5.png`} alt="" />
            </div>
            <div className="magazine2__content">
              <p className="textMagazine2">
                Dàn mỹ nhân trong thế giới điện ảnh của quái kiệt Christopher...
              </p>
            </div>
          </div>
          <div className="clear"></div>
          <div className="wrapItem2">
            <div className="imgMagazine2">
              <img className="img-fluid" src={`${dienAnh}6.png`} alt="" />
            </div>
            <div className="magazine2__content">
              <p className="textMagazine2">
                Truy Cùng Giết Tận - Cuộc tái ngộ của hai 'ông hoàng phòng...
              </p>
            </div>
          </div>
          <div className="clear"></div>
          <div className="wrapItem2">
            <div className="imgMagazine2">
              <img className="img-fluid" src={`${dienAnh}7.png`} alt="" />
            </div>
            <div className="magazine2__content">
              <p className="textMagazine2">
                6 đạo diễn tỉ đô làm nên thành công của những bom tấn đình...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
