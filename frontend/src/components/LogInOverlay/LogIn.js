// components/LoginOverlay.jsx
import './LogIn.css';

const LogIn = ({ onClose }) => {
  return (
    <div className="overlay-backdrop" onClick={onClose}>
      <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
        <h2>Login</h2>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button>Login</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default LogIn;
