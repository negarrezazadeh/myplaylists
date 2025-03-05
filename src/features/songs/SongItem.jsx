import {
  MdMoreVert,
} from "react-icons/md";
import { usePlayer } from "../../context/PlayerContext";
import noCoverLogo from "@/assets/img/no-cover-logo.png";
import {  useLocation, useNavigate } from "react-router-dom";
import { memo, useRef, useState } from "react";
import SongActions from "./SongActions";

function SongItem({ song, play, stop, className="" }) {
  const navigate = useNavigate();
  const location = useLocation();

  const { currentSong } = usePlayer();

  const [isLongPress, setIsLongPress] = useState(false);
  const timerRef = useRef(null);

  const handleLongPress = () => {
    // detecting long press
    setIsLongPress(true);

    if (navigator.vibrate) {
      navigator.vibrate(50);
    }

    navigate(`/songs-bulk-actions?from=${location.pathname}`);
  };

  const handleMouseDown = () => {
    setIsLongPress(false);
    timerRef.current = setTimeout(handleLongPress, 1000);
  };

  const handleMouseUp = () => {
    // clear timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleTouchStart = () => {
    setIsLongPress(false);
    timerRef.current = setTimeout(handleLongPress, 1000);
  };

  const handleTouchEnd = () => {
    // clear timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  function handlePlayer() {
    if (isLongPress) return;

    // prevent resets song if song is already playing
    if (song.id !== currentSong?.id) {
      play(song);
    } else {
      navigate(`/songs/${song.id}`);
    }
  }

  return (
    <div
      className={`${className} flex cursor-pointer items-center gap-x-3`}
      role="listitem"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp} // cancel if mouse leaved
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onScroll={handleMouseUp}
    >
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
          className={`max-w-52 overflow-hidden overflow-ellipsis text-nowrap ${currentSong?.id === song.id ? "text-purple-500" : "text-white"}`}
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
        <SongActions song={song} trigger={<MdMoreVert size={20} />} />
      </div>
    </div>
  );
}

export default memo(SongItem);
