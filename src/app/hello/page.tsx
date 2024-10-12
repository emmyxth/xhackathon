"use client";
import { useRouter } from "next/navigation";
import React from "react";

const InternetBedroomPage: React.FC = () => {
  const router = useRouter();
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
            <button className="flex items-center text-sm">
              <span className="mr-2">🔊</span> Sound on
            </button>
          </div>
        </div>

        {/* Right Section (Bottom on mobile) */}
        <div className="w-full md:w-1/2 relative h-[50vh] md:h-auto flex items-end justify-between p-6 md:p-12 bg-black bg-opacity-30">
          <div></div>
          <div className="text-white text-right">
            <p>powered by</p>
            <p className="text-xl md:text-2xl font-bold">JECZ</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternetBedroomPage;
