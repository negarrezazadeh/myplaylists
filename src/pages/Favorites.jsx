import FavoritesList from "@/features/favorites/FavoritesList";
import SearchLink from "@/features/search/SearchLink";
import AppContentBox from "@/layouts/AppContentBox";
import AppHeaderTitle from "@/layouts/AppHeaderTitle";
import RightMotion from "@/layouts/RightMotion";

function Favorites() {
  return (
    <RightMotion>
      <AppHeaderTitle endEl={<SearchLink />}>Favorites</AppHeaderTitle>
      <AppContentBox>
        <FavoritesList />
      </AppContentBox>
    </RightMotion>
  );
}

export default Favorites;
