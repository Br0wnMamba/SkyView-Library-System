import React, { useState } from "react";
import { Button, Input, Modal, Space } from "../../components/general";
import { Alert, Snackbar } from "@mui/material";
import "./Registration.css";
import accountManager from "../../utils/AccountManager";
import { useNavigate, useLocation, Link } from "react-router-dom";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import GoogleOAuthRegister from "../../components/OAuthComponents/Google/GoogleOAuthRegister";
import MicrosoftOAuthRegister from "../../components/OAuthComponents/Microsoft/MicrosoftOAuthRegister";
import { IoBookOutline } from "react-icons/io5";
import { IconButton } from "../../components/general";
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

  const handleClose = () => {
    const res = accountManager.auth(emailAddress, password);
    if (res.status === 200) {
      navigate(background.pathname, { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  };

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
          <div style={{ position: "absolute", top: "20px", left: "20px" }}>
            <button
              onClick={handleClose}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "0px",
              }}
            >
              <ClearOutlinedIcon style={{ color: "#092833" }} />
            </button>
          </div>
          <div className="content">
            <div className="registerSidebarHeaderLarge">
              <IoBookOutline className="registerSidebarPictureLarge" />
              <h4 className="registerSidebarSubtitle">Skyview Library</h4>
              <h2 className="registerSidebarWelcome">Welcome!</h2>
              <p className="registerSidebarDescription">
                Sign up today and start exploring our collection of books,
                resources, and more.
              </p>
            </div>
            <Input
              type="email"
              placeholder="Email address"
              value={emailAddress}
              onChange={(value) => setEmailAddress(value)}
              fullWidth
            />
            <Space />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(value) => setPassword(value)}
              fullWidth
            />
            <Space />
            <Input
              type="text"
              placeholder="Library Card Number"
              value={cardNumber}
              onChange={(value) => setCardNumber(value)}
              fullWidth
            />
            <Space />
            <Button size="l" borderRadius={4} onClick={handleSignUp} fullWidth>
              Register
            </Button>
            <Space />
            <p>
              Already have an account?{" "}
              <Link
                to="/login"
                state={{ backgroundLocation: location }}
                style={{ color: "#1a73e8", textDecoration: "none" }}
              >
                Log in!
              </Link>
            </p>
            <p id="seperator">OR</p>
            <Space space={5} />
            <GoogleOAuthRegister
              onClose={handleClose}
              setSnackbar={setSnackbar}
            />
            <Space space={10} />
            <MicrosoftOAuthRegister
              onClose={handleClose}
              setSnackbar={setSnackbar}
            />
            <Space space={10} />
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
              style={{
                border: "1px solid #808080",
                justifyContent: "center",
                fontSize: "14px",
                padding: "8px 12px",
              }}
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

export default Signup;
