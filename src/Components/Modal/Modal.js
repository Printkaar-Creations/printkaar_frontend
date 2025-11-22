import React, { useEffect, useState } from "react";
import "./Modal.css";
import { useNavigate } from "react-router-dom";
import Host from "../../Host";

const Modal = ({ data, purchases, onClose, onAddPayment }) => {
    const navigate = useNavigate();

    const [deliveryType, setDeliveryType] = useState("");
    const [deliveryAmount, setDeliveryAmount] = useState("");
    const [payAmount, setPayAmount] = useState("");

    const purchaseTotal = purchases.reduce(
        (sum, p) => sum + Number(p.totalAmount || 0),
        0
    );

    const remaining =
        Number(data.totalAmount) - Number(data.advance) - Number(data.restMoney);
    //   console.log(data, "data");

    const submitDeliveryCharge = async () => {
        if (!deliveryAmount || Number(deliveryAmount) <= 0) {
            alert("Enter valid delivery charge");
            return;
        }

        if (!deliveryType) {
            alert("Select who pays the delivery charge");
            return;
        }

        const token = localStorage.getItem("token");

        const res = await fetch(`${Host}/entry/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": token,
            },
            body: JSON.stringify({
                type: "delivery",
                linkedSellId: data._id,
                deliveryType,
                deliveryAmount: Number(deliveryAmount),
                totalAmount: Number(deliveryAmount), // REQUIRED
                name: data.name,
                company: data.company,
            }),
        });

        const json = await res.json();
        // console.log(json,"json")
        if (json.success) {
            alert("Delivery charge added!");
            setDeliveryAmount("");
            setDeliveryType("");
            onClose();
        } else {
            alert("Failed to add delivery charge");
        }
    };

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

                <div className="modal-item purchase">
                    <p>Total Purchase Amount:</p>
                    <span>₹{purchaseTotal}</span>
                </div>

                <div className="modal-item">
                    <p>Remaining Amount:</p>
                    <span>₹{remaining}</span>
                </div>
                {/* DELIVERY TYPE */}
                <div className="modal-item">
                    <p>Delivery Charge:</p>
                    <div className="box-inline">
                        <label>
                            <input
                                type="radio"
                                name="delivery"
                                value="customer"
                                checked={deliveryType === "customer"}
                                onChange={() => setDeliveryType("customer")}
                            />{" "}
                            By Customer
                        </label>

                        <label style={{ marginLeft: 12 }}>
                            <input
                                type="radio"
                                name="delivery"
                                value="own"
                                checked={deliveryType === "own"}
                                onChange={() => setDeliveryType("own")}
                            />{" "}
                            By Own
                        </label>
                    </div>
                </div>

                {/* DELIVERY AMOUNT */}
                {deliveryType && (
                    <div className="modal-item">
                        <input
                            type="number"
                            className="input-field"
                            placeholder="Delivery Amount"
                            value={deliveryAmount}
                            onChange={(e) => setDeliveryAmount(e.target.value)}
                        />
                    </div>
                )}
                <input
                    type="number"
                    className="input-field"
                    placeholder="Enter Amount"
                    value={payAmount}
                    onChange={(e) => setPayAmount(e.target.value)}
                />

                <button
                    className="add"
                    onClick={() => {
                        onAddPayment(Number(payAmount), data);
                        submitDeliveryCharge();
                    }}
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
