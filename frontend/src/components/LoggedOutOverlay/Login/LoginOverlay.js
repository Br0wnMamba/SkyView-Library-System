import React, { useState } from "react";
import { Button, IconButton, Input, Space } from "../../general";
import { IoBookOutline } from "react-icons/io5";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import "./LoginOverlay.css";
import accountManager from "../../../utils/AccountManager";
import GoogleOAuthLogin from "../../OAuthComponents/Google/GoogleOAuthLogin";
import MicrosoftOAuthLogin from "../../OAuthComponents/Microsoft/MicrosoftOAuthLogin";

const LoginOverlay = ({ onClose, setOverlayView, setSnackbar }) => {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const result = accountManager.auth(emailAddress, password);
    if (result.status === 200) {
      setSnackbar({
        open: true,
        message: "Login successful!",
        severity: "success",
      });
      onClose();
    } else {
      setSnackbar({
        open: true,
        message: "Login failed. Please check your credentials.",
        severity: "error",
      });
    }
  };

  return (
    <div className="loginSidebarContainer">
      <div style={{ display: "flex", justifyContent: "flex-start" }}>
        <button
          onClick={onClose}
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
      <div className="loginSidebarHeaderLarge">
        <IoBookOutline className="loginSidebarPictureLarge" />
        <h4 className="loginSidebarSubtitle">Skyview Library</h4>
        <h2 className="loginSidebarWelcome">Welcome!</h2>
        <p className="loginSidebarDescription">
          Log in and start exploring our collection of books, resources, and
          more.
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
        <a href="#" onClick={() => setOverlayView("register")}>
          Register Now!
        </a>
      </p>
      <p id="seperator">OR</p>

      <Space space={5} />
      <GoogleOAuthLogin onClose={onClose} setSnackbar={setSnackbar} />
      <Space space={10} />
      <MicrosoftOAuthLogin onClose={onClose} setSnackbar={setSnackbar} />
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
  );
};

export default LoginOverlay;
