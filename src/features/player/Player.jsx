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
import OneLineText from "@/ui/OneLineText";

function Player({ song, tab }) {
  const { currentSong, dispatch, isLoading } = usePlayer();

  const { next, prev } = usePlayerController();

  const songToPlay = currentSong || song;

  useEffect(() => {
    if (!currentSong) dispatch({ type: "song/current", payload: song });
  }, [song, currentSong, dispatch]);

  if (tab === "song") {
    return (
      <div className="rounded-lg xl:mx-auto xl:max-w-[1000px] xl:bg-dark-900 xl:px-4 xl:pb-6 xl:pt-4">
        <div className="xl:grid xl:grid-cols-12">
          <div className="relative mx-auto mb-5 flex h-72 w-72 items-center justify-center rounded-2xl xl:col-span-4 xl:mx-0">
            <div
              className={`w-max overflow-hidden rounded-2xl ${isLoading ? "bg-glass-loader overlay-loader relative z-0" : ""}`}
            >
              <img
                className="z-10 h-64 w-64 object-cover"
                src={songToPlay.cover || noCoverLogo}
                alt={songToPlay.name}
              />
            </div>

            <div className="absolute bottom-6 right-6 rounded-xl bg-dark/50 p-2">
              <DownloadButton song={songToPlay} />
            </div>

            <OneLineText className="max-w-28 absolute top-6 left-6 rounded-lg bg-dark/50 p-2 text-xs font-bold">
              <span className="capitalize">{songToPlay.owner}</span>
            </OneLineText>
          </div>

          <div className="xl:col-span-8">
            <h6 className="max-w-72 overflow-hidden overflow-ellipsis text-nowrap font-bold capitalize">
              {songToPlay.name}
            </h6>
            <span className="mb-14 mt-1 block h-6 max-w-72 overflow-hidden overflow-ellipsis text-nowrap text-slate-200 xl:mb-5">
              {songToPlay.artist}
            </span>

            {songToPlay.lyrics && (
              <div
                dir="auto"
                className="hidden max-h-[200px] overflow-auto leading-loose xl:block"
              >
                {songToPlay.lyrics}
              </div>
            )}
          </div>

          <div className="xl:col-span-12">
            <LinearSlider className="xl:mt-4" song={songToPlay} />

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
        </div>
      </div>
    );
  }

  if (tab === "lyrics") {
    return (
      <div key={song.id} className="h-[calc(100%-48px)] overflow-auto">
        <p dir="auto" className="whitespace-pre-line leading-loose">
          {song.lyrics || <p className="">No lyrics found for this song</p>}
        </p>
      </div>
    );
  }
}

export default Player;
