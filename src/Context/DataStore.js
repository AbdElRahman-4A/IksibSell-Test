import { createContext } from "react";
import React, { useEffect, useState } from "react";

export const DataContext = createContext(null);

export default function DataContextProvider(props) {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("token");
    if (tokenFromStorage) {
      setToken(tokenFromStorage);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  const login = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
  };

  return (
    <DataContext.Provider value={{ token, logout, login }}>
      {props.children}
    </DataContext.Provider>
  );
}
