import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

import { usePlayerController } from "@/context/PlayerControllerContext";
import { DownloadSvg } from "@/ui/Icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/dialog";

function DownloadButton({ song }) {
  const { user, canUploadDownload } = useAuth();
  const { play } = usePlayerController();
  const navigate = useNavigate();
  async function handleDownload() {
    if (!user) {
      toast.warning("Please login to download song");
      navigate("/login");
      return;
    }

    if (canUploadDownload === false) {
      navigate("/songs/upload");
      return;
    }

    if (!song.is_owner) {
      toast.warning("You can download only your songs");
      return;
    }

    play(song, true);
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="cursor-pointer">
          <DownloadSvg />
        </span>
      </DialogTrigger>  

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Download</DialogTitle>
        </DialogHeader>
        <div>
          <a
            href={`https://t.me/Myplaylists_ir_Bot?start=sendSongToTelegram_${song.id}`}
            target="_blank"
            rel="noreferrer"
          >
            <p className="text-sm font-bold">
              Telegram Bot &nbsp;
              <small>(recommended)</small>
            </p>
            <p className="text-xs text-muted-foreground">
              Directly from telegram bot
            </p>
          </a>
        </div>
        <hr />

        <div className="cursor-pointer" onClick={handleDownload}>
          <p className="text-sm font-bold">Add To Offline Mode</p>
          <p className="text-xs text-muted-foreground">
            Save and listen when you are offline
          </p>
        </div>
        <hr />

        <div className="cursor-not-allowed opacity-50">
          <p className="text-sm">
            Download File &nbsp;
            <small>(not available)</small>
          </p>
          <DialogDescription>Directly download song</DialogDescription>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default DownloadButton;
