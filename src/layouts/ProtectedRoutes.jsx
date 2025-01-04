import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import FullPageSpinner from "@/ui/FullPageSpinner";
import { useNetworkStatus } from "@/context/NetworkStatusContext";
import { useAuth } from "@/context/AuthContext";

function ProtectedRoutes({ children }) {
  const navigate = useNavigate();

  const isOffline = useNetworkStatus();
  const { isLoading, isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (!isAuthenticated && !isLoading && !isOffline) {
      navigate("/login");
    }
  }, [user, isAuthenticated, isLoading, isOffline, navigate]);

  if (isLoading) return <FullPageSpinner />;
   
    
  if (isAuthenticated  || isOffline) return children;

  return null;
}

export default ProtectedRoutes;
