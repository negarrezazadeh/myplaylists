import ExploreTopSongs from "@/features/explore/ExploreTopSongs";
import TopPlaylists from "@/features/playlist/TopPlaylists";
import AppHeaderTitle from "@/layouts/AppHeaderTitle";
import RightMotion from "@/layouts/RightMotion";
import AppContentBox from "@/layouts/AppContentBox";
import ExploreTopArtists from "@/features/explore/ExploreTopArtists";
import { Link } from "react-router-dom";
import { Button } from "@/ui/button";

function Explore() {
  return (
    <RightMotion>
      <AppHeaderTitle>Explore</AppHeaderTitle>
      <AppContentBox>
        <div>
          <h3 className="mb-3 text-2xl font-bold">Top Artists</h3>
          <ExploreTopArtists />
        </div>

        <div className="mt-10">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-2xl font-bold">Top Songs</span>
            <Button size="sm" asChild>
              <Link className="text-blue-500" to="/top-songs">
                More
              </Link>
            </Button>
          </div>
          <ExploreTopSongs />
        </div>

        <div className="mt-10">
        <div className="mb-3 flex items-center justify-between">
            <span className="text-2xl font-bold">Top Lists</span>
            <Button size="sm" asChild>
              <Link className="text-blue-500" to="/top-playlists">
                More
              </Link>
            </Button>
          </div>
          <TopPlaylists />
        </div>
      </AppContentBox>
    </RightMotion>
  );
}

export default Explore;
