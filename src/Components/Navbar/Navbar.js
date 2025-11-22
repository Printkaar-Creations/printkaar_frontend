import "./Navbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import Sidebar from "./Sidebar";
import logo from "../../Assets/logo08.png";
import NoteContext from "../../Context/AppContext";

const Navbar = () => {
  const { adminDetail, getAccountDetails } = useContext(NoteContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      getAccountDetails();
    }
  }, [navigate]);

  // console.log(adminDetail, "adminDetail");

  const sideRef = useRef(null);
  const location = useLocation();
  const currentPath = location.pathname;
  const [isScrolled, setIsScrolled] = useState(false);
  const [sideactive, setSideactive] = useState("");

  const handleSidebar = () => {
    setSideactive("active");
  };
  const handleCloseSidebar = () => {
    setSideactive("");
  };

  // Handle scroll to toggle "isScrolled"
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="navbar">
      <div className="navbar-main">
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container-fluid nav-name">
            <Link className="navbar-brand" onClick={handleSidebar}>
              <img src={logo} alt="alt" />
              <div className="navbar-title">
                <h5>Good Morning!</h5>
                <span>{adminDetail?.userName}</span>
              </div>
            </Link>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
                <Link className="nav-link" to="/add">
                  Add
                </Link>
                <Link className="nav-link" to="/search">
                  Search
                </Link>
                <Link className="nav-link" to="/history">
                  History
                </Link>
              </div>
            </div>
            <Sidebar
              sideactive={sideactive}
              sideRef={sideRef}
              handleCloseSidebar={handleCloseSidebar}
              userDetail={adminDetail}
            />
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
