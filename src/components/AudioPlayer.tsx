import { useRef, useState, useEffect } from "react";
import soundIcon from "../assets/sound.png";

const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Ensure audio can play after first user interaction
  useEffect(() => {
    const unlockAudio = () => {
      if (audioRef.current && !isInitialized) {
        audioRef.current.muted = false;
        audioRef.current.play();
        setIsInitialized(true);
      }
    };

    window.addEventListener("click", unlockAudio, { once: true });
    return () => window.removeEventListener("click", unlockAudio);
  }, []);

  const togglePlayback = () => {
    if (!audioRef.current) return;

    if (audioRef.current.paused) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };

  return (
    <div className="absolute top-4 right-4">
      <button className="cursor-pointer" onClick={togglePlayback}>
        <img src={soundIcon} alt="Toggle Sound" width={30} />
      </button>
      <audio ref={audioRef} src="/background.mp3" loop muted />
    </div>
  );
};

export default AudioPlayer;
