import AppContentBox from "@/layouts/AppContentBox";
import AppHeaderTitle from "@/layouts/AppHeaderTitle";
import RightMotion from "@/layouts/RightMotion";
import ArtistForm from "../../../features/admin/artists/ArtistForm";
import { useParams } from "react-router-dom";

function UpdateArtist() {
  const {artistName} = useParams();
  return (
    <RightMotion>
      <AppHeaderTitle>{artistName}</AppHeaderTitle>
      <AppContentBox>
        <ArtistForm artistName={artistName} />
      </AppContentBox>
    </RightMotion>
  );
}

export default UpdateArtist;
