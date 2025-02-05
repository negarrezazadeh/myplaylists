import noCoverLogo from "./../../assets/img/no-cover-logo.png";
import { usePlayer } from "../../context/PlayerContext";
import { useNavigate } from "react-router-dom";
import CircleProgress from "./CircleProgress";
import { useNetworkStatus } from "@/context/NetworkStatusContext";
import { toast } from "sonner";
import PlayerMode from "./PlayerMode";
import { usePlayerController } from "@/context/PlayerControllerContext";
import { NextSVG, PauseSVG, PlaySVG, PrevSVG } from "@/ui/Icons";
function MiniPlayer() {
  const navigate = useNavigate();

  const { currentSong, isLoading } = usePlayer();
  const { continues, stop, next, prev, isPlaying } = usePlayerController();
  const isOffline = useNetworkStatus();

  const isSongFromCloud = !!currentSong?.id;

  function handleClick() {
    // only local songs doesn't have id
    if (!currentSong.id) {
      toast.warning("Songs detail isn't available for local songs");
      return;
    }

    if (isOffline) {
      toast.warning("Song detail isn't available in offline mode");
      return;
    }

    navigate(`/songs/${currentSong.id}`);
  }

  if (!currentSong) return null;

  return (
    <div
      className={`flex w-full overflow-hidden rounded-3xl bg-dark-50 py-1 pe-5 ps-1 ${isLoading ? "bg-glass-loader" : ""}`}
    >
      <div
        onClick={handleClick}
        className={`${isPlaying ? "" : "stop"} animate-spin-slow cursor-pointer overflow-hidden rounded-full bg-dark-200 shadow-[0_0_0_2px_#131319,_0_0_0_4px_#676789,_0_0_0_6px_#131319]`}
      >
        <img
          className="h-10 w-10 object-cover"
          src={currentSong.cover || noCoverLogo}
          alt={currentSong.name}
        />
      </div>
      <div onClick={handleClick} className="flex cursor-pointer flex-col ps-4">
        <span className="max-w-[164px] overflow-hidden overflow-ellipsis text-nowrap text-sm font-bold">
          {currentSong?.name}
        </span>
        <span className="max-w-[164px] overflow-hidden overflow-ellipsis text-nowrap text-xs">
          {currentSong?.artist}
        </span>
      </div>

      <div className="ms-auto flex items-center gap-4">
        {isSongFromCloud && <PlayerMode size={25} />}

        {isSongFromCloud && (
          <PrevSVG
            onClick={() => prev()}
            size={15}
            className="cursor-pointer text-white"
          />
        )}

        <div className="flex items-center justify-center">
          <CircleProgress />
          {isPlaying ? (
            <PauseSVG
              onClick={() => stop()}
              size={15}
              className="relative z-10 cursor-pointer text-white "
            />
          ) : (
            <PlaySVG
              onClick={() => continues()}
              size={15}
              className="relative z-10 cursor-pointer text-white translate-x-[1px]"
            />
          )}
        </div>

        {isSongFromCloud && (
          <NextSVG
            onClick={() => next()}
            size={15}
            className="cursor-pointer text-white"
          />
        )}
      </div>
    </div>
  );
}

export default MiniPlayer;
