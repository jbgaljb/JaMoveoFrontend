import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios
import "./Login.scss";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Handle login errors
  const navigate = useNavigate(); // Initialize navigate function

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/users/login/", {
        username,
        password,
      });

      console.log("Login response:", response.data); // ✅ Debugging output

      // Check if response has required data
      if (!response.data.access) {
        throw new Error("Authentication failed: No access token received");
      }

      // Store tokens and user details securely
      localStorage.setItem("accessToken", response.data.access);
      localStorage.setItem("refreshToken", response.data.refresh);

      // Decode user role from token or use provided role
      if (response.data.user) {
        localStorage.setItem("userRole", response.data.user.role);
        localStorage.setItem("username", response.data.user.username);
      } else {
        console.warn("No user object found in response.");
      }

      console.log("Stored role:", localStorage.getItem("userRole"));

      // ✅ Redirect to Main Page after successful login
      navigate("/main");

    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      setError(err.response?.data?.detail || "Invalid username or password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login Page</h2>
        <p className="login-description">Enter your credentials to access your account</p>

        {error && <p className="error-message">{error}</p>} {/* Show error if login fails */}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-button">Login</button>

          {/* Forgot Password Link */}
          <div className="forgot-password">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
