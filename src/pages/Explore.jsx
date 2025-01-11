import ExploreTopSongs from "@/features/explore/ExploreTopSongs";
import TopPlaylists from "@/features/playlist/TopPlaylists";
import AppHeaderTitle from "@/layouts/AppHeaderTitle";
import RightMotion from "@/layouts/RightMotion";
import AppContentBox from "@/layouts/AppContentBox";
import ExploreTopArtists from "@/features/explore/ExploreTopArtists";
import { Link } from "react-router-dom";

function Explore() {
  return (
    <RightMotion>
      <AppHeaderTitle>Explore</AppHeaderTitle>
      <AppContentBox>
        <div>
          <h3 className="mb-3 text-2xl font-bold">Top Artist</h3>
          <ExploreTopArtists />
        </div>

        <Link to="/top-songs" className="block  mt-14">
          <h3 className="mb-3 text-2xl font-bold">Top Songs</h3>
          <ExploreTopSongs />
        </Link>

        <Link to="top-lists" className="block  mt-14">
          <h3 className="mb-3 text-2xl font-bold">Top Lists</h3>
          <TopPlaylists />
        </Link>
      </AppContentBox>
    </RightMotion>
  );
}

export default Explore;
