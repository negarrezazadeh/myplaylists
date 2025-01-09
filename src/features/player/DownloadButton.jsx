import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

import { usePlayerController } from "@/context/PlayerControllerContext";
import { DownloadSvg } from "@/ui/Icons";

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
  return <DownloadSvg onClick={handleDownload} className="cursor-pointer" />;
}

export default DownloadButton;
