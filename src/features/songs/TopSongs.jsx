import { usePlayerController } from "@/context/PlayerControllerContext";
import { useTopSongs } from "./useTopSongs";
import SongItem from "@/features/songs/SongItem";
import SongSkeleton from "@/ui/SongSkeleton";

function TopSongs() {
  const { topSongs, isPending } = useTopSongs();
  const { play, stop } = usePlayerController();
  if (isPending)
    return (
      <div className="space-y-4">
        <SongSkeleton count={8} />
      </div>
    );
  return (
    <div className="space-y-4" role="list">
      {topSongs.map((song) => (
        <SongItem key={song.id} song={song} play={play} stop={stop} />
      ))}
    </div>
  );
}

export default TopSongs;
