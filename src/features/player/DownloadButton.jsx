import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

import { MdOutlineCloudDownload } from "react-icons/md";
import { usePlayerController } from "@/context/PlayerControllerContext";

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

    play(song, true);
  }
  return (
    <MdOutlineCloudDownload
      onClick={handleDownload}
      className="cursor-pointer"
      size={30}
    />
  );
}

export default DownloadButton;
