import React from 'react'
import "./HotelDetailCard.css"
import ImageGallery from "react-image-gallery";
import { FaLocationDot, FaRegClock } from "react-icons/fa6";
import { MdRestaurantMenu } from "react-icons/md";
import { Link } from 'react-router-dom';

const HotelDetailCard = ({ day }) => {

    var index = (day.id);

    return (
        <>
            <div className="homeCategory-box" key={index}>
          {index % 2 !== 0 ? (
            <>
              <div className="homeCategory-box-left">
                <img src={day.image} alt="" />
              </div>
              <div className="homeCategory-box-right">
                <div className="content">
                  <div className="cont">
                    <div className="info">
                      <h6>{day.day}</h6>
                    </div>
                    <h4>{day.title}</h4>
                    <div className='cont-desc'>
                      <p>{day.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="homeCategory-box-right">
                <div className="content">
                  <div className="cont">
                    <div className="info">
                      <h6>{day.day}</h6>
                    </div>
                    <h4>{day.title}</h4>
                    <div className='cont-desc'>
                      <p>{day.description}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="homeCategory-box-left">
                <img src={day.image} alt="" />
              </div>
            </>
          )}
        </div>
        </>
    )
}

export default HotelDetailCard
