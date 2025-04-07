import React, { useEffect } from "react";
import { PublicClientApplication } from "@azure/msal-browser";
import { IconButton } from "../../general";
import accountManager from "../../../utils/AccountManager";

const msalConfig = {
  auth: {
    clientId: "60781148-5a1f-4912-bf50-564a8f403337",
    redirectUri: "http://localhost:3000",
  },
};

const msalInstance = new PublicClientApplication(msalConfig);

const MicrosoftOAuthLogin = ({ onClose, setSnackbar }) => {
  useEffect(() => {
    const initializeMsal = async () => {
      try {
        await msalInstance.initialize();
      } catch (err) {
        console.error("Failed to initialize MSAL:", err);
      }
    };

    initializeMsal();
  }, []);

  const handleLogin = async () => {
    try {
      const loginResponse = await msalInstance.loginPopup({
        scopes: ["user.read"],
        prompt: "select_account",
      });

      const email = loginResponse.account.username;

      if (!email) {
        setSnackbar({
          open: true,
          message: "Microsoft login failed — email not found.",
          severity: "error",
        });
        return;
      }

      if (!accountManager.hasAccount(email)) {
        setSnackbar({
          open: true,
          message: `No account exists for this Microsoft email. ${email}`,
          severity: "error",
        });
        return;
      }

      const password = accountManager.getPasswordByEmail(email);
      const result = accountManager.auth(email, password);

      if (result.status === 200) {
        setSnackbar({
          open: true,
          message: "Login successful with Microsoft!",
          severity: "success",
        });
        onClose();
      } else {
        setSnackbar({
          open: true,
          message: "Login failed — unable to authenticate.",
          severity: "error",
        });
      }
    } catch (err) {
      console.error("Microsoft login error:", err);
      setSnackbar({
        open: true,
        message: "An error occurred during Microsoft login.",
        severity: "error",
      });
    }
  };

  return (
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
      style={{
        border: "1px solid #808080",
        justifyContent: "center",
        fontSize: "14px",
        padding: "8px 12px",
      }}
      onClick={handleLogin}
      fullWidth
    />
  );
};

export default MicrosoftOAuthLogin;