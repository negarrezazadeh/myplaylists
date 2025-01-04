import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import { useEffect } from "react";
import FullPageSpinner from "@/ui/FullPageSpinner";
import { useNetworkStatus } from "@/context/NetworkStatusContext";
import { useAuth } from "@/context/AuthContext";

function ProtectedRoutes({ children }) {
  const navigate = useNavigate();

  const isOffline = useNetworkStatus();
  const { isLoading, isAuthenticated, user } = useUser();
  const { setUser } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      console.log(isAuthenticated);
      
      setUser({
        isAdmin: user.role === "admin",
        canUpload: user.role === "admin" || user.role === "artist",
      });
    }
    if (!isAuthenticated && !isLoading && !isOffline) {
      navigate("/login");
    }
  }, [setUser, user, isAuthenticated, isLoading, isOffline, navigate]);

  if (isLoading) return <FullPageSpinner />;
   
    
  if ((isAuthenticated && user) || isOffline) return children;

  return null;
}

export default ProtectedRoutes;
