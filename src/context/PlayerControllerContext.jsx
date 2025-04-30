import {
  createContext,
  useCallback,
  useMemo,
  useContext,
  useState,
} from "react";
import { usePlayer } from "./PlayerContext";
import { API_BASE_URL } from "@/utils/http";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { usePlayerMode } from "./PlayerModeContext";

const PlayerControllerContext = createContext(null);

function PlayerControllerContextProvider({ children }) {
  const navigate = useNavigate();

  const { currentSong, songs, audio, dispatch, currentIndex } = usePlayer();
  const { mode } = usePlayerMode();

  const [isPlaying, setIsPlaying] = useState(false);

  const playInline = useCallback(
    (song) => {
      if (!song.path) {
        console.error("No song available to play.");
        return;
      }

      let newAudio = new Audio(`${API_BASE_URL}/api/songs/${song.id}/stream`);

      if (song.path.startsWith("blob:")) {
        newAudio = new Audio(song.path);
      }

      // Try to play the audio
      newAudio.play();

      // Update the state
      dispatch({
        type: "song/playInline",
        payload: {
          audio: newAudio,
        },
      });

      setIsPlaying(true);
    },
    [dispatch],
  );

  const play = useCallback(
    async (song = null, download = false) => {
      try {
        const songToPlay = song || currentSong;

        if (!songToPlay || !songToPlay.path) {
          console.error("No song available to play.");
          return;
        }

        // Pause and replace the previous audio instance if it exists
        if (audio) {
          audio.pause();
          audio.src = "";
        }

        dispatch({ type: "song/loading", payload: true });

        let newAudio = new Audio(
          `${API_BASE_URL}/api/songs/${songToPlay.id}/stream`,
        );

        if (download) {
          newAudio = new Audio(
            `${API_BASE_URL}/api/songs/${songToPlay.id}/download`,
          );
          newAudio.addEventListener("canplaythrough", () => {
            toast.success("Downloaded successfully");
          });
        }

        // song is from user device | uploaded from folder
        if (song.path.startsWith("blob:")) {
          newAudio = new Audio(song.path);
        }

        // Try to play the audio
        newAudio.play();

        // Update the current index when playing a new song
        const newIndex = songs.findIndex((s) => s.id === songToPlay.id);

        // Update the state
        dispatch({
          type: "song/play",
          payload: {
            currentSong: songToPlay,
            currentIndex: newIndex,
            audio: newAudio,
          },
        });
        setIsPlaying(true);

        // update last song that played by user
        localStorage.setItem("last-song", JSON.stringify(songToPlay));
      } catch (error) {
        toast.error(error.message,{
          duration: Infinity
        });
      }
    },
    [currentSong, songs, audio, dispatch],
  );

  const continues = useCallback(() => {
    if (audio) {
      audio.play();
      setIsPlaying(true);
    }
  }, [audio]);

  const playOrContinues = useCallback((songToPlay) => {
    if (audio) {
      continues();
    } else {
      play(songToPlay);
    }
  }, [play, continues, audio]);

  const stop = useCallback(() => {
    if (audio) {
      audio.pause();
      setIsPlaying(false);
    }
  }, [audio]);

  const next = useCallback(
    (navigateToNextSong = false) => {
      let songToNavigate;

      if (currentIndex !== null && currentIndex + 1 < songs.length) {
        let nextIndex;

        // repeat
        if (mode === 0) {
          nextIndex = currentIndex + 1;

          // pre-fetching next song
          new Audio(
            `${API_BASE_URL}/api/songs/${songs[nextIndex + 1]?.id}/stream`,
          );
        }

        // repeatOne
        if (mode === 1) {
          nextIndex = currentIndex;
        }

        // shuffle
        if (mode === 2) {
          nextIndex = Math.floor(Math.random() * songs.length);
        }

        dispatch({
          type: "song/next",
          payload: {
            currentSong: songs[nextIndex],
            currentIndex: nextIndex,
          },
        });

        play(songs[nextIndex]);

        songToNavigate = songs[nextIndex];
      } else {
        play(songs[0]);

        songToNavigate = songs[0];
      }

      if (navigateToNextSong) {
        navigate(`/songs/${songToNavigate.id}`, { replace: true });
      }
    },
    [currentIndex, songs, play, mode, navigate, dispatch],
  );

  const prev = useCallback(
    (navigateToPrevSong = false) => {
      let songToNavigate;

      if (currentIndex !== null && currentIndex > 0 && audio.currentTime < 10) {
        const prevIndex = currentIndex - 1;
        dispatch({
          type: "song/prev",
          payload: {
            currentSong: songs[prevIndex],
            currentIndex: prevIndex,
          },
        });
        play(songs[prevIndex]);

        songToNavigate = `/songs/${songs[prevIndex].id}`;
      } else {
        play(songs[currentIndex]);

        songToNavigate = songs[currentIndex];
      }

      if (navigateToPrevSong) {
        navigate(songToNavigate);
      }
    },
    [currentIndex, songs, play, navigate, audio, dispatch],
  );

  const value = useMemo(
    () => ({
      continues,
      playOrContinues,
      stop,
      next,
      prev,
      play,
      playInline,
      isPlaying,
      setIsPlaying,
    }),
    [continues, playOrContinues, playInline, stop, next, prev, play, isPlaying],
  );

  return (
    <PlayerControllerContext.Provider value={value}>
      {children}
    </PlayerControllerContext.Provider>
  );
}

function usePlayerController() {
  const context = useContext(PlayerControllerContext);
  if (context === undefined)
    throw new Error(
      "PlayerControllerContextProvider was used outside of PlayerContext",
    );
  return context;
}

export { usePlayerController, PlayerControllerContextProvider };
