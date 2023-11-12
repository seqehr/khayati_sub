"use client";

import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
const TokenContext = createContext({});

export const TokenContextProvider = ({ children }) => {
  const [token, setTheToken] = useState(null);
  const setToken = (newValue, config) => {
    setTheToken(newValue);

    // If 'string' was passed : Set Token in Cookies
    if (typeof newValue === "string") {
      Cookies.set("token", newValue, config);
    }

    // If 'false' was passed : Remove Token From Cookies
    if (newValue === false) {
      Cookies.remove("token");
    }
  };
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setToken(token);
      console.log("token set");
    }
  }, [token]);

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
};

export const useTokenContext = () => useContext(TokenContext);
