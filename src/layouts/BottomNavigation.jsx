import { NavLink } from "react-router-dom";
import { useNetworkStatus } from "@/context/NetworkStatusContext";
import { toast } from "sonner";
import {
  HomeSVG,
  PlaylistsSVG,
  FavoritesOutlineSVG,
  SearchSVG,
} from "@/ui/Icons";

import Logo from "@/assets/icons/logo.svg";

function BottomNavigation() {
  const isOffline = useNetworkStatus();

  function handleClick(e) {
    if (isOffline) {
      e.preventDefault();
      toast.warning("Not available in offline mode");
    }
  }

  return (
    <nav className="flex w-full items-center justify-between px-5 xl:!w-60 xl:flex-col xl:pt-5">
      <div className="mb-3 me-auto hidden gap-x-2 py-3 xl:flex">
        <img width="35" height="35" src={Logo} alt="Myplaylists" />
        <span className="text-base font-extrabold">Myplaylists</span>
      </div>

      <NavigationItem link="/" icon={<HomeSVG />} text="Home" />

      <NavigationItem
        link="/playlists"
        icon={<PlaylistsSVG />}
        text="Playlists"
      />

      <NavigationItem
        link="/explore"
        icon={<SearchSVG size={35} />}
        text="Explore"
        onClick={handleClick}
      />

      <NavigationItem
        link="/favorites"
        icon={<FavoritesOutlineSVG />}
        text="Favorites"
        onClick={handleClick}
      />
    </nav>
  );
}

function NavigationItem({ link, icon, text, onClick, isOffline }) {
  return (<NavLink
    to={link}
    onClick={() => onClick?.()}
    className={`flex flex-col items-center py-3 xl:flex-row xl:mb-2 xl:w-full xl:justify-start xl:gap-x-3 ${isOffline ? "opacity-20" : ""}`}
  >
    {icon}
    <span className="mx-auto mt-1 text-[10px] xl:m-0 xl:text-lg">{text}</span>
  </NavLink>)
}

export default BottomNavigation;
