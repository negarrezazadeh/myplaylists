import PlaylistSkeleton from "@/ui/PlaylistSkeleton";
import PlaylistItem from "./PlaylistItem";
import { useFollowed } from "./useFollowed";
import { usePlaylists } from "./usePlaylists";
import Error from "@/ui/Error";
import { Button } from "@/ui/button";
import CreatePlayListForm from "./CreatePlayListForm";

function Playlists() {
  const { playlists, isLoading, error } = usePlaylists();
  const { followedPlaylists, isLoading: followedIsLoading } = useFollowed();

  if (error) return <Error error={error} />;

  if (isLoading || followedIsLoading)
    return (
      <div className="justify-content-between grid w-full grid-cols-2 gap-x-6 gap-y-6 xl:grid-cols-4">
        <PlaylistSkeleton count={6} />
      </div>
    );

  if (!playlists.length && !followedPlaylists.length) {
    return (
      <div>
        <p className="mb-2">You don't have any playlist</p>
        <CreatePlayListForm
          trigger={<Button size="lg">Create your first playlist</Button>}
        />
      </div>
    );
  }

  return (
    <div className="justify-content-between grid w-full grid-cols-2 gap-x-6 gap-y-6 xl:grid-cols-4">
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
