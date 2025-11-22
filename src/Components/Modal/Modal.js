import React, { useEffect, useState } from "react";
import "./Modal.css";
import { useNavigate } from "react-router-dom";
import Host from "../../Host";

const Modal = ({ data, purchases, onClose, onAddPayment }) => {
  const navigate = useNavigate();
  const [restMoney, setRestMoney] = useState();
  const purchaseTotal = purchases.reduce(
    (sum, p) => sum + Number(p.totalAmount || 0),
    0
  );

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      const getAllEntries = async () => {
        const response = await fetch(`${Host}/entry/restmoney/${data._id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        });
        const json = await response.json();
        // console.log(json, "json");
        setRestMoney(json);
      };
      getAllEntries();
    }
  }, [navigate]);

//   console.log(restMoney, "restMoney");

  const remaining =
    Number(data.totalAmount) - Number(data.advance) - Number(data.restMoney);
//   console.log(data, "data");

  const [payAmount, setPayAmount] = useState("");

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>Payment Details</h3>

        <div className="modal-item">
          <p>Total Amount:</p>
          <span>₹{data.totalAmount}</span>
        </div>

        <div className="modal-item">
          <p>Advance Received:</p>
          <span>₹{data.advance}</span>
        </div>

        <div className="modal-item">
          <p>Total Purchase Amount:</p>
          <span>₹{purchaseTotal}</span>
        </div>

        <div className="modal-item">
          <p>Remaining Amount:</p>
          <span>₹{remaining}</span>
        </div>

        <input
          type="number"
          className="input-field"
          placeholder="Enter amount to add"
          value={payAmount}
          onChange={(e) => setPayAmount(e.target.value)}
        />

        <button
          className="add"
          onClick={() => onAddPayment(Number(payAmount), data)}
        >
          Add Payment
        </button>

        <button className="close" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
