import React, { useState } from "react";
import {
  Button,
  IconButton,
  Input,
  Space,
} from "../../general";
import { IoBookOutline } from 'react-icons/io5';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import "./RegisterOverlay.css";
import accountManager from "../../../utils/AccountManager";
import GoogleOAuthRegister from "../../OAuthComponents/Google/GoogleOAuthRegister";
import MicrosoftOAuthRegister from "../../OAuthComponents/Microsoft/MicrosoftOAuthRegister";

const RegisterOverlay = ({ onClose, setOverlayView, setSnackbar }) => {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [cardNumber, setCardNumber] = useState("");

  const handleSignUp = () => {
    if (!accountManager.getAllLibraryMembers()[cardNumber]) {
      accountManager.addLibraryMember(cardNumber, {
        firstName: "New",
        lastName: "User",
      });
    }
  
    const result = accountManager.addAccount(emailAddress, password, cardNumber);
  
    if (result?.status === 200) {
      setSnackbar({ open: true, message: "Registration successful!", severity: "success" });
      setOverlayView("login");
    } else {
      setSnackbar({ open: true, message: result?.message || "Registration failed.", severity: "error" });
    }
  };

  return (
    <div className="registerSidebarContainer">
      <div style={{ display: "flex", justifyContent: "flex-start" }}>
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "0px"
          }}
        >
          <ClearOutlinedIcon style={{ color: "#092833" }} />
        </button>
      </div>
      <div className="registerSidebarHeaderLarge">
        <IoBookOutline className="registerSidebarPictureLarge" />
        <h4 className="registerSidebarSubtitle">Skyview Library</h4>
        <h2 className="registerSidebarWelcome">Welcome!</h2>
        <p className="registerSidebarDescription">
        Sign up today and start exploring our collection of books, resources,
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
        <Input
          type="text"
          placeholder="Library Card Number"
          value={cardNumber}
          onChange={(value) => setCardNumber(value)}
          fullWidth
        />
        <Space />
        <Button
          size="l"
          borderRadius={4}
          onClick={handleSignUp}
          fullWidth
        >
          Register
        </Button>
        <Space />
        <p>
          Already have an account?{" "}
          <a href="#" onClick={() => setOverlayView("login")}>Log In</a>
        </p>
        <p id="seperator">OR</p>
        <Space space={5} />
        <GoogleOAuthRegister onClose={onClose} setSnackbar={setSnackbar} />
        <Space space={10} />
        <MicrosoftOAuthRegister onClose={onClose} setSnackbar={setSnackbar} />
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
            padding: "8px 12px"
          }}
          fullWidth
        />
    </div>
  );
};

export default RegisterOverlay;
