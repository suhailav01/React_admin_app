import React, { createContext, useState } from "react";

export const LoginContext = createContext();

export default function LoginProvider({ children }) {
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem("token"));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        "https://api.escuelajs.co/api/v1/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        throw new Error("Invalid email or password");
      }

      const data = await response.json();

      localStorage.setItem("token", data.access_token);

      setIsAuth(true);
    } catch (err) {
      setError(err.message);
      setIsAuth(false);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuth(false);
  };
  setTimeout(() => {
    logout();
  }, 60 * 60 * 1000);
  return (
    <LoginContext.Provider value={{ isAuth, login, logout, loading, error }}>
      {children}
    </LoginContext.Provider>
  );
}
