import { useAuth } from "@/context/AuthContext";

import { telegramAuth } from "@/services/apiAuth";
import { Button } from "@/ui/button";
import FullPageSpinner from "@/ui/FullPageSpinner";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

import LoginForm from "../features/authentication/LoginForm";
import AppContainer from "../layouts/AppContainer";
import About from "./About";

function TelegramAuth() {
  const [searchParams] = useSearchParams();

  const { isAuthenticated } = useAuth();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const queryObject = Object.fromEntries(searchParams.entries());
  useEffect(() => {
    const forwardRequest = async () => {
      try {
        const response = await telegramAuth(queryObject);
        window.location.reload();
        
      } catch (error) {
        toast.error(error.response.data.message);
        setError(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };
    forwardRequest();
  }, [queryObject]);

  useEffect(() => {
    if (isAuthenticated) {
      window.location.href = "/explore";
    }
  }, [isAuthenticated]);

  if (loading) return <FullPageSpinner />;
  return (
    <AppContainer classes="xl:!ps-0 xl:!max-w-[600px]">
      <div className="mt-6 px-3 pb-4">...</div>
    </AppContainer>
  );
}

export default TelegramAuth;
