import React from 'react'
import "./HomeDetail.css"
import image1 from "../../../Assets/banner1.jpg"
import image2 from "../../../Assets/banner2.jpg"

const HomeDetail = () => {
    return (
        <div className='HomeDetail'>
            <div className="HomeDetail-left">
                <h4>THE CAPPA LUXURY HOTEL</h4>
                <h2>Enjoy a Luxury Experience</h2>
                <p>Welcome to the best five-star deluxe hotel in New York. Hotel elementum sesue the aucan vestibulum aliquam justo in sapien rutrum volutpat. Donec in quis the pellentesque velit. Donec id velit ac arcu posuere blane. Welcome to the best five-star deluxe hotel in New York. Hotel elementum sesue the aucan vestibulum aliquam justo in sapien rutrum volutpat. Donec in quis the pellentesque velit. Donec id velit ac arcu posuere blane.</p>
                <p>Hotel ut nisl quam nestibulum ac quam nec odio elementum sceisue the aucan ligula. Orci varius natoque penatibus et magnis dis parturient monte nascete ridiculus mus nellentesque habitant morbine. Hotel ut nisl quam nestibulum ac quam nec odio elementum sceisue the aucan ligula. Orci varius natoque penatibus et magnis dis parturient monte nascete ridiculus mus nellentesque habitant morbine.</p>
            </div>
            <div className="HomeDetail-right">
                <div className="HomeDetail-right-image1">
                    <img src={image1} alt="" />
                </div>
                <div className="HomeDetail-right-image2">
                    <img src={image2} alt="" />
                </div>
            </div>
        </div>
    )
}

export default HomeDetail
