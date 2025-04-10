import './LogIn.css';
import { GiOpenBook } from "react-icons/gi";

import { FcGoogle } from "react-icons/fc";
import { IoLogoApple } from "react-icons/io5";
import  microsoft from "../../assets/Logos/microsoft.svg";

const LogIn = ({ onClose }) => {
  return (
    <div className="overlay-backdrop" onClick={onClose}>
        <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
    
            <div className="login-overlay-header-container">
                <button className="login-overlay-header-close-button" onClick={onClose}>X</button>
            </div>

            <div className="login-overlay-logo-container">
                <GiOpenBook className="login-overlay-icon-skyViewLogo" />
                <p><strong>SkyView Library</strong></p>
            </div>

            <div className="login-overlay-title-welcome-information-container">
                <p className="welcome-heading">Welcome!</p>
                <p className="welcome-subtext">Log in to the Skyview Public Library to experience the wonder of reading!</p>
            </div>

            <div className="login-overlay-login-credentials-container">
                <input type="text" placeholder="Email address*" />
                <input type="password" placeholder="Password*" />
                <p className="login-overlay-login-credentials-container-forgot-password">Forgot Password?</p>
                <button className="login-overlay-login-credentials-conainer-sign-in-button">Sign In</button>
            </div>

    <div className="login-overlay-alternative-login-alternatives-bridge-container">
      <hr /><span>OR</span><hr />
    </div>

    <div className="login-overlay-alternative-login-alternatives-container">
      <div className="login-option-button">
        <FcGoogle />
        <span>Sign in with Google</span>
      </div>
      <div className="login-option-button">
        <img src={microsoft} alt="Microsoft logo" width={18} height={18} />
        <span>Sign in with Microsoft</span>
      </div>
      <div className="login-option-button">
        <IoLogoApple />
        <span>Sign in with Apple</span>
      </div>
    </div>

    <div className="login-overlay-alternative-login-alternatives-container-create-account">
      <p>Don’t have an account? <strong style={{ color: '#635DFF' }}>Register now!</strong></p>
    </div>

  </div>
</div>

  );
};

export default LogIn;
