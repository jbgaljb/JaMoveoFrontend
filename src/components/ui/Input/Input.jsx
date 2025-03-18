import React from "react";
import "./Input.scss";

const Input = ({ type = "text", placeholder, value, onChange }) => {
  return <input type={type} className="custom-input" placeholder={placeholder} value={value} onChange={onChange} />;
};

export default Input;
