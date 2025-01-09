import { usePlayerMode } from "@/context/PlayerModeContext";
import { RepeatOneSVG, RepeatSVG, ShuffleSVG } from "@/ui/Icons";

function PlayerMode({ size = 30 }) {
  const { mode, setMode } = usePlayerMode();

  function handleModeChange(selectedMode) {
    setMode(selectedMode);
    localStorage.setItem("mode", selectedMode);
  }
  return (
    <div>
      {mode === 0 && (
        <RepeatSVG
          onClick={() => handleModeChange(1)}
          size={size}
          className="cursor-pointer text-white"
        />
      )}
      {mode === 1 && (
        <RepeatOneSVG
          onClick={() => handleModeChange(2)}
          size={size}
          className="cursor-pointer text-white"
        />
      )}
      {mode === 2 && (
        <ShuffleSVG
          onClick={() => handleModeChange(0)}
          size={size}
          className="cursor-pointer text-white"
        />
      )}
    </div>
  );
}

export default PlayerMode;
