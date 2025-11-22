import React, { useState, useEffect, useContext } from "react";
import "./Home.css";
import Card from "../../Components/Card/Card";
import NoteContext from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const { entries, getAllEntries, allState, getAllState } =
        useContext(NoteContext);
    const navigate = useNavigate();
    const [view, setView] = useState("all");

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/login");
        } else {
            getAllEntries();
            getAllState();
        }
    }, [navigate]);

    const pending = entries.filter(
        (e) => e.action === "processing"
    ).length;

    const completed = entries.filter(
        (e) => e.type === "sell" && e.action === "completed"
    ).length;

    return (
        <div className="Home">
            <div className="Home-main">
                {/* -------------------- TOGGLE BUTTONS -------------------- */}
                <div className="toggle-container">
                    <button
                        className={`toggle-btn ${view === "all" ? "active" : ""}`}
                        onClick={() => setView("all")}
                    >
                        All
                    </button>
                    <button
                        className={`toggle-btn ${view === "today" ? "active" : ""}`}
                        onClick={() => setView("today")}
                    >
                        Today
                    </button>
                </div>

                {view === "all" && (
                    <div className="top-boxes">
                        <div className="small-box">
                            <h4>₹{allState?.totals?.balance}</h4>
                            <p>Balance</p>
                        </div>
                        <div className="small-box">
                            <h4>₹{allState?.totals?.saleTotal}</h4>
                            <p>Total Sell</p>
                        </div>
                        <div className="small-box">
                            <h4>₹{allState?.totals?.purchaseTotal}</h4>
                            <p>Total Purchase</p>
                        </div>
                        <div className="small-box">
                            <h4>₹{allState?.totals?.expenseTotal}</h4>
                            <p>Total Expense</p>
                        </div>
                        <div className="small-box">
                            <h4>₹{allState?.totals?.othersTotal}</h4>
                            <p>Total Others</p>
                        </div>
                        <div className="small-box">
                            <h4>₹{allState?.totals?.profitTotal}</h4>
                            <p>Total profit</p>
                        </div>
                        <div className="small-box">
                            <h4>₹{allState?.totals?.lossTotal}</h4>
                            <p>Total Loss</p>
                        </div>
                        <div className="small-box">
                            <h4>{pending}</h4>
                            <p>Processing</p>
                        </div>
                        <div className="small-box">
                            <h4>{completed}</h4>
                            <p>Completed</p>
                        </div>
                    </div>
                )}
                {view === "today" && (
                    <>
                        {/* <h5 className="top-heading">Today's Stats</h5> */}
                        <div className="top-boxes">
                            <div className="small-box">
                                <h4>₹{allState?.today?.todaySale}</h4>
                                <p>Sell</p>
                            </div>
                            <div className="small-box">
                                <h4>₹{allState?.today?.todayPurchase}</h4>
                                <p>Purchase</p>
                            </div>
                            <div className="small-box">
                                <h4>₹{allState?.today?.todayExpense}</h4>
                                <p>Expense</p>
                            </div>
                            <div className="small-box">
                                <h4>₹{allState?.today?.todayOthers}</h4>
                                <p>Others</p>
                            </div>
                            <div className="small-box">
                                <h4>₹{allState?.today?.todayProfit}</h4>
                                <p> profit</p>
                            </div>
                            <div className="small-box">
                                <h4>₹{allState?.today?.todayLoss}</h4>
                                <p> Loss</p>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Home;
