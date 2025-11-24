import React from "react";
import "./Loader.css";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Loader = () => {
  console.warn = (message) =>
    message.includes("Buffer size mismatch") ? null : console.warn(message);

  return (
    <div className="modal-overlay">
      <div className="modal-box loading-box">
        <DotLottieReact
          className="loading-animation"
          src="https://lottie.host/e5bad966-820c-406e-ae8c-2cd4cf6f8dcf/vh4odvANrh.lottie"
          loop
          autoplay
          onError={(e) => console.error("Lottie load error:", e)}
        />
        <p>Loading...</p>
      </div>
    </div>
  );
};

export default Loader;
