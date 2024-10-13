"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";

const InternetBedroomPage: React.FC = () => {
  const router = useRouter();
  const [isSoundOn, setIsSoundOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/music.mp3"); // Replace with your actual audio file path
    audioRef.current.loop = true;
  }, []);

  const toggleSound = () => {
    if (audioRef.current) {
      if (isSoundOn) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsSoundOn(!isSoundOn);
    }
  };

  const generateUserBedroom = () => {
    router.push("/bedroom");
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://madeonverse.com/video/sky-30fps-reduced.webp"
          alt="Animated sky background"
          className="object-cover w-full h-full"
        />
      </div>
      {/* Content Wrapper */}
      <div className="relative z-10 flex flex-col md:flex-row w-full">
        {/* Left Section (Top on mobile) */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-start p-6 md:p-12 bg-black bg-opacity-50">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            YOUR
            <br />
            X
            <br />
            BEDROOM
          </h1>
          <p className="text-base md:text-lg mb-8">
            Find out what your bedroom looks like based off your X profile
          </p>
          <div className="w-full max-w-md">
            <input
              type="text"
              placeholder="your X username"
              className="w-full p-3 mb-4 bg-gray-800 text-white rounded"
            />
            <button
              onClick={generateUserBedroom}
              className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Generate Bedroom
            </button>
          </div>
          <div className="mt-8">
            <button className="flex items-center text-sm" onClick={toggleSound}>
              <span className="mr-2">{isSoundOn ? "🔊" : "🔇"}</span>
              Sound {isSoundOn ? "on" : "off"}
            </button>
          </div>
        </div>

        {/* Right Section (Bottom on mobile) */}
        <div className="w-full md:w-1/2 relative h-[50vh] md:h-auto flex flex-col items-center justify-between p-6 md:p-12 bg-black bg-opacity-30">
          {/* X Logo */}
          <div className="flex-grow flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="w-32 h-32 md:w-48 md:h-48 text-white"
            >
              <g>
                <path
                  fill="currentColor"
                  d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                ></path>
              </g>
            </svg>
          </div>
          <div className="text-white text-right self-end">
            <p>powered by</p>
            <p className="text-xl md:text-2xl font-bold">JECZ</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternetBedroomPage;
