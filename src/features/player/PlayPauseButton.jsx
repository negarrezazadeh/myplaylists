import { useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import playAndPause from "@/assets/eccoicon/play.lottie";
import { usePlayerController } from "@/context/PlayerControllerContext";

const PlayPauseButton = ({ song }) => {
  const [dotLottie, setDotLottie] = useState(null);

  const { playOrContinues, stop, isPlaying } = usePlayerController();

  function handleClick() {
    if (isPlaying) {
        dotLottie.setMode("reverse");
        dotLottie.play();
        stop();
    } else {
        dotLottie.setMode("forward");
      dotLottie.play();
      playOrContinues(song);
    }
  }

  function dotLottieRefCallback(dotLottie) {
    setDotLottie(dotLottie);
  }

  return (
    <div onClick={handleClick} className="cursor-pointer size-10">
      <DotLottieReact
        dotLottieRefCallback={dotLottieRefCallback}
        src={playAndPause}
        speed={3}
        autoplay={isPlaying}
        
      />
    </div>
  );
};

export default PlayPauseButton;
