import React from "react";
import Button from "./Button";
import "./Button.css";

const IconButton = ({ icon, text, ...props }) => {
  return (
    <Button className="icon-button" style={{ textAlign: "left" }} {...props}>
      {React.cloneElement(icon, { className: "icon" })}
      <span>{text}</span>
    </Button>
  );
};

export default IconButton;
