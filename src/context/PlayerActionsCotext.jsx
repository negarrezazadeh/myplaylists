import { createContext, useContext, useEffect } from "react";
import { usePlayerController } from "./PlayerControllerContext";
import { useLocation } from "react-router-dom";
import { usePlayer } from "./PlayerContext";
import { useNetworkStatus } from "./NetworkStatusContext";

const PlayerActionsContext = createContext(null);

function PlayerActionsContextProvider({ children }) {
  const location = useLocation();

  const { next, prev, stop, continues } = usePlayerController();

  const { audio, dispatch, currentSong } = usePlayer();

  const isOffline = useNetworkStatus();

  // Automatically play next song
  useEffect(() => {
    // prevent navigation on index page
    const goToNextSong = () =>
      next(
        location.pathname !== "/" &&
          location.pathname !== "/explore" &&
          !isOffline,
      );

    if (audio) {
      audio.addEventListener("ended", goToNextSong);
    }

    return () => {
      if (audio) {
        audio.removeEventListener("ended", goToNextSong);
      }
    };
  }, [audio, next, location, isOffline]);

  // On audio start playing
  useEffect(() => {
    const setLoader = () => dispatch({ type: "song/loading", payload: false });
    if (audio) {
      audio.addEventListener("canplay", setLoader);
    }

    return () => {
      if (audio) {
        audio.removeEventListener("canplay", setLoader);
      }
    };
  }, [audio, dispatch]);

  // Update mediaSession when a new song is played
  useEffect(() => {
    if (!currentSong) return;

    if ("mediaSession" in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: currentSong.name,
        artist: currentSong.artist || "unknown",
        album: currentSong.album || " | unknown",
        artwork: [96, 128, 192, 256, 384, 512].map((size) => ({
          src: currentSong?.cover,
          sizes: `${size}x${size}`,
          type: "image/png",
        })),
      });

      // Define actions for play, pause, next, prev
      navigator.mediaSession.setActionHandler("play", continues);
      navigator.mediaSession.setActionHandler("pause", stop);
      navigator.mediaSession.setActionHandler("nexttrack", () => next(false));
      navigator.mediaSession.setActionHandler("previoustrack", prev);
    }

    return () => {
      navigator.mediaSession.metadata = null; // Cleanup on song change
    };
  }, [continues, next, prev, stop, currentSong]);

  // Update document title
  useEffect(() => {
    if (!currentSong) return;
    document.title = currentSong.name;
  }, [currentSong]);

  useEffect(() => {
    // Only active on desktop devices
    if (!window.matchMedia("(min-width:1280px)").matches) return;
  
    const handleKeydown = (e) => {
      // Ignore if the key is held down (repeat)
      if (e.repeat) return;
  
      // Check if an input, textarea, or contenteditable element is focused
      const isInputFocused =
        document.activeElement &&
        (document.activeElement.tagName === "INPUT" ||
          document.activeElement.tagName === "TEXTAREA" ||
          document.activeElement.isContentEditable);
  
      if (isInputFocused) return; // Don't handle shortcuts when typing
  
      switch (e.code) {
        case "Space":
          e.preventDefault(); // Prevent default scrolling behavior
          if (audio) {
            if (audio.paused) {
              continues();
            } else {
              stop();
            }
          }
          break;
  
        case "ArrowRight":
          e.preventDefault();
          next(false); // Go to the next song
          break;
  
        case "ArrowLeft":
          e.preventDefault();
          prev(); // Go to the previous song
          break;
  
        default:
          break;
      }
    };
  
    window.addEventListener("keydown", handleKeydown);
  
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [audio, continues, stop, next, prev]);
  

  return (
    <PlayerActionsContext.Provider value={true}>
      {children}
    </PlayerActionsContext.Provider>
  );
}

function usePlayerActions() {
  const context = useContext(PlayerActionsContext);
  if (!context)
    throw new Error(
      "usePlayerActions must be used within PlayerActionsContextProvider",
    );
  return context;
}

export { PlayerActionsContextProvider, usePlayerActions };
