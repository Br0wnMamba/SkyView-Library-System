import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './routes/App'; 
import { AuthProvider } from "./routes/AuthContext"; // Import the AuthProvider to wrap the App component

// Create a root DOM node for the React application using ReactDOM.createRoot.
// This is where the React component tree will be attached.
// 'document.getElementById('root')' gets the DOM element with the ID of 'root',
// which is typically a div in the public/index.html file of a React project.
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component within React's StrictMode.
// StrictMode is a tool for highlighting potential problems in an application.
// It does not render any visible UI but activates additional checks and warnings for its descendants.
// Here, <App /> is the root component that will be rendered inside the 'root' DOM node.
root.render(
  
  <AuthProvider>
    <App />
  </AuthProvider>
);