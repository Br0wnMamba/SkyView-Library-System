import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import "./DropdownFilterSection.css";

const DropdownFilterSection = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="filter-dropdown-section">
      <div className="filter-dropdown-header" onClick={() => setIsOpen(!isOpen)}>
        <h3>{title}</h3>
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </div>
      <div className={`filter-dropdown-content ${isOpen ? "open" : "collapsed"}`}>
        {children}
    </div>
    </div>
  );
};

export default DropdownFilterSection;
