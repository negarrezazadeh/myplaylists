import { useParams } from "react-router-dom";
import AppContentBox from "@/layouts/AppContentBox";
import { usePlayer } from "@/context/PlayerContext";
import { useEffect } from "react";
import { usePlaylistSongs } from "@/features/playlist/usePlaylistSongs";
import PlaylistSong from "@/features/playlist/PlaylistSong";

import SongSkeleton from "@/ui/SongSkeleton";

import AppHeaderFull from "@/layouts/AppHeaderFull";
import PlaylistFollowButton from "@/features/playlist/PlaylistFollowButton";
import OneLineText from "@/ui/OneLineText";
import Error from "@/ui/Error";

function SharePlaylist() {
  const { id, name } = useParams();
  const { songs, isLoading, error } = usePlaylistSongs(id);

  const { dispatch } = usePlayer();
  useEffect(() => {
    dispatch({ type: "song/list", payload: id });
  }, [dispatch, id]);

  if (error) return <Error error={error} />;

  return (
    <div>
      <AppHeaderFull endEl={<PlaylistFollowButton playlistId={id} />}>
        <OneLineText className="block max-w-60">
          <span>{name}</span>
        </OneLineText>
      </AppHeaderFull>
      <AppContentBox>
        <div className="space-y-4" role="list">
          {isLoading ? (
            <SongSkeleton count={8} />
          ) : (
            songs.map((song) => <PlaylistSong key={song.id} song={song} />)
          )}
        </div>
      </AppContentBox>
    </div>
  );
}

export default SharePlaylist;
