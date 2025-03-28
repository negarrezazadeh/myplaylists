import { Button } from "@/ui/button";
import { useToken } from "../authentication/useToken";
import { useState } from "react";
import { copyToClipboard } from "@/utils/utli";
import { Input } from "@/ui/input";
import { useAuth } from "@/context/AuthContext";

function AccessBot() {
  const { getToken, isPending } = useToken();
  const { user } = useAuth();
  const [token, setToken] = useState(null);
  function handleToken() {
    getToken(
      {},
      {
        onSuccess: (token) => {
          setToken(token);
        },
      },
    );
  }

  async function copyAndGoToBot() {
    await copyToClipboard(`getAccess#${token}`);

    window.location.href = "https://t.me/Myplaylists_ir_Bot?start=askAccess";
  }

  if (user.telegram_id) {
    return (
      <Button
        asChild
        className="mt-2"
        target="_blank"
        rel="noopener noreferrer"
      >
        <a href="https://t.me/Myplaylists_ir_Bot?start=askAccess">
          Open TelegramBot
        </a>
      </Button>
    );
  }

  return (
    <>
      {!token && (
        <div className="w-max">
          <Button
            variant="secondary"
            disabled={isPending}
            className="mt-2"
            onClick={handleToken}
          >
            Get TelegramBot Access
          </Button>
        </div>
      )}
      {token && (
        <div className="mt-3">
          <p>Send this token to our telegram bot:</p>
          <div className="my-1">
            <Input value={`getAccess#${token}`} className="select-all" />
          </div>
          <Button onClick={copyAndGoToBot}>Copy and open bot</Button>
        </div>
      )}
    </>
  );
}

export default AccessBot;
