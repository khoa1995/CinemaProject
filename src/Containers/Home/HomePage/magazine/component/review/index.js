import React from "react";
import "./index.scss";
export default function ReviewComponent() {
  const review = "/img/magazine/review-";
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
            <img className="imgTitle" src={`${review}1.png`} alt="" />
          </div>
          <div className="mag__content2 text-left">
            <p className="p__title">
              Review: Tàn Tích Quỷ Ám (Relic) - Ba thế hệ và mối liên kết
            </p>
            <p class="p__content">
              Điểm nhấn của phim kinh dị năm 2020 chính là Tàn Tích Quỷ Ám
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
            <img className="imgTitle" src={`${review}2.png`} alt="" />
          </div>
          <div className="mag__content2 text-left">
            <p className="p__title">
              Review: Dinh Thự Oan Khuất (Ghost Of War)
            </p>
            <p class="p__content">
              Tuy là một bộ phim có chất lượng tốt, nhưng có vẻ Dinh Thự Oan
              Khuất vẫn chưa đủ để đem khán giả trở lại phòng vé!
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
            <img className="imgTitle" src={`${review}3.png`} alt="" />
          </div>
          <div className="mag__content2 text-left">
            <p className="p__title">
              ‘BlacKkKlansman’ - cốc nước lạnh để người Mỹ thức tỉnh
            </p>
            <p class="p__content">
              Tác phẩm nhận đề cử Phim truyện xuất sắc tại Oscar 2019 của đạo
              diễn Spike Lee là một lát cắt nữa về nạn phân biệt chủng tộc - nỗi
              đau gây nhức nhối nước Mỹ cho tới tận hôm nay.
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
            <img className="imgTitle" src={`${review}4.png`} alt="" />
          </div>
          <div className="mag__content2 text-left">
            <p className="p__title">
              American Sniper - Chính nghĩa hay phi nghĩa?
            </p>
            <p class="p__content">
              American Sniper khắc họa một tay súng bắn tỉa “huyền thoại” của
              Hải quân Mỹ với 4 lần tham chiến ở Trung Đông. Câu chuyện phim
              chậm rãi đưa người xem qua từng thời khắc khác nhau của Kyle, từ
              thửa nhỏ, thiếu niên, rồi gia nhập quân đội, rồi tham chiến. Từng
              khoảnh khắc bắt đầu nhẹ nhàng...
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
              <img className="img-fluid" src={`${review}5.png`} alt="" />
            </div>
            <div className="magazine2__content">
              <p className="textMagazine2">
                Review: Spider-Man: Into The Spider-Vesre
              </p>
            </div>
          </div>
          <div className="clear"></div>
          <div className="wrapItem2">
            <div className="imgMagazine2">
              <img className="img-fluid" src={`${review}6.jpg`} alt="" />
            </div>
            <div className="magazine2__content">
              <p className="textMagazine2">
                COVID-19 là bản chính thức của MEV-1 phim contagion (2011)
              </p>
            </div>
          </div>
          <div className="clear"></div>
          <div className="wrapItem2">
            <div className="imgMagazine2">
              <img className="img-fluid" src={`${review}7.jpg`} alt="" />
            </div>
            <div className="magazine2__content">
              <p className="textMagazine2">
                [Review] Siêu Vệ Sĩ Sợ Vợ - Giải cứu Tổng thống chưa bao giờ...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
