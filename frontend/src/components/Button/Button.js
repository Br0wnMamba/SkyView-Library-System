import React from "react";
import "./Button.css";

const Button = ({ text, onClick, textColor, backgroundColor, borderRadius, padding, fontSize }) => {
	return (
		<button className="button" onClick={onClick} style={{
			color: textColor || "white",
			backgroundColor: backgroundColor || "#092833",
			borderRadius: borderRadius || "5px",
			padding: padding || "10px 20px",
			border: "none",
			fontSize: fontSize || "16px"
		}}>
			{text}
		</button>
	);
}

export default Button;
