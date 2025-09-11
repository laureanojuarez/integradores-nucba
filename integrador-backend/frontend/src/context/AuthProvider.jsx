import {createContext, useContext, useEffect, useState} from "react";
import {registerRequest, loginRequest, verifyTokenRequest} from "../api/auth";
export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleError = (error) => {
    const errorMsg = error.response?.data?.message ||
      error.response?.data || [error.message];
    setErrors(Array.isArray(errorMsg) ? errorMsg : [errorMsg]);
    setIsAuthenticated(false);
  };

  const handleAuthSuccess = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    setErrors([]);
  };

  const signup = async (user) => {
    try {
      setErrors([]);
      const res = await registerRequest(user);
      handleAuthSuccess(res.data);
    } catch (error) {
      handleError(error);
    }
  };

  const signin = async (user) => {
    try {
      setErrors([]);
      const res = await loginRequest(user);
      handleAuthSuccess(res.data);
    } catch (error) {
      handleError(error);
    }
  };

  const logout = async () => {
    setUser(null);
    setIsAuthenticated(false);
    setErrors([]);
  };

  // Verificar token al cargar la app
  useEffect(() => {
    verifyTokenRequest()
      .then((res) => res.data && handleAuthSuccess(res.data))
      .catch(() => setIsAuthenticated(false))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  return (
    <AuthContext.Provider
      value={{signup, signin, logout, user, isAuthenticated, errors, loading}}
    >
      {children}
    </AuthContext.Provider>
  );
};
