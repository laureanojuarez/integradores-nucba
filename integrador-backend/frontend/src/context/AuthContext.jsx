import { createContext, useContext, useReducer, useEffect } from "react";

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return { ...state, loading: true, error: null };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
      };
    case "LOGIN_ERROR":
      return { ...state, loading: false, error: action.payload };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
      };
    case "REGISTER_START":
      return { ...state, loading: true, error: null };
    case "REGISTER_SUCCESS":
      return { ...state, loading: false, error: null };
    case "REGISTER_ERROR":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const initialState = {
  user: null,
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Verificar token al cargar la app
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          token,
          user: JSON.parse(user),
        },
      });
    }
  }, []);

  const login = async (credentials) => {
    dispatch({ type: "LOGIN_START" });

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error en login");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: data,
      });

      return { success: true };
    } catch (error) {
      dispatch({
        type: "LOGIN_ERROR",
        payload: error.message,
      });
      return { success: false, error: error.message };
    }
  };

  const register = async (userData) => {
    dispatch({ type: "REGISTER_START" });

    try {
      console.log("Enviando registro:", userData); // DEBUG
      console.log("URL:", "http://localhost:3000/api/auth/register"); // DEBUG

      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      console.log("Response status:", response.status); // DEBUG
      console.log("Response ok:", response.ok); // DEBUG

      const data = await response.json();
      console.log("Response data:", data); // DEBUG

      if (!response.ok) {
        throw new Error(data.error || "Error en registro");
      }

      dispatch({ type: "REGISTER_SUCCESS" });
      return { success: true };
    } catch (error) {
      console.error("Error en register:", error); // DEBUG
      dispatch({
        type: "REGISTER_ERROR",
        payload: error.message,
      });
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
  };

  const value = {
    ...state,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
