import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const HomeCard = ({ TotalData }) => {
  const formatAmount = (value) => {
    if (!value) return "0";

    // Remove ₹ and commas if present
    const num = Number(String(value).replace(/[₹,]/g, ""));

    return new Intl.NumberFormat("en-IN").format(num);
  };

  console.log(TotalData);

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
          {data.name === "Processing" || data.name === "Completed" ? (
            <h4>{formatAmount(data.field)}</h4>
          ) : (
            <h4>₹{formatAmount(data.field)}</h4>
          )}

          <p>{data.name}</p>
        </div>
      ))}
    </>
  );
};

export default HomeCard;
