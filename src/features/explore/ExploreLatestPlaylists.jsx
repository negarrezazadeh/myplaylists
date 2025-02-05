import { Skeleton } from "@/ui/skeleton";
import { useLatestPlaylists } from "../playlist/useLatestPlaylists";
import PlaylistItem from "../playlist/PlaylistItem";
function ExploreLatestPlaylists() {
  const { latestPlaylists, isLoading } = useLatestPlaylists();

  return (
    <div className="mp-carousel -me-5 flex gap-x-3 overflow-auto pb-1 pe-5">
      {isLoading &&
        Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="flex max-w-40 flex-shrink-0 flex-col">
            <Skeleton className="h-40 w-40"></Skeleton>
            <Skeleton className="mb-1 mt-3 h-5 w-28"></Skeleton>
            <Skeleton className="h-4 w-20"></Skeleton>
          </div>
        ))}

      {!isLoading &&
        latestPlaylists.map((playlist) => {
          return <PlaylistItem className="shrink-0" key={playlist.id} playlist={playlist} />;
        })}
    </div>
  );
}

export default ExploreLatestPlaylists;
