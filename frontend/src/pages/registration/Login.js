import React, { useState } from "react";
import {
  Button,
  IconButton,
  Input,
  Modal,
  Space,
} from "../../components/general";
import "./Registration.css";
import accountManager from "../../utils/AccountManager";

const Login = () => {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  console.log("Accounts: ", accountManager.accounts);
  console.log("Library members: ", accountManager.libraryMembers);

  const handleLogin = () => {
    console.log(accountManager.auth(emailAddress, password));
    console.log("User: ", accountManager.user);
    console.log("User: ", accountManager.getUser());
  };

  return (
    <Modal borderRadius={10}>
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
          Don't have an account? <a href="/signup">Sign Up</a>
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
  );
};

export default Login;
