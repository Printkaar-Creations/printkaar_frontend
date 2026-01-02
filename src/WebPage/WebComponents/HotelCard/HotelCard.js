import React from 'react'
import "./HotelCard.css"
// import ImageGallery from "react-image-gallery";
import { FaLocationDot, FaRegClock } from "react-icons/fa6";
import { MdRestaurantMenu } from "react-icons/md";
import { Link } from 'react-router-dom';
import { FaArrowRightLong } from "react-icons/fa6";

const HotelCard = ({ hotel }) => {

    var index = (hotel.id);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'auto'
        });
    };

    return (
        <>
            <div className="homeCategory-box" key={index}>
                {index % 2 != 0 ? (
                    <>
                        <div className="homeCategory-box-left">
                            <img src={hotel.image} alt="" />
                        </div>
                        <div className="homeCategory-box-right">
                            <div className="content">
                                <div className="cont">
                                    <div className="info">
                                        <h6>{hotel.category}</h6>
                                    </div>
                                    <h4>{hotel.name}</h4>
                                    <div className='cont-desc'>
                                        <p className='days'>
                                            {hotel.days}
                                        </p>
                                        <p className='location'>
                                            {hotel.locations}
                                        </p>
                                        <p className='description'>
                                            {hotel.description}
                                        </p>
                                    </div>
                                    <div className="butn-dark">
                                        <Link to="/luxury-accomodation/hotel-detail" onClick={scrollToTop}>
                                            <span>Read More <FaArrowRightLong/></span>
                                        </Link>
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
                                        <h6>{hotel.category}</h6>
                                    </div>
                                    <h4>{hotel.name}</h4>
                                    <div className='cont-desc'>
                                        <p className='days'>
                                            {hotel.days}
                                        </p>
                                        <p className='location'>
                                            {hotel.locations}
                                        </p>
                                        <p className='description'>
                                            {hotel.description}
                                        </p>
                                    </div>
                                    <div className="butn-dark">
                                        <Link to="/luxury-accomodation/hotel-detail" onClick={scrollToTop}>
                                        <span>Read More <FaArrowRightLong/></span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="homeCategory-box-left">
                            <img src={hotel.image} alt="" />
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default HotelCard
