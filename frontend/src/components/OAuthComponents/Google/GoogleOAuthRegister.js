import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { IconButton } from "../../general";
import accountManager from "../../../utils/AccountManager";

const GoogleOAuthRegister = ({ onClose, setSnackbar }) => {
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const { access_token } = tokenResponse;

        const userInfo = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }).then(res => res.json());

        const email = userInfo?.email;

        if (!email) {
          setSnackbar({
            open: true,
            message: "Google login failed — email not found in user info.",
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

        // password placeholder
        const password = "GoogleOAuthUser";

        // next available card number
        const allAccounts = accountManager.getAllAccounts();
        const usedCardNumbers = Object.values(allAccounts).map(acc => acc.cardNumber);
        let newCardNumber = 100;

        while (usedCardNumbers.includes(newCardNumber)) {
          newCardNumber++;
        }

        if (!accountManager.getAllLibraryMembers()[newCardNumber]) {
          accountManager.addLibraryMember(newCardNumber, {
            firstName: "Google",
            lastName: "User",
          });
        }

        const result = accountManager.addAccount(email, password, newCardNumber);

        if (result.status === 200) {
          setSnackbar({
            open: true,
            message: "Google account registered successfully!",
            severity: "success",
          });
          onClose();
        } else {
          setSnackbar({
            open: true,
            message: result.message || "Google registration failed.",
            severity: "error",
          });
        }
      } catch (err) {
        console.error("Google OAuth register error:", err);
        setSnackbar({
          open: true,
          message: "An error occurred during Google registration.",
          severity: "error",
        });
      }
    },
    onError: () => {
      setSnackbar({
        open: true,
        message: "Google registration failed. Please try again.",
        severity: "error",
      });
    },
    flow: "implicit",
  });
  return (
    <IconButton
      text={"Register with Google"}
      icon={
        <img
          src="https://images.icon-icons.com/2631/PNG/512/google_search_new_logo_icon_159150.png"
          width={20}
          alt="Google Logo"
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
      onClick={() => login()}
      fullWidth
    />
  );
};
export default GoogleOAuthRegister;