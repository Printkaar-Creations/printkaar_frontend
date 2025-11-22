import React, { useContext, useEffect, useRef, useState } from "react";
import "./Pnav.css";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeftRight, CopyPlus, House, User } from "lucide-react";
// import NoteContext from "../../context/AppContext";

const Pnav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [tail, setTail] = useState(null);
  const [highlightProps, setHighlightProps] = useState({
    left: -9999,
    width: 0,
  });
  const navRefs = useRef([]);

  useEffect(() => {
    const links = ["/","/history", "/entry", "/profile"];

    const current = navRefs.current.find(
      (ref) => ref && ref.dataset.path === location.pathname
    );

    if (links.includes(location.pathname) && current) {
      const oldLeft = highlightProps.left + highlightProps.width / 2;
      const newLeft = current.offsetLeft + current.offsetWidth / 2;

      if (oldLeft !== newLeft) {
        setTail({ from: oldLeft, to: newLeft });
      }

      setHighlightProps({
        left: current.offsetLeft,
        width: "50px",
      });
    } else {
      // Hide highlight if route doesn't match any nav item
      setHighlightProps({ left: -9999, width: 0 });
    }
  }, [location]);

  useEffect(() => {
    if (tail) {
      const timeout = setTimeout(() => {
        setTail(null);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [tail]);

  return (
    <div className="Pnav">
      <motion.div
        className="highlight"
        animate={{
          left: highlightProps.left,
          width: highlightProps.width,
          scale: [1, 0.7, 1],
        }}
        transition={{
          duration: 0.4,
          ease: [0.22, 1.61, 0.36, 1],
        }}
      />
      <ul>
        <li>
          <NavLink
            to={"/"}
            className="nav-link"
            data-path={"/"}
            ref={(el) => (navRefs.current[0] = el)}
          >
            <House />
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/history"}
            className="nav-link"
            data-path={"/history"}
            ref={(el) => (navRefs.current[1] = el)}
          >
            <ArrowLeftRight />
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/entry"}
            className="nav-link"
            data-path={"/entry"}
            ref={(el) => (navRefs.current[2] = el)}
          >
            <CopyPlus />
          </NavLink>
        </li>
        
        {/* <li>
          <NavLink
            to={"/profile"}
            className="nav-link"
            data-path={"/profile"}
            ref={(el) => (navRefs.current[3] = el)}
          >
            <User />
          </NavLink>
        </li> */}
      </ul>
    </div>
  );
};

export default Pnav;
