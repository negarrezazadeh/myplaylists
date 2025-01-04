import { NavLink } from "react-router-dom";
import { AiOutlineFire } from "react-icons/ai";
import { PiMusicNoteThin } from "react-icons/pi";
import {
  MdHome,
  MdOutlineShield,
  MdQueueMusic,
  MdStarOutline,
} from "react-icons/md";
import { useNetworkStatus } from "@/context/NetworkStatusContext";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import {HomeSVG, FavoritesSVG, PlaylistsSVG, TopListsSVG, TopSongsSVG, UploadSVG}  from "@/ui/Icons";


function BottomNavigation() {
  const { user } = useAuth();
  const isOffline = useNetworkStatus();

  const offlineDisableClass = isOffline ? "opacity-20" : "";

  function handleClick(e) {
    if (isOffline) {
      e.preventDefault();
      toast.warning("Not available in offline mode");
    }
  }

  return (
    <nav className="flex w-full justify-between px-5 items-center">
      <NavLink to="/" className="flex flex-col items-center py-3">
        <HomeSVG  />
        <span className="mx-auto text-[10px] mt-1">Home</span>
      </NavLink>

      <NavLink to="/playlists" className="flex flex-col items-center py-3">
        <PlaylistsSVG  />
        <span className="mx-auto text-[10px] mt-1">Playlists</span>
      </NavLink>

      <NavLink
        onClick={handleClick}
        to="/favorites"
        className={`flex flex-col items-center py-3 ${offlineDisableClass}`}
      >
        <FavoritesSVG  />
        <span className="mx-auto text-[10px] mt-1">Favorites</span>
      </NavLink>

      <NavLink
        onClick={handleClick}
        to="/top-playlists"
        className={`flex flex-col items-center py-3 ${offlineDisableClass}`}
      >
        <TopListsSVG  />
        <span className="mx-auto text-[10px] mt-1">Top Lists</span>
      </NavLink>

      <NavLink
        onClick={handleClick}
        to="/top-songs"
        className={`flex flex-col items-center py-3 ${offlineDisableClass}`}
      >
        <TopSongsSVG />
        <span className="mx-auto text-[10px] mt-1">Top Songs</span>
      </NavLink>

      {user?.isAdmin && (
        <NavLink
          to="/admin/dashboard"
          className="flex flex-col items-center py-3"
        >
          <MdOutlineShield size={25} />
          <span className="mx-auto text-[10px] mt-1">Admin Panel</span>
        </NavLink>
      )}
    </nav>
  );
}

export default BottomNavigation;
