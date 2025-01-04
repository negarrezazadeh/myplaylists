import { useUser } from "@/features/authentication/useUser";
import { createContext, useContext, useMemo } from "react";

const AuthContext = createContext({});

function AuthContextProvider({ children }) {
  const { user, isAuthenticated, isAdmin, isLoading, canUploadDownload } =
    useUser();

  const value = useMemo(
    () => ({
      user,
      isAuthenticated,
      isAdmin,
      isLoading,
      canUploadDownload,
    }),
    [user, isAuthenticated, isAdmin, isLoading, canUploadDownload],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside of AuthContextProvider");
  return context;
}

export { AuthContextProvider, useAuth };
