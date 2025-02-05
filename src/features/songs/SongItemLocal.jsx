import { toast } from "sonner";

import { usePlayer } from "../../context/PlayerContext";
import { usePlayerController } from "@/context/PlayerControllerContext";

import noCoverLogo from "@/assets/img/no-cover-logo.png";
import { uploadSong } from "@/services/apiSongs";
import { useState } from "react";
import { ShareSVG, UploadSVG } from "@/ui/Icons";
import { copyToClipboard } from "@/utils/utli";

function SongItemLocal({ song }) {
  const { currentSong } = usePlayer();
  const { play } = usePlayerController();

  const [progress, setProgress] = useState(0);
  const [uploadedSong, setUploadedSong] = useState({});

  function handlePlayer() {
    // prevent resets song if song is already playing
    if (song.name !== currentSong?.name) {
      play(song);
    } else {
      toast.warning("Song detail is'nt not available for local songs");
    }
  }

  async function handleUploadSong(file) {
    try {
      const { song, message } = await uploadSong({ file, setProgress });
      setProgress(100);
      setUploadedSong(song);
      toast.success(message);
    } catch (error) {
      toast.error("Some thing went wrong");
      console.error(error);
      setProgress(0);
    }
  }

  console.log(progress);
  return (
    <div className="flex cursor-pointer items-center gap-x-3" role="listitem">
      <img
        onClick={handlePlayer}
        className="h-16 w-16 rounded-lg object-cover"
        width={64}
        height={64}
        src={song.cover || noCoverLogo}
        alt={song.name}
      />
      <div onClick={handlePlayer} className="flex w-full flex-col gap-y-1">
        <span
          className={`max-w-52 overflow-hidden overflow-ellipsis text-nowrap ${currentSong?.name === song.name ? "text-purple-500" : "text-white"}`}
        >
          {song.name}
        </span>
        <div className="min-h-4 max-w-52 overflow-hidden overflow-ellipsis text-nowrap text-sm text-slate-200">
          <span>{song.artist}</span>
          {song.artist && song.album && <span> | </span>}
          <span>{song.album}</span>
        </div>
      </div>
      <div className="mr-3 ms-auto">
        {progress === 0 && (
          <div onClick={() => handleUploadSong(song.file)}>
            <UploadSVG size={35} />
          </div>
        )}
        {progress !== 0 && progress !== 100 && (
          <span className="middle text-sm font-bold">{progress}%</span>
        )}
        {progress === 100 && (
          <ShareSVG
            onClick={() => copyToClipboard(`/songs/${uploadedSong.id}`)}
            size={30}
          />
        )}
      </div>
    </div>
  );
}

export default SongItemLocal;
