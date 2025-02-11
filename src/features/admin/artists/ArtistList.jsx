import { useArtist } from "@/features/artists/useArtist";
import Error from "@/ui/Error";
import FullPageSpinner from "@/ui/FullPageSpinner";
import OneLineText from "@/ui/OneLineText";
import { Link } from "react-router-dom";

function ArtistList() {
  const { isLoading, error, artists } = useArtist();

  if (isLoading) return <FullPageSpinner />;

  if (error) return <Error error={error} />;

  return (
    <ul className="flex flex-col gap-y-6 px-3">
      {artists.map((artist) => {
        return (
          <li key={artist.artist}>
            <Link to={`/admin/artists/${artist.artist}`}>
              <OneLineText>
                <span className="mt-3 text-lg font-bold">{artist.artist}</span>
              </OneLineText>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default ArtistList;
