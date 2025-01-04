import { useTopPlaylists } from "@/features/playlist/useTopPlaylists";
import PlaylistItem from "@/features/playlist/PlaylistItem";
import PlaylistSkeleton from "@/ui/PlaylistSkeleton";

function TopPlaylists() {
  const { topPlaylists, isLoading } = useTopPlaylists();
  if (isLoading)
    return (
      <div className="justify-content-between grid w-full grid-cols-12 gap-x-6 gap-y-6">
        <PlaylistSkeleton count={6} />
      </div>
    );

  return (
    <div className="justify-content-between grid w-full grid-cols-12 gap-x-6 gap-y-6">
      {topPlaylists.map((playlist) => (
        <PlaylistItem key={playlist.id} playlist={playlist} />
      ))}
    </div>
  );
}

export default TopPlaylists;
