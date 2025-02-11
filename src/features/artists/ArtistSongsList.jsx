import SongSkeleton from "@/ui/SongSkeleton";
import { useArtistSongs } from "./useArtistSongs";
import SongItem from "../songs/SongItem";
import Error from "@/ui/Error";
import { usePlayerController } from "@/context/PlayerControllerContext";
import { usePlayer } from "@/context/PlayerContext";
import { useEffect } from "react";

function ArtistSongsList({ artistName }) {
  const { songs, isLoading, error } = useArtistSongs(artistName);
  const { play } = usePlayerController();
  const { dispatch } = usePlayer();

  useEffect(() => {
    dispatch({ type: "song/list", payload: artistName });
  }, [dispatch, artistName]);

  if (isLoading)
    return (
      <div className="flex flex-col gap-y-4">
        <SongSkeleton count={8} />
      </div>
    );

  if (error) <Error error={error} />;

  if (songs.length === 0) return <div>No Song Found</div>;

  return (
    <div className="space-y-4">
      {songs.map((song) => (
        <SongItem key={song.id} song={song} play={play} />
      ))}
    </div>
  );
}

export default ArtistSongsList;
