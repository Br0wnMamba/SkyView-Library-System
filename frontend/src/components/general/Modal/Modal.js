import React from "react";
import "./Modal.css";

const Modal = ({ children, show, width, height, borderRadius, style }) => {
  const modalStyles = {
    ...(style || {}),
    ...(width && { width }),
    ...(height && { height }),
    ...(borderRadius && { borderRadius }),
  };

  return (
    <div className={`modal ${!show} ? "hidden" : ""`} style={modalStyles}>
      {children}
    </div>
  );
};

export default Modal;
