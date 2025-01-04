import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext({});

function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);

  const value = useMemo(() => ({ user, setUser }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside of AuthContextProvider");
  return context;
}

export { AuthContextProvider, useAuth };
