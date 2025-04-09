import React, { useState } from "react";
import {
  Button,
  IconButton,
  Input,
  Modal,
  Space,
} from "../../components/general";
import { Alert, Snackbar } from "@mui/material";
import "./Registration.css";
import accountManager from "../../utils/AccountManager";
import { useNavigate, useLocation, Link } from "react-router-dom";

const Login = () => {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state?.backgroundLocation;
  const [snackbar, setSnackbar] = useState({
	open: false,
	message: "",
	severity: "success",
  });

  const handleLogin = () => {
    const res = accountManager.auth(emailAddress, password);

	if (res.status === 200) {
		if (background) {
			navigate(background.pathname, { replace: true });
		} else {
			navigate("/", { replace: true });
		}
	} else {
		setSnackbar({
			open: true,
			message: "Login failed. Please check your credentials.",
			severity: "error",
		});
	}
  };

  return (
	<div className="login-signup-modal-container">
	<div className="login-signup-modal">
    <Modal borderRadius={10} show={false}>
      <div className="content">
        <h1>Welcome</h1>
        <p>
          Login with the Sky View Public Library to experience the wonder of
          reading.
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
        <Button
          size="l"
          borderRadius={4}
          onClick={() => handleLogin()}
          fullWidth
        >
          Log In
        </Button>
        <Space />
        <p>
  		Don't have an account?{" "}
  		<Link to="/signup" state={{ backgroundLocation: background }}>
    		Sign Up
  		</Link>
		</p>
        <p id="seperator">OR</p>
        <Space space={20} />
        <IconButton
          text={"Continue with Google"}
          icon={
            <img
              src="https://images.icon-icons.com/2631/PNG/512/google_search_new_logo_icon_159150.png"
              width={20}
              alt="Google Logo"
            />
          }
          size="l"
          borderRadius={4}
          style={{ textAlign: "left", border: "1px solid #808080" }}
          fullWidth
        />
        <Space space={20} />
        <IconButton
          text={"Continue with Microsoft Account"}
          icon={
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/9/98/Microsoft_logo.jpg"
              width={20}
              alt="Microsoft Logo"
            />
          }
          size="l"
          borderRadius={4}
          style={{ textAlign: "left", border: "1px solid #808080" }}
          fullWidth
        />
        <Space space={20} />
        <IconButton
          text={"Continue with Apple"}
          icon={
            <img
              src="https://images.icon-icons.com/877/PNG/512/apple-big-logo_icon-icons.com_68450.png"
              width={20}
              alt="Apple Logo"
            />
          }
          size="l"
          borderRadius={4}
          style={{ textAlign: "left", border: "1px solid #808080" }}
          fullWidth
        />
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

export default Login;
