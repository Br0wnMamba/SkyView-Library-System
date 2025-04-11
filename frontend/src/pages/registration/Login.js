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
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import GoogleOAuthLogin from "../../components/OAuthComponents/Google/GoogleOAuthLogin";
import MicrosoftOAuthLogin from "../../components/OAuthComponents/Microsoft/MicrosoftOAuthLogin";
import { IoBookOutline } from "react-icons/io5";
const Login = ({ backgroundLocation }) => {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state?.backgroundLocation || backgroundLocation;
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

  const handleLogin = () => {
    const res = accountManager.auth(emailAddress, password);

    if (res.status === 200) {
      if (background) {
        navigate(background.pathname, { replace: true });
      } else {
        navigate("/", { replace: true });
      }
      setSnackbar({
        open: true,
        message: "Login successful!",
        severity: "success",
      });
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
            <div className="loginSidebarHeaderLarge">
              <IoBookOutline className="loginSidebarPictureLarge" />
              <h4 className="loginSidebarSubtitle">Skyview Library</h4>
              <h2 className="loginSidebarWelcome">Welcome!</h2>
              <p className="loginSidebarDescription">
                Log in and start exploring our collection of books, resources,
                and more.
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
            <Button size="l" borderRadius={4} onClick={handleLogin} fullWidth>
              Log In
            </Button>
            <Space />
            <p>
              Don't have an account?{" "}
              <Link
                to="/signup"
                state={{ backgroundLocation: location }}
                style={{ color: "#1a73e8", textDecoration: "none" }}
              >
                Register Now!
              </Link>
            </p>
            <p id="seperator">OR</p>

            <Space space={5} />
            <GoogleOAuthLogin onClose={handleClose} setSnackbar={setSnackbar} />
            <Space space={10} />
            <MicrosoftOAuthLogin
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

export default Login;
