import React from "react";
import "./index.scss";
export default function FooterComponent() {
  const img = "/img/icons-footer/";
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-sm-4 footer__content1">
            <p className="title__footer">TIX</p>
            <div className="row">
              <div className="col-sm-6">
                <p className="footer__cursor">FAQ</p>
                <p className="footer__cursor">Brand Guidelines</p>
              </div>
              <div className="col-sm-6">
                <p className="footer__cursor">Thỏa thuận sử dụng</p>
                <p className="footer__cursor">Chính sách bảo mật</p>
              </div>
            </div>
          </div>
          <div className="col-sm-4 footer__content2">
            <p className="title__footer">ĐỐI TÁC</p>
            <div className="row">
              <div className="col-sm-12 col-xs-12 lineFooter">
                <img
                  src={`${img}cgv.png`}
                  height={30}
                  width={30}
                  alt=""
                  style={{ backgroundColor: "white", borderRadius: "100%" }}
                />

                <img src={`${img}bhd.png`} height={30} width={30} alt="" />
                <img
                  src={`${img}galaxycine.png`}
                  height={30}
                  width={30}
                  alt=""
                />
                <img src={`${img}cinestar.png`} height={30} width={30} alt="" />
                <img src={`${img}lotte.png`} height={30} width={30} alt="" />
              </div>
              <div className="col-sm-12 col-xs-12 lineFooter">
                <img
                  src={`${img}megags.png`}
                  height={30}
                  width={30}
                  alt=""
                  style={{ backgroundColor: "white", borderRadius: "100%" }}
                />

                <img src={`${img}bt.jpg`} height={30} width={30} alt="" />
                <img
                  src={`${img}dongdacinema.png`}
                  height={30}
                  width={30}
                  alt=""
                />
                <img src={`${img}TOUCH.png`} height={30} width={30} alt="" />
                <img src={`${img}cnx.jpg`} height={30} width={30} alt="" />
              </div>
              <div className="col-sm-12 col-xs-12 lineFooter">
                <img
                  src={`${img}STARLIGHT.png`}
                  height={30}
                  width={30}
                  alt=""
                  style={{ backgroundColor: "white", borderRadius: "100%" }}
                />

                <img src={`${img}dcine.png`} height={30} width={30} alt="" />
                <img
                  src={`${img}zalopay_icon.png`}
                  height={30}
                  width={30}
                  alt=""
                />
                <img src={`${img}payoo.jpg`} height={30} width={30} alt="" />
                <img src={`${img}VCB.png`} height={30} width={30} alt="" />
              </div>
              <div className="col-sm-12 col-xs-12 lineFooter">
                <img
                  src={`${img}AGRIBANK.png`}
                  height={30}
                  width={30}
                  alt=""
                  style={{ backgroundColor: "white", borderRadius: "100%" }}
                />

                <img
                  src={`${img}VIETTINBANK.png`}
                  height={30}
                  width={30}
                  alt=""
                />
                <img src={`${img}IVB.png`} height={30} width={30} alt="" />
                <img src={`${img}123go.png`} height={30} width={30} alt="" />
                <img src={`${img}laban.png`} height={30} width={30} alt="" />
              </div>
            </div>
          </div>
          <div className="col-sm-4 footer__content3">
            <div className="row">
              <div className="col-sm-6 text-center">
                {" "}
                <p className="title__footer">MOBILE APP</p>
                <img
                  src={`${img}apple-logo.png`}
                  height={30}
                  width={30}
                  alt=""
                />
                <img
                  src={`${img}android-logo.png`}
                  height={30}
                  width={30}
                  alt=""
                />
              </div>
              <div className="col-sm-6 text-center">
                {" "}
                <p className="title__footer">SOCIAL</p>
                <img
                  src={`${img}facebook-logo.png`}
                  height={30}
                  width={30}
                  alt=""
                />
                <img
                  src={`${img}zalo-logo.png`}
                  height={30}
                  width={30}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        <hr className="hrFooter" />
        <div className="row footer2">
          <div className="col-xs-12 col-sm-1 zionLogo">
            <img src={`${img}zion-logo.jpg`} alt="" />
          </div>
          <div className="col-xs-12 col-sm-9 infoFooter">
            <span>TIX – SẢN PHẨM CỦA CÔNG TY CỔ PHẦN ZION</span>
            <br />
            <span>
              Địa chỉ: Z06 Đường số 13, Phường Tân Thuận Đông, Quận 7, Tp. Hồ
              Chí Minh, Việt Nam.
            </span>
            <br />
            <span>
              Giấy chứng nhận đăng ký kinh doanh số: 0101659783,
              <br />
              đăng ký thay đổi lần&nbsp;thứ&nbsp;30,
              ngày&nbsp;22&nbsp;tháng&nbsp;01&nbsp;năm&nbsp;2020 do
              Sở&nbsp;kế&nbsp;hoạch&nbsp;và&nbsp;đầu&nbsp;tư Thành phố Hồ Chí
              Minh cấp.
            </span>
            <br />
            <span>
              Số Điện Thoại (Hotline): 1900&nbsp;545&nbsp;436
              <br />
              Email:{" "}
              <a href="mailto:support@tix.vn" style={{ color: "#FB4226" }}>
                support@tix.vn
              </a>
            </span>
          </div>
          <div className="col-xs-12 col-sm-2 zionLogo2">
            <img src={`${img}daThongBaoBoCongThuong.png`} alt="" />
          </div>
        </div>
      </div>
    </footer>
  );
}
