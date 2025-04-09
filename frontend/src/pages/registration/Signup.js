import React, { useState } from "react";
import {
  Button,
  Input,
  Modal,
  Space,
} from "../../components/general";
import { Alert, Snackbar } from "@mui/material";
import "./Registration.css";
import accountManager from "../../utils/AccountManager";
import { useNavigate, useLocation, Link } from "react-router-dom";

const Signup = () => {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state?.backgroundLocation;
  const [snackbar, setSnackbar] = useState({
	open: false,
	message: "",
	severity: "success",
  });

  const handleSignUp = () => {
    const res = accountManager.addAccount(emailAddress, password, cardNumber);

    if (res.status === 200) {
      if (background) {
        navigate(background.pathname, { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } else {
      setSnackbar({
        open: true,
        message: res.message,
        severity: "error",
      });
    }
  };

  return (
    <div className="login-signup-modal-container">
	<div className="login-signup-modal">
    <Modal borderRadius={10}>
      <div className="content">
        <h1>Create Your Account</h1>
        <p>
          Sign up today and start exploring our collection of books, resources,
          and more.
        </p>
        <Input
          type="email"
          placeholder="Email address"
          value={emailAddress}
          onChange={(value) => {
            setEmailAddress(value);
          }}
          fullWidth
        />
        <Space />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(value) => {
            setPassword(value);
          }}
          fullWidth
        />
        <Space />
        <Input
          type="number"
          placeholder="Library Card Number"
          value={cardNumber}
          onChange={(value) => {
            setCardNumber(value);
          }}
          fullWidth
        />
        <Space />
        <Button
          size="l"
          borderRadius={4}
          onClick={() => handleSignUp()}
          fullWidth
        >
          Sign Up
        </Button>
        <Space />
        <p>
          Already have an account? {" "}
		  <Link to="/login" state={{ backgroundLocation: background }}>
		  	Log In
	      </Link>
        </p>
      </div>
    </Modal>
      <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
          </Alert>
      </Snackbar>
    </div>
	</div>
  );
};

export default Signup;
