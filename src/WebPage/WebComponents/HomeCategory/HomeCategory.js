import React, { useState } from 'react';
import "./HomeCategory.css";
import { Link } from 'react-router-dom';
import HotelCategory from '../Data/HotelCategory';
import HotelCard from '../HotelCard/HotelCard';
import { FaArrowRightLong } from "react-icons/fa6";

const HomeCategory = () => {

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'auto'
        });
    };

    return (
        <div className='HomeCategory'>
            <div className="HomeCategory-heading">
                <h2>Luxury Accomodation</h2>
            </div>
            {HotelCategory.map((hotel, index) => (
                <HotelCard hotel={hotel} key={index} />
            ))}
            <div className="homeCategory-more-button">
                <div className="butn-dark">
                    <Link to="/luxury-accomodation" onClick={scrollToTop}>
                        <span>View More <FaArrowRightLong/></span>
                    </Link>
                </div>
            </div>

        </div>
    )
}

export default HomeCategory
