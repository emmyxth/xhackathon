import React, { useState, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

const AudioControlButton = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      <div>
        <button
          onClick={toggleAudio}
          className={`bg-black/80 hover:bg-black text-white p-3 rounded-full transition-all duration-300 border-2 ${
            isPlaying ? "animate-spin-slow" : ""
          }`}
          aria-label={isPlaying ? "Mute audio" : "Unmute audio"}
        >
          {isPlaying ? (
            <Volume2 className="w-6 h-6" />
          ) : (
            <VolumeX className="w-6 h-6" />
          )}
        </button>
      </div>

      <audio ref={audioRef} src="/music.mp3" loop />
    </>
  );
};

export default AudioControlButton;
