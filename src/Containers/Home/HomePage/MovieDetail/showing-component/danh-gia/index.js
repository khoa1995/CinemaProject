import React from "react";
import "./index.scss";
export default function DanhGiaComponent() {
  return (
    <div className="mainMaxWidth2 reviewMain">
      <div className="row detailReview">
        <div className="col-sm-12 col-xs-12 review__content">
          <div className="input-group">
            <span>
              <img src="/img/avatar-login.png" alt="" />
            </span>
            <input
              placeholder="Bạn nghĩ gì về phim này?"
              type="text"
              className="form-control inputReview"
            />
            <span className="starReview">
              <img src="/img/star1.png" alt="" />
              <img src="/img/star1.png" alt="" />
              <img src="/img/star1.png" alt="" />
              <img src="/img/star1.png" alt="" />
              <img src="/img/star1.png" alt="" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
