import { useArtist } from "@/features/artists/useArtist";
import noCoverLogo from "@/assets/img/no-cover-logo.png";
import OneLineText from "@/ui/OneLineText";
import { Link } from "react-router-dom";
import { Skeleton } from "@/ui/skeleton";
function ExploreTopArtists() {
  const { isLoading, error, artists } = useArtist();

  if (isLoading)
    return (
      <div className="-me-5 flex gap-x-3 overflow-auto pb-1">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="flex-shrink-0">
            <Skeleton className="size-40 flex-shrink-0 rounded-full" />
            <Skeleton className="mx-auto mt-3 h-6 max-w-28" />
          </div>
        ))}
      </div>
    );

  return (
    <div className="mp-carousel -me-5 flex gap-x-3 overflow-auto pb-1">
      {artists.map((artist) => {
        return (
          <Link
            to={`/artists/${artist.artist}`}
            key={artist.artist}
            className="flex max-w-40 flex-shrink-0 flex-col"
          >
            <img
              className="size-40 rounded-full object-cover"
              src={artist.cover || noCoverLogo}
              alt={artist.name}
            />
            <OneLineText>
              <span className="mt-3 text-center font-bold">
                {artist.artist}
              </span>
            </OneLineText>
          </Link>
        );
      })}
    </div>
  );
}

export default ExploreTopArtists;
