import {
  Route,
  Routes,
  BrowserRouter,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import Pnav from "./Components/Navbar/Pnav";
import Login from "./Pages/Login/Login";
import ContextState from "./Context/ContextState";
import Entry from "./Pages/Entry/Entry";
import Profile from "./Pages/Profile/Profile";
import History from "./Pages/History/History";
import PinScreen from "./Pages/PIN/PinScreen";
import ForgotPassword from "./Pages/Login/ForgotPassword";
import WebHome from "./WebPage/WebHome/WebHome";
import WebNavbar from "./WebPage/WebComponents/WebNavbar/WebNavbar";
import WebFooter from "./WebPage/WebComponents/WebFooter/WebFooter";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 🌍 PUBLIC WEBSITE ROUTES */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<WebHome />} />
        </Route>

        {/* 🔒 APP ROUTES (AUTH + PIN) */}
        <Route path="/app/*" element={<AppWrapper />} />
      </Routes>
    </BrowserRouter>
  );
}

// ---------------------- PIN LOCK LOGIC WRAPPER ----------------------
function AppWrapper({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const pinVerified = localStorage.getItem("pinVerified");

    const publicRoutes = ["/app/login", "/app/pin", "/app/forgot-password"];
    const isPublic = publicRoutes.includes(location.pathname);

    // Not logged in → only allow login
    if (!token) {
      if (!isPublic) navigate("/app/login");
      return;
    }

    // Logged in but pin not verified → force pin page
    if (
      pinVerified !== "true" &&
      location.pathname !== "/app/pin" &&
      location.pathname !== "/app/forgot-password"
    ) {
      navigate("/app/pin");
      return;
    }
  }, [location.pathname]);

  // Reset PIN when tab is closed or refreshed
  useEffect(() => {
    const onUnload = () => {
      localStorage.setItem("pinVerified", "false");
    };
    window.addEventListener("beforeunload", onUnload);
    return () => window.removeEventListener("beforeunload", onUnload);
  }, []);

  return <AppLayout />;
}

// ---------------------- MAIN LAYOUT ----------------------
function AppLayout() {
  const location = useLocation();

  // Hide navbar on PIN & Login pages
  const hideNav =
    location.pathname === "/app/login" ||
    location.pathname === "/app/pin" ||
    location.pathname === "/app/forgot-password";

  return (
    <ContextState>
      <div className="app-container">
        {!hideNav && <Navbar />}

        <Routes>
          <Route path="/pin" element={<PinScreen />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/home" element={<Home />} />
          <Route path="/entry" element={<Entry />} />
          <Route path="/entry/:id" element={<Entry />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/history" element={<History />} />
        </Routes>

        {!hideNav && <Pnav />}
      </div>
    </ContextState>
  );
}

function PublicLayout() {
  return (
    <>
      <WebNavbar />
      <Outlet />
      <WebFooter />
    </>
  );
}

export default App;
