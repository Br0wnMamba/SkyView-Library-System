import React from "react";
import "./Input.css";

const Input = ({
  className = "",
  type = "text",
  placeholder = "",
  disabled = false,
  fullWidth = false,
  value,
  onChange,
}) => {
  const inputStyle = {
    ...(fullWidth && { width: "100%" }),
  };

  return (
    <div>
      <input
        className={`${disabled ? "disabled" : ""} ${className}`}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={inputStyle}
      />
    </div>
  );
};

export default Input;
