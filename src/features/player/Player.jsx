import { usePlayer } from "@/context/PlayerContext";
import { useEffect } from "react";

import noCoverLogo from "./../../assets/img/no-cover-logo.png";
import FavoriteButton from "../favorites/FavoriteButton";
import LinearSlider from "./LinearSlider";
import PlayerMode from "./PlayerMode";
import { usePlayerController } from "@/context/PlayerControllerContext";
import DownloadButton from "./DownloadButton";
import { NextSVG, PrevSVG } from "@/ui/Icons";
import PlayPauseButton from "./PlayPauseButton";

function Player({ song, tab }) {
  const { currentSong, dispatch, isLoading } = usePlayer();

  const { next, prev } =
    usePlayerController();

  const songToPlay = currentSong || song;

  useEffect(() => {
    if (!currentSong) dispatch({ type: "song/current", payload: song });
  }, [song, currentSong, dispatch]);

  if (tab === "song") {
    return (
      <div>
        <div className="relative mx-auto mb-5 flex h-72 w-72 items-center justify-center rounded-2xl">
          <div
            className={`w-max overflow-hidden rounded-2xl ${isLoading ? "bg-glass-loader overlay-loader" : ""}`}
          >
            <img
              className="h-64 w-64 object-cover"
              src={songToPlay.cover || noCoverLogo}
              alt={songToPlay.name}
            />
          </div>

          <div className="absolute bottom-6 right-6 rounded-xl bg-dark/50 p-2">
            <DownloadButton song={songToPlay} />
          </div>
        </div>
        <h6 className="max-w-72 overflow-hidden overflow-ellipsis text-nowrap font-bold">
          {songToPlay.name}
        </h6>
        <span className="mb-14 mt-1 block h-6 max-w-72 overflow-hidden overflow-ellipsis text-nowrap text-slate-200">
          {songToPlay.artist}
        </span>

        <LinearSlider song={songToPlay} />

        <div className="mt-9 flex items-center justify-between px-6">
          <PlayerMode />

          <div className="flex items-center justify-center gap-4">
            <PrevSVG
              onClick={() => prev(true)}
              size={30}
              className="cursor-pointer text-white"
            />
            <PlayPauseButton song={songToPlay} />
            <NextSVG
              onClick={() => next(true)}
              size={30}
              className="cursor-pointer text-white"
            />
          </div>

          <FavoriteButton key={songToPlay.id} song={songToPlay} />
        </div>
      </div>
    );
  }

  if (tab === "lyrics") {
    return (
      <div key={song.id} className="h-[calc(100%-48px)] overflow-auto">
        <p className="whitespace-pre-line leading-loose">
          {song.lyrics || <p className="">No lyrics found for this song</p>}
        </p>
      </div>
    );
  }
}

export default Player;
