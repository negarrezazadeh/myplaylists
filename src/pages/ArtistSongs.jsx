import ArtistActions from "@/features/artists/ArtistActions";
import ArtistSongsList from "@/features/artists/ArtistSongsList";
import AppContentBox from "@/layouts/AppContentBox";
import AppHeaderTitle from "@/layouts/AppHeaderTitle";
import RightMotion from "@/layouts/RightMotion";
import OneLineText from "@/ui/OneLineText";
import { MdMoreVert } from "react-icons/md";
import { useParams } from "react-router-dom";

function ArtistSongs() {
  const { artistName } = useParams();
  return (
    <RightMotion>
      <AppHeaderTitle  endEl={<ArtistActions artistName={artistName} trigger={<MdMoreVert />} />}>
        <OneLineText className="w-60 block text-center">
          <span >{artistName}</span>
        </OneLineText>
      </AppHeaderTitle>
      <AppContentBox>
        <ArtistSongsList artistName={artistName} />
      </AppContentBox>
    </RightMotion>
  );
}

export default ArtistSongs;
