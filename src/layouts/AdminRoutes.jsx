import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import { useEffect } from "react";
import FullPageSpinner from "@/ui/FullPageSpinner";
import { useNetworkStatus } from "@/context/NetworkStatusContext";

function AdminRoutes({ children }) {
  const navigate = useNavigate();

  const isOffline = useNetworkStatus();
  const { isLoading, isAuthenticated, isAdmin } = useUser();

  useEffect(() => {
    if ((!isAuthenticated ||  !isAdmin) && !isLoading && !isOffline) {
      navigate("/");
    }
  }, [isAuthenticated, isAdmin, isLoading, isOffline, navigate]);

  if (isLoading) return <FullPageSpinner />;

  if (isAuthenticated && isAdmin) return children;

  return null;
}

export default AdminRoutes;
