import React from "react";
import Slider from "react-slick";
import Banners from "../WebComponents/Banners/Banners";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./WebHome.css";
import HomeDetail from "../WebComponents/HomeDetail/HomeDetail";
import HomeRooms from "../WebComponents/HomeRooms/HomeRooms";
import BannerData from "../WebComponents/Data/BannerData";
import HomeCategory from "../WebComponents/HomeCategory/HomeCategory";
import HomeReview from "../WebComponents/HomeReview/HomeReview";
import HomeNews from "../WebComponents/HomeNews/HomeNews";
import HomeForm from "../WebComponents/HomeForm/HomeForm";

const WebHome = () => {

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <div className="Home1">
      <div className="Home-box">
        <div className="Home1-banner">
          <Slider {...settings}>
            {BannerData.map((item) => (
              <Banners
                key={item.id}
                cover={item.cover}
                title={item.title}
                heading={item.heading}
              />
            ))}
          </Slider>
        </div>
        <div className="Home1-detail">
          <HomeDetail />
        </div>
        <div className="Home1-rooms">
          <div className="Home1-rooms-suits">
            <HomeRooms />
          </div>
        </div>
        <div className="Home1-category">
          <HomeCategory />
        </div>
        <div className="Home1-review">
          <div className="Home1-review-box">
            <HomeReview />
          </div>
        </div>
        <div className="Home1-news">
          <HomeNews />
        </div>
        <div className="Home1-contact">
          <div className="Home1-contact-box">
            <HomeForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebHome;
