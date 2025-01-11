import ArtistList from "@/features/admin/artists/ArtistList";
import AppContentBox from "@/layouts/AppContentBox";
import AppHeaderTitle from "@/layouts/AppHeaderTitle";
import RightMotion from "@/layouts/RightMotion";

function Artists() {
  return (
    <RightMotion>
      <AppHeaderTitle>Artists</AppHeaderTitle>
      <AppContentBox>
        <ArtistList />
      </AppContentBox>
    </RightMotion>
  );
}

export default Artists;
