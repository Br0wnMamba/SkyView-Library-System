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

const MicrosoftOAuthRegister = ({ onClose, setSnackbar }) => {
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

  const handleRegister = async () => {
    try {
      const loginResponse = await msalInstance.loginPopup({
        scopes: ["user.read"],
        prompt: "select_account",
      });

      const email = loginResponse.account.username;

      if (!email) {
        setSnackbar({
          open: true,
          message: "Microsoft registration failed — email not found.",
          severity: "error",
        });
        return;
      }

      if (accountManager.hasAccount(email)) {
        setSnackbar({
          open: true,
          message: `An account already exists for ${email}.`,
          severity: "warning",
        });
        return;
      }

      const allAccounts = accountManager.getAllAccounts();
      const usedCardNumbers = Object.values(allAccounts).map(acc => acc.cardNumber);
      let newCardNumber = 100;

      while (usedCardNumbers.includes(newCardNumber)) {
        newCardNumber++;
      }

      if (!accountManager.getAllLibraryMembers()[newCardNumber]) {
        accountManager.addLibraryMember(newCardNumber, {
          firstName: "Microsoft",
          lastName: "User",
        });
      }

      const password = "MicrosoftOAuthUser";
      const result = accountManager.addAccount(email, password, newCardNumber);

      if (result.status === 200) {
        setSnackbar({
          open: true,
          message: "Microsoft account registered successfully!",
          severity: "success",
        });
        onClose();
      } else {
        setSnackbar({
          open: true,
          message: result.message || "Microsoft registration failed.",
          severity: "error",
        });
      }
    } catch (err) {
      console.error("Microsoft registration error:", err);
      setSnackbar({
        open: true,
        message: "An error occurred during Microsoft registration.",
        severity: "error",
      });
    }
  };

  return (
    <IconButton
      text={"Register with Microsoft"}
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
      onClick={handleRegister}
      fullWidth
    />
  );
};

export default MicrosoftOAuthRegister;