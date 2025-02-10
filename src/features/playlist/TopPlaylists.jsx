import { useTopPlaylists } from "@/features/playlist/useTopPlaylists";
import PlaylistItem from "@/features/playlist/PlaylistItem";
import PlaylistSkeleton from "@/ui/PlaylistSkeleton";

function TopPlaylists() {
  const { topPlaylists, isLoading } = useTopPlaylists();
  if (isLoading)
    return (
      <div className="justify-content-between grid w-full grid-cols-12 gap-x-6 gap-y-6">
        <PlaylistSkeleton className="col-span-6 xl:col-span-3" count={6} />
      </div>
    );

  return (
    <div className="justify-content-between grid w-full grid-cols-12 gap-x-6 gap-y-6">
      {topPlaylists.map((playlist) => (
        <PlaylistItem  className="col-span-6 xl:col-span-3" key={playlist.id} playlist={playlist} />
      ))}
    </div>
  );
}

export default TopPlaylists;
