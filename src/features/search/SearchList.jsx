import { usePlayerController } from "@/context/PlayerControllerContext";
import OneLineText from "@/ui/OneLineText";
import { MdMusicNote, MdOutlineArrowForwardIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function SearchList({ songs }) {
  const navigate = useNavigate();

  const { play } = usePlayerController();

  if (songs.length === 0) return <p className="ps-1">No search result found</p>;

  function handleNavigateToSong(song) {
    play(song);
    navigate(`/songs/${song.id}`);
  }

  return (
    <div>
      <ul className="flex max-h-60 flex-col gap-y-4 overflow-auto ps-1">
        {songs &&
          songs.map((song) => (
            <li className="cursor-pointer" onClick={() => handleNavigateToSong(song)} key={song.id}>
              <div className="ms-auto flex items-center gap-x-2">
                <MdMusicNote size={30} />
                <div className="flex flex-col">
                  <OneLineText>
                    <span className="text-md max-w-64">{song.name}</span>
                  </OneLineText>
                  <div className="flex">
                    <OneLineText>
                      <p className="max-w-28 text-sm text-slate-200">
                        {song.artist}
                      </p>
                    </OneLineText>
                    {song.album && (
                      <OneLineText>
                        <p className="max-w-28 text-sm text-slate-200">
                          | {song.album}
                        </p>
                      </OneLineText>
                    )}
                  </div>
                </div>
                <MdOutlineArrowForwardIos className="ms-auto" size={20} />
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default SearchList;
