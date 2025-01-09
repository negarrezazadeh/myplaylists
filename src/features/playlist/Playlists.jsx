import PlaylistSkeleton from "@/ui/PlaylistSkeleton";
import PlaylistItem from "./PlaylistItem";
import { useFollowed } from "./useFollowed";
import { usePlaylists } from "./usePlaylists";
import Error from "@/ui/Error";

function Playlists() {
  const { playlists, isLoading, error } = usePlaylists();
  const { followedPlaylists, isLoading: followedIsLoading } = useFollowed();
  console.log(error);
  
  if (error) return <Error error={error} />;

  if (isLoading || followedIsLoading)
    return (
      <div className="justify-content-between grid w-full grid-cols-12 gap-x-6 gap-y-6">
        <PlaylistSkeleton count={6} />
      </div>
    );

  return (
    <div className="justify-content-between grid w-full grid-cols-12 gap-x-6 gap-y-6">
      {playlists.map((list) => (
        <PlaylistItem key={list.id} playlist={list} />
      ))}

      {followedPlaylists.map((list) => (
        <PlaylistItem key={list.id} playlist={list} />
      ))}
    </div>
  );
}

export default Playlists;
