import { MdMoreVert } from "react-icons/md";
import { usePlayer } from "../../context/PlayerContext";
import noCoverLogo from "@/assets/img/no-cover-logo.png";
import { useNavigate, useParams } from "react-router-dom";
import { usePlayerController } from "@/context/PlayerControllerContext";
import SongActions from "../songs/SongActions";

function PlaylistSong({ song }) {
  const { id: playlistId } = useParams();
  const navigate = useNavigate();
  const { currentSong } = usePlayer();
  const { play } = usePlayerController();

  function handlePlayer() {
    // prevent resets song if song is already playing
    if (song.id !== currentSong?.id) {
      play(song);
    } else {
      navigate(`/songs/${song.id}`);
    }
  }


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
      <div onClick={handlePlayer} className="flex flex-col gap-y-1">
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
        <SongActions
          song={song}
          playlist={{ id: playlistId }}
          trigger={
            <MdMoreVert
              size={20}
              className="cursor-pointer text-gray-400 hover:text-gray-500"
            />
          }
        />
      </div>
    </div>
  );
}

export default PlaylistSong;
