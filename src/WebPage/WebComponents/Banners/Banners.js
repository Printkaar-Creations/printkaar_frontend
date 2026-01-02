import React from "react";
import "./Banners.css";

const Banners = (props) => {
  return (
    <>
      <div className="Banners" id={props.id}>
        <div className="banner-image">
          <img src={props.cover} alt="" />
        </div>
        <div className="Banners-detail">
          <div className="banner-title">
            <h4>{props.title}</h4>
          </div>
          <div className="banner-desc">
            <h1>{props.heading}</h1>
          </div>
          <div className="banner-button">
            <p>Room & suits</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banners;
