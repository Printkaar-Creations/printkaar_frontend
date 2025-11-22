import React, { useContext, useEffect, useState } from "react";
import "./PinScreen.css";
import { useNavigate } from "react-router-dom";
import { Delete, X } from "lucide-react";
import Host from "../../Host";
import NoteContext from "../../Context/AppContext";

const PinScreen = () => {
  const { adminDetail, getAccountDetails } = useContext(NoteContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      getAccountDetails();
    }
  }, [navigate]);
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);

  // MODALS
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showResetPinModal, setShowResetPinModal] = useState(false);

  // INPUTS
  const [password, setPassword] = useState("");
  const [newPin, setNewPin] = useState("");

  const handleDigit = (digit) => {
    if (pin.length < 6) {
      const newPinValue = pin + digit;
      setPin(newPinValue);
      setError("");

      if (newPinValue.length === 6) {
        verifyPin(newPinValue);
      }
    }
  };

  const handleDelete = () => {
    setPin(pin.slice(0, -1));
  };

  // --------------------------------------------------
  // VERIFY PIN
  // --------------------------------------------------
  const verifyPin = async (value) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${Host}/auth/verify-pin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({ pin: value }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("pinVerified", "true");
        navigate("/");
      } else {
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);
        setError("Incorrect PIN");
        setPin("");

        if (newAttempts >= 3) {
          setShowPasswordModal(true);
        }
      }
    } catch (err) {
      setError("Server error");
      setPin("");
    }
  };

  // --------------------------------------------------
  // STEP 1: VERIFY PASSWORD
  // --------------------------------------------------
  const handleVerifyPassword = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${Host}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: adminDetail.email,
          password: password,
        }),
      });

      const data = await res.json();

      if (data.success) {
        // Password correct → open reset PIN modal
        setShowPasswordModal(false);
        setShowResetPinModal(true);
      } else {
        setError("Incorrect password");
      }
    } catch (err) {
      console.error(err);
      setError("Server error");
    }
  };

  // --------------------------------------------------
  // STEP 2: RESET NEW PIN
  // --------------------------------------------------
  const handleResetPin = async () => {
    if (newPin.length !== 6) {
      setError("PIN must be 6 digits");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${Host}/auth/set-pin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({ pin: newPin }),
      });

      const data = await res.json();

      if (data.success) {
        setShowResetPinModal(false);
        setAttempts(0);
        setError("");
        alert("PIN updated successfully!");
      } else {
        setError("Failed to update PIN");
      }
    } catch (err) {
      console.error(err);
      setError("Server error");
    }
  };

  return (
    <div className="pin-container">
      <div className="pin-box">
        <h2>Enter PIN</h2>
        <p className="pin-sub">Use your 6-digit security PIN</p>

        <div className="pin-dots">
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={i}
              className={`pin-dot ${pin.length > i ? "filled" : ""}`}
            ></span>
          ))}
        </div>

        {error && <p className="pin-error">{error}</p>}

        <div className="pin-keypad">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              className="pin-btn"
              onClick={() => handleDigit(num)}
            >
              {num}
            </button>
          ))}

          <div className="pin-btn empty"></div>

          <button className="pin-btn" onClick={() => handleDigit(0)}>
            0
          </button>

          <button className="pin-btn" onClick={handleDelete}>
            <Delete size={22} />
          </button>
        </div>
      </div>

      {/* --------------------------------------------------
          PASSWORD VERIFY MODAL
      -------------------------------------------------- */}
      {showPasswordModal && (
        <div className="pin-modal-overlay">
          <div className="pin-modal">
            <div className="modal-header">
              <h3>Enter Password</h3>
              <X
                className="close-btn"
                onClick={() => setShowPasswordModal(false)}
              />
            </div>

            <p>To reset your PIN, first enter your account password</p>

            <input
              type="password"
              className="new-pin-input"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p
              className="forgot-pin-text"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot Password?
            </p>

            <button className="save-pin-btn" onClick={handleVerifyPassword}>
              Verify Password
            </button>
          </div>
        </div>
      )}

      {/* --------------------------------------------------
          RESET PIN MODAL
      -------------------------------------------------- */}
      {showResetPinModal && (
        <div className="pin-modal-overlay">
          <div className="pin-modal">
            <div className="modal-header">
              <h3>Reset PIN</h3>
              <X
                className="close-btn"
                onClick={() => setShowResetPinModal(false)}
              />
            </div>

            <p>Enter new 6-digit PIN</p>

            <input
              type="number"
              maxLength="6"
              className="new-pin-input"
              value={newPin}
              onChange={(e) => setNewPin(e.target.value.slice(0, 6))}
            />

            <button className="save-pin-btn" onClick={handleResetPin}>
              Update PIN
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PinScreen;
