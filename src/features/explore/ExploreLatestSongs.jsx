import { useLatestSongs } from "../songs/useLatestSongs";

import SongCard from "../songs/SongCard";
import { Skeleton } from "@/ui/skeleton";
function ExploreLatestSongs() {
  const { latestSongs, isPending } = useLatestSongs();

  return (
    <div className="mp-carousel -me-5 flex gap-x-3 overflow-auto pb-1 pe-5">
      {isPending &&
        Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="flex max-w-40 flex-shrink-0 flex-col">
            <Skeleton className="h-40 w-40"></Skeleton>
            <Skeleton className="mb-1 mt-3 h-5 w-28"></Skeleton>
            <Skeleton className="h-4 w-20"></Skeleton>
          </div>
        ))}

      {!isPending &&
        latestSongs.map((song) => {
          return <SongCard key={song.id} song={song} />;
        })}
    </div>
  );
}

export default ExploreLatestSongs;
