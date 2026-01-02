import React from "react";
import "./HomeNews.css";
import hotelB from "../../../Assets/banner1.jpg";
import hotelS from "../../../Assets/banner2.jpg";
import hotelBa from "../../../Assets/banner1.jpg";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomeNews = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024, // tablet
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 680, // mobile
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const newsData = [
    { img: hotelB, day: "02", month: "Dec" },
    { img: hotelS, day: "04", month: "Dec" },
    { img: hotelBa, day: "06", month: "Dec" },
    { img: hotelBa, day: "08", month: "Dec" },
  ];

  return (
    <div className="HomeNews">
      <h4>Hotel Blog</h4>
      <h2>Our News</h2>

      <div className="HomeNews-container">
        <Slider {...settings}>
          {newsData.map((item, index) => (
            <div key={index} className="HomeNews-box">
              <div className="HomeNews-box-item">
                <img src={item.img} alt="news" />

                <div className="date">
                  <span>{item.month}</span>
                  <i>{item.day}</i>
                </div>
              </div>

              <div className="con">
                <span className="category">
                  <Link to="#">Restaurant</Link>
                </span>
                <h5>
                  <Link to="#">Historic restaurant renovated</Link>
                </h5>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default HomeNews;