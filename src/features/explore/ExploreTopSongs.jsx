import { useTopSongs } from "../songs/useTopSongs";

import SongCard from "../songs/SongCard";
import { Skeleton } from "@/ui/skeleton";
function ExploreTopSongs() {
  const { topSongs, isPending } = useTopSongs();

  return (
    <div className="-me-5 flex gap-x-3 overflow-auto mp-carousel pb-1">
      {isPending &&
        Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="flex max-w-40 flex-shrink-0 flex-col">
            <Skeleton className="h-40 w-40"></Skeleton>
            <Skeleton className="h-5 mt-3 mb-1 w-28"></Skeleton>
            <Skeleton className="h-4 w-20"></Skeleton>
          </div>
        ))}

      {!isPending && 
        topSongs.map((song) => {
          return <SongCard key={song.id} song={song} />;
        })}
    </div>
  );
}

export default ExploreTopSongs;
