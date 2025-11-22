import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Host from "../../Host";
import logo from "../../Assets/logo08.png"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    setError("");

    if (!email || !password) {
      setError("Please fill both fields");
      return;
    }

    try {
      const res = await fetch(`${Host}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.error || "Invalid login details");
        return;
      }

      // Save token
      localStorage.setItem("token", data.authToken);

      navigate("/pin");
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img src={logo} alt="" />
        <h2>Admin Login</h2>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <p onClick={() => navigate("/forgot-password")}>Forget Password</p>

        {error && <p className="error">{error}</p>}

        <button onClick={handleSubmit}>Login</button>
      </div>
    </div>
  );
};

export default Login;
