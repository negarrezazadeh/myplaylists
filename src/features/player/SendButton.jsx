import { useAuth } from "@/context/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/dialog";
import { PremiumSVG, TelegramSVG } from "@/ui/Icons";
import { useState } from "react";
import { toast } from "sonner";
import { useSendSong } from "../songs/useSendSong";

function SendButton({ song }) {
  const { user } = useAuth();
  const { sendSong, isPending } = useSendSong();

  const [openDialog, setOpenDialog] = useState(false);

  function handleSend(song_id, type) {
    if (isPending) return;

    if (!user?.is_premium) {
      toast.warning("Please upgrade to premium to send song to your channel");
      return;
    }

    sendSong(
      { song_id, type },
      {
        onSuccess: () => {
          setOpenDialog(false);
        },
      },
    );
  }

  if (!user) return null;

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <span className="cursor-pointer">
          <TelegramSVG size={35} />
        </span>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Send To</DialogTitle>
        </DialogHeader>
        {!user?.is_premium && (
          <>
            <div className="flex items-center gap-x-2">
              <i className="text-purple-500">
                <PremiumSVG size={35} />
              </i>
              <span>Only available for premium users</span>
            </div>
          </>
        )}
        <div
          className="cursor-pointer"
          onClick={() => handleSend(song.id, "file")}
        >
          <p className="text-sm font-bold">Telegram channel (as File)</p>
          <p className="text-xs text-muted-foreground">
            Directly send song as file to your channel with lyrics
          </p>
        </div>
        <hr />
        <div
          className="cursor-pointer"
          onClick={() => handleSend(song.id, "text")}
        >
          <p className="text-sm font-bold">Telegram channel (as Message)</p>
          <p className="text-xs text-muted-foreground">
            Directly send all song detail as message with download button
          </p>
        </div>
        <hr />
        <div className="cursor-not-allowed opacity-50">
          <p className="text-sm">
            My telegram group &nbsp;
            <small>(not available yet!)</small>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SendButton;
