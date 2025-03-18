import React from "react";
import { Link } from "react-router-dom";
import "./ForgotPassword.scss"; // Import styles

const ForgotPassword = () => {
  return (
    <div className="forgot-password-container">
      <div className="forgot-password-card">
        <h2 className="forgot-password-title">We will make it together!</h2>
        <p className="forgot-password-text">
          Please contact us at <strong>itIsYourOwnProblem@goodLuck.com</strong>
        </p>

        {/* Register Link */}
        <p className="register-link">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
