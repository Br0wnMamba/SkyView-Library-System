import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { IconButton } from "../../general";
import accountManager from "../../../utils/AccountManager";

const GoogleOAuthLogin = ({ onClose, setSnackbar }) => {
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

        if (!accountManager.hasAccount(email)) {
          setSnackbar({
            open: true,
            message: `No account exists for this Google email. ${email}`,
            severity: "error",
          });
          return;
        }

        const password = accountManager.getPasswordByEmail(email);
        const result = accountManager.auth(email, password);

        if (result.status === 200) {
          setSnackbar({
            open: true,
            message: "Login successful with Google!",
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
        console.error("Google OAuth error:", err);
        setSnackbar({
          open: true,
          message: "An error occurred during Google login.",
          severity: "error",
        });
      }
    },
    onError: () => {
      setSnackbar({
        open: true,
        message: "Google login failed. Please try again.",
        severity: "error",
      });
    },
    flow: "implicit",
  });

  return (
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

export default GoogleOAuthLogin;