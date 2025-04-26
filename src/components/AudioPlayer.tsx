import { useEffect, useRef } from "react";

const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const handleInteraction = () => {
      const audio = audioRef.current;
      if (audio) {
        audio.muted = false;
        audio.play().catch((err) => {
          console.error("Playback failed:", err);
        });
      }
    };

    document.body.addEventListener("click", handleInteraction);

    return () => {
      document.body.removeEventListener("click", handleInteraction);
    };
  }, []);

  return <audio ref={audioRef} src="/background.mp3" autoPlay muted loop />;
};

export default AudioPlayer;
