import React, { useState, useEffect, useContext } from "react";
import "./Home.css";
import Card from "../../Components/Card/Card";
import NoteContext from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import HomeCard from "../../Components/Card/HomeCard";
import Loader from "../../Components/Loader/Loader";

const Home = () => {
  const { entries, getAllEntries, allState, getAllState } =
    useContext(NoteContext);
  const navigate = useNavigate();
  const [view, setView] = useState("this-month");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      getAllEntries();
      getAllState();
      setLoading(false);
    }
  }, [navigate]);

  const pending = entries.filter((e) => e.action === "processing").length;

  const completed = entries.filter(
    (e) => e.type === "sell" && e.action === "completed"
  ).length;

  const TotalData = [
    {
      id: 1,
      name: "balance",
      field: `₹${allState?.totals?.balance || 0}`,
      icon: "https://lottie.host/fff28f40-a974-4f20-a650-9f8c95194cb1/3e1bYA44nJ.lottie",
    },
    {
      id: 2,
      name: "Total Sales",
      field: `₹${allState?.totals?.saleTotal || 0}`,
      icon: "https://lottie.host/8e5bbb43-3d16-415c-aedd-866310e7576c/u1vV7eQ3TR.lottie",
    },
    {
      id: 3,
      name: "Total Purchase",
      field: `₹${allState?.totals?.purchaseTotal || 0}`,
      icon: "https://lottie.host/329f8239-9b93-4c6b-9f49-3a995966b9ba/4PPSZkIciI.lottie",
    },
    {
      id: 4,
      name: "Total Expense",
      field: `₹${allState?.totals?.expenseTotal || 0}`,
      icon: "https://lottie.host/b0e60cca-b752-4bc8-8fe9-363b5dd54908/Iro82wuXxW.lottie",
    },
    {
      id: 5,
      name: "Total Profit",
      field: `₹${allState?.totals?.othersTotal || 0}`,
      icon: "https://lottie.host/0eead098-07e9-4933-be67-a2e8c4d3153f/gI6pNBqaAL.lottie",
    },
    {
      id: 6,
      name: "Total Loss",
      field: `₹${allState?.totals?.profitTotal || 0}`,
      icon: "https://lottie.host/daa9d2bb-4f9b-492e-87bc-7fbe320851c8/SiP2vbrcX3.lottie",
    },
    {
      id: 7,
      name: "Processing",
      field: pending,
      icon: "https://lottie.host/d6cf7a71-53a0-42ad-83f2-02a04346d722/BWeb6rvunY.lottie",
    },
    {
      id: 8,
      name: "Completed",
      field: completed,
      icon: "https://lottie.host/8b26f855-48db-40c6-b072-ee5f9f6c7d5c/odzSNJFmyh.lottie",
    },
  ];

  const TodaysData = [
    {
      id: 1,
      name: "Total Sales",
      field: `₹${allState?.today?.todaySale || 0}`,
      icon: "https://lottie.host/8e5bbb43-3d16-415c-aedd-866310e7576c/u1vV7eQ3TR.lottie",
    },
    {
      id: 2,
      name: "Total Purchase",
      field: `₹${allState?.today?.todayPurchase || 0}`,
      icon: "https://lottie.host/329f8239-9b93-4c6b-9f49-3a995966b9ba/4PPSZkIciI.lottie",
    },
    {
      id: 3,
      name: "Total Expense",
      field: `₹${allState?.today?.todayExpense || 0}`,
      icon: "https://lottie.host/b0e60cca-b752-4bc8-8fe9-363b5dd54908/Iro82wuXxW.lottie",
    },
    {
      id: 4,
      name: "Total Profit",
      field: `₹${allState?.today?.todayProfit || 0}`,
      icon: "https://lottie.host/0eead098-07e9-4933-be67-a2e8c4d3153f/gI6pNBqaAL.lottie",
    },
    {
      id: 5,
      name: "Total Loss",
      field: `₹${allState?.today?.todayLoss || 0}`,
      icon: "https://lottie.host/daa9d2bb-4f9b-492e-87bc-7fbe320851c8/SiP2vbrcX3.lottie",
    },
  ];
  const MonthData = [
    {
      id: 1,
      name: "Total Sales",
      field: `₹${allState?.month?.monthSale || 0}`,
      icon: "https://lottie.host/8e5bbb43-3d16-415c-aedd-866310e7576c/u1vV7eQ3TR.lottie",
    },
    {
      id: 2,
      name: "Total Purchase",
      field: `₹${allState?.month?.monthPurchase || 0}`,
      icon: "https://lottie.host/329f8239-9b93-4c6b-9f49-3a995966b9ba/4PPSZkIciI.lottie",
    },
    {
      id: 3,
      name: "Total Expense",
      field: `₹${allState?.month?.monthExpense || 0}`,
      icon: "https://lottie.host/b0e60cca-b752-4bc8-8fe9-363b5dd54908/Iro82wuXxW.lottie",
    },
    {
      id: 4,
      name: "Total Profit",
      field: `₹${allState?.month?.monthProfit || 0}`,
      icon: "https://lottie.host/0eead098-07e9-4933-be67-a2e8c4d3153f/gI6pNBqaAL.lottie",
    },
    {
      id: 5,
      name: "Total Loss",
      field: `₹${allState?.month?.monthLoss || 0}`,
      icon: "https://lottie.host/daa9d2bb-4f9b-492e-87bc-7fbe320851c8/SiP2vbrcX3.lottie",
    },
  ];

  console.warn = (message) =>
    message.includes("Buffer size mismatch") ? null : console.warn(message);

  return (
    <div className="Home">
      <div className="Home-main">
        {/* -------------------- TOGGLE BUTTONS -------------------- */}
        <div className="toggle-container">
          <button
            className={`toggle-btn ${view === "today" ? "active" : ""}`}
            onClick={() => setView("today")}
          >
            Today
          </button>
          <button
            className={`toggle-btn ${view === "this-month" ? "active" : ""}`}
            onClick={() => setView("this-month")}
          >
            This Month
          </button>
          <button
            className={`toggle-btn ${view === "all" ? "active" : ""}`}
            onClick={() => setView("all")}
          >
            All
          </button>
        </div>

        {view === "all" && (
          <div className="top-boxes">
            <HomeCard TotalData={TotalData} />
          </div>
        )}
        {view === "today" && (
          <>
            {/* <h5 className="top-heading">Today's Stats</h5> */}
            <div className="top-boxes">
              <HomeCard TotalData={TodaysData} />
            </div>
          </>
        )}
        {view === "this-month" && (
          <>
            {/* <h5 className="top-heading">This Month's Stats</h5> */}
            <div className="top-boxes">
              <HomeCard TotalData={MonthData} />
            </div>
          </>
        )}
        {loading && (
          <Loader/>
        )}
      </div>
    </div>
  );
};

export default Home;
