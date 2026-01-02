import React from 'react'
import "./SocialMedia.css"
import { FaInstagram, FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa6";
import { Link } from 'react-router-dom';


const SocialMedia = () => {
    return (
        <>
            <div className="media-items">
                <Link to={"https://x.com/RamKishan___?t=P5bvlsgHQ38vfw6NRibdGA&s=08"}>
                    <FaTwitter />
                </Link>
                <Link to={"https://www.instagram.com/ramkishan__9?utm_source=qr&igsh=cWxsd3g4NGRwcHlr"}>
                    <FaInstagram />
                </Link>
                <Link to={"https://www.facebook.com/share/xMd6H2HeYadMv27u/?mibextid=qi2Omg"}>
                    <FaFacebookF />
                </Link>
                <Link to={"https://www.linkedin.com/in/ram-kishan-53494a297?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"}>
                    <FaLinkedinIn />
                </Link>
            </div>
        </>
    )
}

export default SocialMedia