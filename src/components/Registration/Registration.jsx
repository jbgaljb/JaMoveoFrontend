import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios
import "./Registration.scss";

const Registration = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [instrument, setInstrument] = useState("");
  const [error, setError] = useState(""); // Handle errors
  const navigate = useNavigate(); // Initialize navigation function

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset any previous errors

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/users/register/", {
        username,
        password,
        instrument,
      });

      console.log("Registration successful:", response.data);
      
      // Store token for future authentication
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);
      
      // Redirect to login page after success
      navigate("/login");
    } catch (err) {
      console.error("Registration failed:", err.response?.data);
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="registration-container">
      <div className="registration-card">
        <h2 className="registration-title">Registration</h2>
        <p className="registration-description">Create an account to get started</p>

        {error && <p className="error-message">{error}</p>} {/* Display error message */}

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
          <div className="input-group">
            <label htmlFor="instrument">Instrument</label>
            <select
              id="instrument"
              value={instrument}
              onChange={(e) => setInstrument(e.target.value)}
              required
            >
              <option value="">Select your instrument</option>
              <option value="guitar">Guitar</option>
              <option value="piano">Piano</option>
              <option value="drums">Drums</option>
              <option value="violin">Violin</option>
              <option value="bass">Bass</option>
              <option value="vocals">Vocals</option>
            </select>
          </div>

          {/* Sign-in Link to Login Page */}
          <p className="signin-link">
            Already signed up? <Link to="/login">Sign in!</Link>
          </p>

          <button type="submit" className="submit-button">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Registration;
