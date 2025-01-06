import { useParams } from "react-router-dom";
import AppContentBox from "@/layouts/AppContentBox";
import { usePlayer } from "@/context/PlayerContext";
import { useEffect } from "react";
import { usePlaylistSongs } from "@/features/playlist/usePlaylistSongs";
import PlaylistSong from "@/features/playlist/PlaylistSong";
import AppHeaderTitle from "@/layouts/AppHeaderTitle";
import SongSkeleton from "@/ui/SongSkeleton";
import { MdMoreVert } from "react-icons/md";

import RightMotion from "@/layouts/RightMotion";
import { useNetworkStatus } from "@/context/NetworkStatusContext";
import { useFilterPlaylistsSongs } from "@/features/playlist/useFilterPlaylistsSongs";
import SongItemOffline from "@/features/songs/SongItemOffline";
import OneLineText from "@/ui/OneLineText";
import PlaylistActions from "@/features/playlist/PlaylistActions";

function Playlist() {
  const { id, name } = useParams();
  const { songs: songsOnCloud, isLoading, refetch } = usePlaylistSongs(id);

  const isOffline = useNetworkStatus();

  const { songs } = useFilterPlaylistsSongs({
    isOffline,
    isLoading,
    songsOnCloud,
  });

  const { dispatch } = usePlayer();
  useEffect(() => {
    dispatch({ type: "song/list", payload: id });
  }, [dispatch, id]);

  return (
    <RightMotion>
      <AppHeaderTitle
        endEl={
          <PlaylistActions
            trigger={
              <MdMoreVert
                size={20}
                className="ms-auto cursor-pointer text-gray-400 hover:text-gray-500"
              />
            }
            playlist={{ id, name }}
          />
        }
      >
        <OneLineText className="block max-w-60">
          <span>{name}</span>
        </OneLineText>
      </AppHeaderTitle>
      <AppContentBox>
        <div className="space-y-4" role="list">
          {isLoading ? (
            <SongSkeleton count={8} />
          ) : (
            songs.map((song) =>
              !isOffline ? (
                <PlaylistSong key={song.id} song={song} refetch={refetch} />
              ) : (
                <SongItemOffline key={song.id} song={song} />
              ),
            )
          )}
        </div>
      </AppContentBox>
    </RightMotion>
  );
}

export default Playlist;
