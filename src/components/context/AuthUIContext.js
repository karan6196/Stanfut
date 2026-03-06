import { createContext, useContext, useState } from "react";

const AuthUIContext = createContext();

export function AuthUIProvider({ children }) {

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("login"); // login | signup

  const openLogin = () => {
    setMode("login");
    setOpen(true);
  };

  const openSignup = () => {
    setMode("signup");
    setOpen(true);
  };

  const closeAuth = () => setOpen(false);

  return (
    <AuthUIContext.Provider
      value={{ open, mode, openLogin, openSignup, closeAuth }}
    >
      {children}
    </AuthUIContext.Provider>
  );
}

export const useAuthUI = () => useContext(AuthUIContext);