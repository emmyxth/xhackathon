"use client";
import { useEffect, useState } from "react";

const AnimatedLoadingText = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const messages = [
    "Analyzing your profile...",
    "Stalking your followers...",
    "Loading...",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 500); // Change highlight every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`text-lg font-semibold mb-4 transition-all duration-300 ${
            index === activeIndex ? "text-blue-600 scale-110" : "text-gray-600"
          }`}
        >
          {message}
        </div>
      ))}
    </div>
  );
};

export default AnimatedLoadingText;
