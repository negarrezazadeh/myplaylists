import { NavLink } from "react-router-dom";
import { MdOutlineShield } from "react-icons/md";
import { useNetworkStatus } from "@/context/NetworkStatusContext";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import {
  HomeSVG,
  PlaylistsSVG,
  TopListsSVG,
  TopSongsSVG,
  FavoritesOutlineSVG,
} from "@/ui/Icons";

function BottomNavigation() {
  const { isAdmin } = useAuth();
  const isOffline = useNetworkStatus();

  const offlineDisableClass = isOffline ? "opacity-20" : "";

  function handleClick(e) {
    if (isOffline) {
      e.preventDefault();
      toast.warning("Not available in offline mode");
    }
  }

  return (
    <nav className="flex w-full items-center justify-between px-5">
      <NavLink to="/" className="flex flex-col items-center py-3">
        <HomeSVG />
        <span className="mx-auto mt-1 text-[10px]">Home</span>
      </NavLink>

      <NavLink to="/playlists" className="flex flex-col items-center py-3">
        <PlaylistsSVG />
        <span className="mx-auto mt-1 text-[10px]">Playlists</span>
      </NavLink>

      <NavLink
        onClick={handleClick}
        to="/favorites"
        className={`flex flex-col items-center py-3 ${offlineDisableClass}`}
      >
        <FavoritesOutlineSVG />
        <span className="mx-auto mt-1 text-[10px]">Favorites</span>
      </NavLink>

      <NavLink
        onClick={handleClick}
        to="/top-playlists"
        className={`flex flex-col items-center py-3 ${offlineDisableClass}`}
      >
        <TopListsSVG />
        <span className="mx-auto mt-1 text-[10px]">Top Lists</span>
      </NavLink>

      <NavLink
        onClick={handleClick}
        to="/top-songs"
        className={`flex flex-col items-center py-3 ${offlineDisableClass}`}
      >
        <TopSongsSVG />
        <span className="mx-auto mt-1 text-[10px]">Top Songs</span>
      </NavLink>

      {isAdmin && (
        <NavLink
          to="/admin/dashboard"
          className="flex flex-col items-center py-3"
        >
          <MdOutlineShield size={25} />
          <span className="mx-auto mt-1 text-[10px]">Admin Panel</span>
        </NavLink>
      )}
    </nav>
  );
}

export default BottomNavigation;
