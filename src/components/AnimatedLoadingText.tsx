"use client";
import { useEffect, useState } from "react";

const AnimatedLoadingText = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const messages = [
    "Analyzing your profile...",
    "Stalking your followers...",
    "Loading...",
  ];

  useEffect(() => {
    // Start showing the loading messages immediately
    const messageInterval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 500); // Change message every 0.5 seconds

    // Set a 3-second timer before showing the content
    const contentTimer = setTimeout(() => {
      setShowContent(true);
      clearInterval(messageInterval); // Stop changing messages
    }, 3000);

    return () => {
      clearInterval(messageInterval);
      clearTimeout(contentTimer);
    };
  }, []);

  if (showContent) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="text-lg font-semibold text-blue-600">
          Results are ready!
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="text-lg font-semibold text-blue-600 animate-pulse">
        {messages[activeIndex]}
      </div>
    </div>
  );
};

export default AnimatedLoadingText;
