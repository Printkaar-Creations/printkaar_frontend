import {
  Route,
  Routes,
  BrowserRouter,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useEffect } from "react";

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

function App() {
  return (
    <BrowserRouter>
      <AppWrapper>
        <MainLayout />
      </AppWrapper>
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

  const publicRoutes = ["/login", "/pin", "/forgot-password"];
  const isPublic = publicRoutes.includes(location.pathname);

  // Not logged in → only allow login
  if (!token) {
    if (!isPublic) navigate("/login");
    return;
  }

  // Logged in but pin not verified → force pin page
  if (pinVerified !== "true" && location.pathname !== "/pin" && location.pathname !== "/forgot-password") {
    navigate("/pin");
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

  return children;
}

// ---------------------- MAIN LAYOUT ----------------------
function MainLayout() {
  const location = useLocation();

  // Hide navbar on PIN & Login pages
  const hideNav =
    location.pathname === "/login" || location.pathname === "/pin" || location.pathname === "/forgot-password";

  return (
    <ContextState>
      <div className="app-container">
        {!hideNav && <Navbar />}

        <Routes>
          <Route path="/pin" element={<PinScreen />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/" element={<Home />} />
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

export default App;