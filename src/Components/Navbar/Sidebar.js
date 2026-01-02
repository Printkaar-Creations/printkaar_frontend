import React, { useContext, useEffect, useState } from "react";
import "./Sidebar.css";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRightLeft,
  BanknoteArrowUp,
  ChevronRight,
  Info,
  MessageCircleQuestionMark,
  Newspaper,
  ShieldAlert,
  ShieldCheck,
  X,
} from "lucide-react";
import logo from "../../Assets/logo08.png"

const Sidebar = ({ sideactive, sideRef, handleCloseSidebar, userDetail }) => {
  const navigate = useNavigate();

  const userData = userDetail;
  const handleProfile = () => {
    handleCloseSidebar();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/app/login");
  };

  return (
    <div className={`Sidebar ${sideactive}`} ref={sideRef}>
      <div className="Sidebar-main">
        <X className="sidebar-closebnt" onClick={handleCloseSidebar} />
        <div className="sidebar-top">
          <Link>
            <div className="SearchCard">
              <div className="SearchCard-left">
                <img src={logo} alt="" />
              </div>
              <div className="SearchCard-right navbar-title">
                <h5>{userDetail?.userName}</h5>
                <span>{userDetail?.email}</span>
              </div>
              {/* <div className="sidebar-profile-visit">
                <ChevronRight />
              </div> */}
            </div>
          </Link>
        </div>
        <div className="sidebar-items">
          <ul>
            <li>
              <Link onClick={handleProfile} to={"/app/"}>
                {" "}
                <Info />
                About Us
              </Link>
            </li>
            <li>
              <Link onClick={handleProfile} to={"/app/"}>
                {" "}
                <MessageCircleQuestionMark />
                Help
              </Link>
            </li>
            <li>
              <Link onClick={handleProfile} to={"/app/history"}>
                {" "}
                <ArrowRightLeft /> History
              </Link>
            </li>
            <li>
              <Link onClick={handleProfile} to={"/app/"}>
                {" "}
                <ShieldAlert />
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link onClick={handleProfile} to={"/app/"}>
                {" "}
                <Newspaper />
                Term And Conditions
              </Link>
            </li>
            <li>
              <Link onClick={handleProfile} to={"/app/"}>
                {" "}
                <BanknoteArrowUp />
                Return And Refund
              </Link>
            </li>
            <li>
              <Link onClick={handleProfile} to={"/app/"}>
                {" "}
                <ShieldCheck />
                Certificates
              </Link>
            </li>
            {/* <li>
                            <Link onClick={handleProfile} to={"/"}> <MdWorkOutline />Carrier</Link>
                        </li> */}
          </ul>
        </div>
        <div className="sidebar-bottom">
          {/* <div className="sidebar-career">
            <h5>Join Our Team!</h5>
            <p>Become a Member</p>
            <Link onClick={handleProfile} to={"/career"}>
              Career
            </Link>
            <img src={career} alt="" />
          </div> */}
          <div className="sidebar-logout">
            <p onClick={handleLogout}>Log Out</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
