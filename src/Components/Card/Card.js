import React, { useState } from "react";
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

const Card = ({ data, openSell, setOpenSell, purchases, loggedInUserId }) => {
  const navigate = useNavigate();
  const [swipe, setSwipe] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const isOwner = String(loggedInUserId) === String(data.createdBy);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

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
  const handleAddPayment = async (amount, data) => {
    console.log(amount, data, "daaaa");
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
        console.log(out, "out");
        window.location.reload();
      } else {
        alert("Failed to add money");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`${Host}/entry/delete/${data._id}`, {
        method: "DELETE",
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      });

      const out = await res.json();
      if (out.success) {
        window.location.reload();
      } else {
        alert("Delete failed");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleReview = async (status) => {
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
        window.location.reload();
      } else {
        alert("Failed to update review");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="entry-card-wrapper">
      <div
        className="entry-card"
        style={{ transform: `translateX(${swipe}px)` }}
        onTouchMove={handleTouch}
      >
        <div className="card-top">
          <div className="card-left">
            <h4>
              {data.name} <span>({data.company})</span>{" "}
            </h4>
            <p>
              {data.type} Entry on {formatDate(data.createdAt)}
            </p>
          </div>
          <div className="card-right">
            {data.type === "restMoney" ? (
              <p>₹{data?.restMoney}</p>
            ) : (
              <p>₹{data.totalAmount}</p>
            )}
            {data.type === "sell" && <p>₹{data.advance}</p>}
          </div>
        </div>
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
                        ₹{difference} <TrendingUp />
                      </p>
                    ) : (
                      <p className="loss">
                        ₹{difference} <TrendingDown />
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
                    <p>₹{remaining}</p>
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
        />
      )}
      {showDeleteConfirm && (
        <DeleteConfirm
          onYes={handleDelete}
          onNo={() => setShowDeleteConfirm(false)}
        />
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
        <button  className="add" onClick={onYes}>
          Yes
        </button>
        <button className="close" onClick={onNo}>
          No
        </button>
      </div>
    </div>
  </div>
);
