import { Link, NavLink, useLocation } from "react-router-dom";
import { useNetworkStatus } from "@/context/NetworkStatusContext";
import { toast } from "sonner";
import Logo from "@/assets/icons/logo.svg";
import { useRive, useStateMachineInput } from "@rive-app/react-canvas";
import { useEffect, useMemo, useState } from "react";

function BottomNavigation() {
  const location = useLocation();
  const [activeIcon, setActiveIcon] = useState(null);
  const isOffline = useNetworkStatus();

  const navLinks = useMemo(
    () => [
      {
        icon: "home",
        link: "/",
        text: "Home",
      },
      {
        icon: "playlist",
        link: "/playlists",
        text: "Playlists",
      },
      {
        icon: "zoom",
        link: "/explore",
        text: "Explore",
      },
      {
        icon: "star",
        link: "/favorites",
        text: "Favorites",
      },
    ],
    [],
  );

  // Sync activeIcon with current route.
  useEffect(() => {
    // Find nav link that matches the current location
    const currentNav = navLinks.find((item) => item.link === location.pathname);
    if (currentNav) {
      setActiveIcon(currentNav.icon);
    } else {
      setActiveIcon(null);
    }
  }, [location.pathname, navLinks]);

  function handleClick(e, icon) {
    if (isOffline) {
      e.preventDefault();
      toast.warning("Not available in offline mode");
      return;
    }
    // Set active icon on click
    setActiveIcon(icon);
  }

  return (
    <nav className="flex w-full items-center justify-between px-5 xl:!w-60 xl:flex-col xl:pt-5">
      <Link to="/" className="mb-3 me-auto hidden gap-x-2 py-3 xl:flex">
        <img width="35" height="35" src={Logo} alt="Myplaylists" />
        <span className="text-base font-extrabold">Myplaylists</span>
      </Link>
      {navLinks.map((item) => (
        <NavigationItem
          key={item.icon}
          onClick={handleClick}
          icon={item.icon}
          link={item.link}
          text={item.text}
          activeIcon={activeIcon}
          activePath={location.pathname}
          isOffline={isOffline}
        />
      ))}
    </nav>
  );
}

function NavigationItem({
  link,
  icon,
  text,
  onClick,
  activeIcon,
  activePath,
  isOffline,
}) {
  const { rive, RiveComponent } = useRive({
    src: `/${icon}.riv`,
    stateMachines: "click",
    autoplay: true,
    artboard: icon.charAt(0).toUpperCase() + icon.substring(1),
    shouldDisableRiveListeners: true,
  });

  // Get the "Active" input of the state machine
  const isActive = useStateMachineInput(rive, "click", "Active");

  useEffect(() => {
    // Set the animation active if the current nav is active
    if (isActive) {
      isActive.value = activeIcon === icon || activePath === link;
    }
  }, [isActive, activeIcon, icon, activePath, link]);

  return (
    <NavLink
      to={link}
      onClick={(e) => onClick?.(e, icon)}
      className={`flex flex-col items-center py-3 first-letter:flex xl:mb-2 xl:w-full xl:flex-row xl:justify-start xl:gap-x-3 ${isOffline && link !== "/" ? "opacity-20" : ""}`}
    >
      <div className="h-9 w-9">
        <RiveComponent />
      </div>
      <span className="mx-auto mt-1 text-[10px] xl:m-0 xl:text-lg">{text}</span>
    </NavLink>
  );
}

export default BottomNavigation;
