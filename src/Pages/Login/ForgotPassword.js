import React, { useState } from "react";
import "./ForgotPassword.css";
import { useNavigate } from "react-router-dom";
import Host from "../../Host";

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // 1 = email, 2 = otp+new password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSendOtp = async () => {
    setError("");
    setMessage("");

    if (!email) {
      setError("Enter your email");
      return;
    }

    try {
      const res = await fetch(`${Host}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.success) {
        setMessage("OTP sent to your email");
        setStep(2);
      } else {
        setError(data.error || "Failed to send OTP");
      }
    } catch (err) {
      console.error(err);
      setError("Server error");
    }
  };

  const handleResetPassword = async () => {
    setError("");
    setMessage("");

    if (!otp || !newPassword) {
      setError("Enter OTP and new password");
      return;
    }

    try {
      const res = await fetch(`${Host}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword }),
      });

      const data = await res.json();

      if (data.success) {
        setMessage("Password reset successfully. Please login.");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setError(data.error || "Failed to reset password");
      }
    } catch (err) {
      console.error(err);
      setError("Server error");
    }
  };

  return (
    <div className="fp-container">
      <div className="fp-box">
        {step === 1 && (
          <>
            <h2>Forgot Password</h2>
            <p>Enter your email to receive an OTP</p>

            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {error && <p className="fp-error">{error}</p>}
            {message && <p className="fp-message">{message}</p>}

            <button onClick={handleSendOtp}>Send OTP</button>
          </>
        )}

        {step === 2 && (
          <>
            <h2>Reset Password</h2>
            <p>Enter OTP sent to your email and new password</p>

            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <input
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            {error && <p className="fp-error">{error}</p>}
            {message && <p className="fp-message">{message}</p>}

            <button onClick={handleResetPassword}>Reset Password</button>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;