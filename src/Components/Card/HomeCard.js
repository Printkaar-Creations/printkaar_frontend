import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const HomeCard = ({ TotalData }) => {

  return (
    <>
      {TotalData.map((data) => (
        <div className="small-box" key={data.id}>
          <DotLottieReact
            className="wallet-success"
            src={data.icon}
            loop
            autoplay
            onError={(e) => console.error("Lottie load error:", e)}
          />
          <h4>{data.field}</h4>
          <p>{data.name}</p>
        </div>
      ))}
    </>
  );
};

export default HomeCard;
