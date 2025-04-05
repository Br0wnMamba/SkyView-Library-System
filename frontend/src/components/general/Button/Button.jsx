import React from "react";
import "./Button.css";

/**
 * Button Component
 *
 * Sizes:
 * s - small
 * m - medium (default)
 * l - large
 *
 * If both `fullWidth` and `width` are defined - `fullWidth` takes precedence
 *
 * Styles can be overwritten
 */

const Button = ({
  children,
  className = "",
  type = "button",
  size = "m",
  disabled = false,
  fullWidth = false,
  width,
  height,
  borderRadius,
  onClick,
  style,
}) => {
  const buttonSizes = {
    s: "sm",
    m: "md",
    l: "lg",
  };

  const buttonStyle = {
    ...(style || {}),
    ...(fullWidth ? { width: "100%" } : width && { width }),
    ...(height && { height }),
    ...(borderRadius && { borderRadius }),
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`button ${buttonSizes[size]} ${
        disabled ? "disabled" : ""
      } ${className}`}
      style={buttonStyle}
    >
      {children}
    </button>
  );
};

export default Button;
