import './LogIn.css';
import { GiOpenBook } from "react-icons/gi";
import { FcGoogle } from "react-icons/fc";
import { IoLogoApple } from "react-icons/io5";
import microsoft from "../../assets/Logos/microsoft.svg";
import { useState } from "react";
import { MdErrorOutline } from "react-icons/md";
import { useAuth } from '../../routes/AuthContext'; 
import { useNavigate } from "react-router-dom";


const dummyUsers = [
    { email: "jad@gmail.com", password: "password123", name: "Jad" },
    { email: "noor@egmail.com", password: "adminpass", name: "Noor" },
    { email: "elizabith@gmail.com", password: "password123", name: "Elizabith" },
  ];


const LogIn = ({ onClose }) => {
  
    const { login } = useAuth();

    const routeNavigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [prevFailedLogin, setPrevFailedLogin] = useState(false);
   
    const handleLogin = () => {
        const foundUser = dummyUsers.find(
          (user) => user.email === email && user.password === password
        );
        if (foundUser) {
          setLoggedIn(true);
          login(foundUser.name); // Call the login function from AuthContext
          routeNavigate('/'); 
        } else {
            setPrevFailedLogin(true);
        }
      };


    return (
    <div className="overlay-backdrop" onClick={onClose}>
  <div className="overlay-content" onClick={(e) => e.stopPropagation()}>

    {/* Full-width blue header */}
    <div className="login-overlay-header-container">
      <div className="login-overlay-logo-container">
        <GiOpenBook className="login-overlay-icon-skyViewLogo" />
        <p className='login-overlay-skyView-text'>SkyView Library</p>
      </div>
      <button className="login-overlay-header-close-button" onClick={onClose}>X</button>
    </div>

    {/* Content with padding */}
    <div className="login-overlay-body">
      <div className="login-overlay-title-welcome-information-container">
        <p className="welcome-heading">Welcome!</p>
        <p className="welcome-subtext">Log in to the Skyview Public Library to experience the wonder of reading!</p>
      </div>

      <div className="login-overlay-login-credentials-container">
        
        {prevFailedLogin && 
        <div className='login-overlay-login-credentials-container-failed-login-container'>
            <MdErrorOutline className="login-overlay-login-credentials-error-icon"/>
            <p className="login-overlay-login-credentials-failed-login-text">Invalid email or password</p>
        </div>}


        <input type="text" 
        className='login-overlay-login-credentials-email-input'
        placeholder="Email address*" value={email} onChange={(e) => setEmail(e.target.value)} 
        />
        
        <input type="password" 
        className='login-overlay-login-credentials-password-input' 
        placeholder="Password*" value={password}  onChange={(e) => setPassword(e.target.value)} 
        />
        <p className="login-overlay-login-credentials-container-forgot-password">Forgot Password?</p>
        <button className="login-overlay-login-credentials-conainer-sign-in-button" onClick={handleLogin}>Sign In</button>
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

        <div className="login-overlay-alternative-login-alternatives-container-create-account">
          <p>Don’t have an account? <strong style={{ color: '#635DFF' }}>Register now!</strong></p>
        </div>
      </div>
    </div>

  </div>
</div>

  );
};

export default LogIn;
