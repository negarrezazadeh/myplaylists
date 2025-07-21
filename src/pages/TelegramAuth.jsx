import { useAuth } from "@/context/AuthContext";

import { telegramAuth } from "@/services/apiAuth";
import FullPageSpinner from "@/ui/FullPageSpinner";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

import AppContainer from "../layouts/AppContainer";

function TelegramAuth() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { isAuthenticated } = useAuth();

  const [loading, setLoading] = useState(true);

  const queryObject = Object.fromEntries(searchParams.entries());
  useEffect(() => {
    const forwardRequest = async () => {
      try {
        // preventing error if telegram auth_link didn't pass data
        if (!queryObject.hash) {
          navigate("/login", { replace: true });
          toast.error(
            "Your account not supporting telegram login, Please try another way.",
          );
          return;
        }
        await telegramAuth(queryObject);
        window.location.reload();
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };
    forwardRequest();
  }, [queryObject, navigate]);

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
