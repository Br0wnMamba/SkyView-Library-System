import { createContext, useContext, useState } from 'react';

// Create the AuthContext
const AuthContext = createContext();

// Auth Provider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState(null);

  const login = (email) => {
    setIsAuthenticated(true);
    setUserEmail(email);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserEmail(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook for accessing auth state
export const useAuth = () => useContext(AuthContext);
