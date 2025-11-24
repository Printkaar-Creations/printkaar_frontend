import React, { useEffect, useState } from "react";
import "./Card.css";
import {
    Check,
    ChevronDown,
    CircleCheckBig,
    ClockFading,
    Pen,
    TrendingDown,
    TrendingUp,
    X,
} from "lucide-react";
import Modal from "../Modal/Modal";
import Host from "../../Host";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";

const Card = ({ data, openSell, setOpenSell, purchases, loggedInUserId, getAllEntries }) => {
    const navigate = useNavigate();
    const [swipe, setSwipe] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const isOwner = String(loggedInUserId) === String(data.createdBy);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    const handleTouch = (e) => {
        const movement =
            e.touches[0].clientX - e.target.getBoundingClientRect().left;

        if (movement < -50) setSwipe(-140);
        else setSwipe(0);
    };

    const formatDate = (isoString) => {
        const date = new Date(isoString);

        const day = date.getDate();
        const month = date.toLocaleString("en-US", { month: "short" }); // Nov, Oct etc.

        let hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const ampm = hours >= 12 ? "PM" : "AM";

        hours = hours % 12 || 12; // convert 0 to 12 for 12-hour clock

        return `${day} ${month}, ${hours}:${minutes} ${ampm}`;
    };

    // Find purchase amount under this sell
    const relatedPurchases = purchases?.filter(
        (p) => String(p.linkedSellId) === String(data._id)
    );

    const difference = Number(data.profitOrLoss || 0);
    const remaining =
        Number(data.totalAmount) - Number(data.advance) - Number(data.restMoney);
    const statement = data.profitType; // "profit" or "loss" or "neutral"

    // Add Payment Handler
    const handleAddPayment = async (amount, data, deliveryType, deliveryAmount) => {
        console.log(amount, data, "daaaa");
        setLoading(true);
        try {
            const res = await fetch(`${Host}/entry/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token"),
                },
                body: JSON.stringify({
                    type: "restMoney",
                    name: data.name,
                    company: data.company,
                    linkedSellId: data._id,
                    totalAmount: data.totalAmount,
                    advance: data.advance,
                    restMoney: amount,
                }),
            });

            const out = await res.json();
            if (out.success) {
                getAllEntries();
                setShowModal(false)
                setLoading(false);
            } else {
                alert("Failed to add money");
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleDelete = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${Host}/entry/delete/${data._id}`, {
                method: "DELETE",
                headers: {
                    "auth-token": localStorage.getItem("token"),
                },
            });

            const out = await res.json();
            if (out.success) {
                getAllEntries();
                setLoading(false);
            } else {
                alert("Delete failed");
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleReview = async (status) => {
        setLoading(true);
        try {
            const res = await fetch(`${Host}/entry/review/${data._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token"),
                },
                body: JSON.stringify({ status }),
            });

            const out = await res.json();
            if (out.success) {
                getAllEntries()
                setLoading(false);
                setSwipe(0);
            } else {
                alert("Failed to update review");
            }
        } catch (err) {
            console.log(err);
        }
    };

    const [createdByAdmin, setCreatedByAdmin] = useState();
    const [reviewAdmin, setReviewAdmin] = useState();

    const getAllAdmin = async () => {
        // setLoading(true);
        const response = await fetch(`${Host}/auth/getallusers`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token"),
            },
        });
        const json = await response.json();
        // console.log(json, "json");
        const admindata = json.find((i) => i._id === data.createdBy)
        setCreatedByAdmin(admindata);
        const admin = json.find((i) => i._id === data.reviewedBy)
        setReviewAdmin(admin);
        // setLoading(false);
    };

    useEffect(() => {
        getAllAdmin()
    }, [data])

    // console.log(reviewAdmin?.userName, "reviewAdmin")

    const formatAmount = (num) => {
        const formatted = new Intl.NumberFormat("en-IN").format(num);
        // console.log(formatted, "formatted");
        return formatted;
    };

    const formatShortName = (name) => {
        if (!name) return "";

        const parts = name.trim().split(" ");
        // Default: first letter of each word (max 2 letters)
        const initials = parts.map(p => p[0]).join("").toUpperCase();
        return initials.slice(0, 2);
    };
    // console.log(createdByAdmin, "createdByAdmin")
    console.log(data, "data")

    return (
        <div className="entry-card-wrapper">
            <div
                className={`entry-card ${data.type}`}
                style={{ transform: `translateX(${swipe}px)` }}
                onTouchMove={handleTouch}
                onClick={(e) => {
                    // Don't open when clicking action button or swipe buttons
                    if (e.target.classList.contains("action")) return;
                    if (swipe !== 0) return;

                    setShowDetailsModal(true);
                }}
            >
                <span className="admin-name">{formatShortName(createdByAdmin?.userName)}</span>
                <div className="card-top">
                    <div className="card-left">
                        <h4>
                            {data.name ? data.name : data.note} {data.type !== "delivery" ? <span>{data.company ? "(" + data.company + ")" : ""}</span> : <span>({data.note})</span>}
                        </h4>
                        <p>
                            {data.type} Entry on {formatDate(data.createdAt)}
                        </p>
                    </div>
                    <div className="card-right">
                        {data.type === "restMoney" ? (
                            <p>₹{formatAmount(Number(data?.restMoney))}</p>
                            // <p>₹{data?.restMoney}</p>
                        ) : (
                            <p>₹{formatAmount(Number(data?.totalAmount))}</p>
                            // <p>₹{data.totalAmount}</p>
                        )}
                        {data.type === "purchase" && <p>DC ₹{formatAmount(Number(data?.deliveryCharge))}</p>}
                        {data.type === "sell" && <p>Adv ₹{formatAmount(Number(data?.advance))}</p>}
                    </div>
                </div>
                {data.reviewedBy &&
                    <>
                        <p className={`review-status ${data.status === "correct" ? "green" : "red"}`}>Reviewed By {reviewAdmin?.userName}</p>
                    </>
                }
                {data.type === "sell" && (
                    <>
                        {data.action === "completed" ? (
                            <>
                                <hr />
                                <div className="card-top">
                                    <div className="card-left">
                                        <h4>{data.orderId}</h4>
                                    </div>
                                    <div className="card-right">
                                        {statement === "profit" ? (
                                            <p className="profit">
                                                ₹{formatAmount(Number(difference))} <TrendingUp />
                                                {/* ₹{difference} <TrendingUp /> */}
                                            </p>
                                        ) : (
                                            <p className="loss">
                                                ₹{formatAmount(Number(difference))} <TrendingDown />
                                                {/* ₹{difference} <TrendingDown /> */}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>

                                <hr />
                                <div className="card-top">
                                    <div className="card-left">
                                        <h4>{data.orderId}</h4>
                                    </div>
                                    <div className="card-right">
                                        <p>₹{formatAmount(Number(remaining))}</p>
                                        <p className="action" onClick={() => setShowModal(true)}>
                                            action
                                        </p>
                                    </div>
                                </div>
                            </>
                        )}
                        {data.action === "processing" ? (
                            <span className="card-status processing">
                                <ClockFading />
                                {data.action}
                            </span>
                        ) : (
                            <span className="card-status completed">
                                <CircleCheckBig />
                                {data.action}
                            </span>
                        )}
                    </>
                )}
            </div>

            {/* Buttons that slide in */}
            <div
                className="swipe-actions"
                style={{
                    transform: swipe === 0 ? "translateX(100%)" : "translateX(0px)",
                }}
            >
                {isOwner ? (
                    <>
                        {/* OWNER — EDIT */}
                        <button
                            className="accept"
                            onClick={() => (navigate("/entry", { state: data._id }))}
                        >
                            <Pen />
                        </button>

                        {/* OWNER — DELETE */}
                        <button
                            className="decline"
                            onClick={() => setShowDeleteConfirm(true)}
                        >
                            <X />
                        </button>
                    </>
                ) : (
                    <>
                        {/* OTHER ADMIN — MARK CORRECT */}
                        <button className="accept" onClick={() => handleReview("correct")}>
                            <Check />
                        </button>

                        {/* OTHER ADMIN — MARK INCORRECT */}
                        <button
                            className="decline"
                            onClick={() => handleReview("incorrect")}
                        >
                            <X />
                        </button>
                    </>
                )}
            </div>
            {data.type === "sell" && (
                <div
                    className="card-arrow"
                    onClick={() => setOpenSell(openSell === data._id ? null : data._id)}
                >
                    <ChevronDown />
                </div>
            )}
            {showModal && (
                <Modal
                    data={data}
                    purchases={relatedPurchases}
                    onClose={() => setShowModal(false)}
                    onAddPayment={handleAddPayment}
                    formatAmount={formatAmount}
                />
            )}
            {showDeleteConfirm && (
                <DeleteConfirm
                    onYes={handleDelete}
                    onNo={() => setShowDeleteConfirm(false)}
                />
            )}
            {loading &&
                <Loader />
            }
            {showDetailsModal && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <div className="modal-item top-border">
                            <h3>Details</h3>
                            {data.profitOrLoss ?
                                <>
                                    {data.profitType === "profit" ?
                                        (<span className={`${data.profitType}`}>₹{formatAmount(Number(data.profitOrLoss))} <TrendingUp /></span>)
                                        :
                                        (<span className={`${data.profitType}`}>₹{formatAmount(Number(data.profitOrLoss))} <TrendingDown /></span>)
                                    }

                                </>
                                : ""}
                        </div>
                        {data.type &&
                            <div className="modal-item">
                                <b>Type:</b>
                                <span>{data.type}</span>
                            </div>
                        }
                        {data.name &&
                            <div className="modal-item">
                                <b>Name:</b>
                                <span>{data.name}</span>
                            </div>
                        }
                        {data.company &&
                            <div className="modal-item">
                                <b>Company:</b>
                                <span>{data.company}</span>
                            </div>
                        }
                        {data.note &&
                            <div className="modal-item">
                                <b>Note:</b>
                                <span>{data.note}</span>
                            </div>
                        }
                        {data.phone &&
                            <div className="modal-item">
                                <b>Phone No.:</b>
                                <span>{data.phone}</span>
                            </div>
                        }
                        {data.address &&
                            <div className="modal-item">
                                <b>Address:</b>
                                <span>{data.address}</span>
                            </div>
                        }
                        {data.gstIncluded &&
                            <div className="modal-item">
                                <b>GST :</b>
                                <span>{data.gstIncluded}</span>
                            </div>
                        }
                        {data.deliveryCharge ?
                            <div className="modal-item">
                                <b>Delivery Charge :</b>
                                <span>{data.deliveryCharge}</span>
                            </div>
                            : ""}
                        {data.totalAmount &&
                            <div className="modal-item">
                                <b>Amount:</b>
                                <span>₹{formatAmount(Number(data.totalAmount))}</span>
                            </div>
                        }
                        {data.advance ?
                            <div className="modal-item">
                                <b>Advance:</b>
                                <span>₹{formatAmount(Number(data.advance))}</span>
                            </div>
                            : ""}
                        {data.restMoney ?
                            <div className="modal-item">
                                <b>Rest Money:</b>
                                <span>₹{formatAmount(Number(data.restMoney))}</span>
                            </div>
                            : ""}
                        {data.createdAt &&
                            <div className="modal-item">
                                <b>Date:</b>
                                <span>{formatDate(data.createdAt)}</span>
                            </div>
                        }
                        {data.orderId &&
                            <div className="modal-item">
                                <b>Order Id:</b>
                                <span>{data.orderId}</span>
                            </div>
                        }
                        <button className="close" onClick={() => setShowDetailsModal(false)}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Card;

const DeleteConfirm = ({ onYes, onNo }) => (
    <div className="modal-overlay">
        <div className="modal-box">
            <p>Are you sure you want to delete this entry?</p>
            <div className="btn-row">
                <button className="add" onClick={onYes}>
                    Yes
                </button>
                <button className="close" onClick={onNo}>
                    No
                </button>
            </div>
        </div>
    </div>
);
