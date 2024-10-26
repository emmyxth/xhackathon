// pages/page1.tsx
"use client";
import AnimatedLoadingText from "@/components/AnimatedLoadingText";
import EditableComponent from "@/components/EditableComponent";
import Bedroom from "@/components/Bedroom";
import ElementPanel from "@/components/ElementPanel";
import axios from "axios";

import Link from "next/link";
import React, { useEffect, useState } from "react";

const VersePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [storedMessage, setStoredMessage] = useState<string | null>(null);
  const [arrOfItems, setArrOfItems] = useState([]);
  const [bedroomState, setBedroomState] = useState<{
    elements: any[];
    backgroundColor: string;
  } | null>(null);
  const tweetsData = JSON.stringify({
    justText: ["This is a dummy tweet", "Another dummy tweet"],
  });
  const likedTweetsData = JSON.stringify({
    justText: ["This is a liked dummy tweet", "Another liked dummy tweet"],
  });

  // const tweetsData = localStorage.getItem("tweetsData");
  // const likedTweetsData = localStorage.getItem("likedTweetsData");

  const handleBedroomStateChange = (
    elements: any[],
    backgroundColor: string
  ) => {
    setBedroomState({ elements, backgroundColor });
  };

  const generateShareableURL = () => {
    if (bedroomState) {
      const encodedState = btoa(JSON.stringify(bedroomState));
      return `${window.location.origin}${window.location.pathname}?state=${encodedState}`;
    }
    return "";
  };

  const copyShareableURL = () => {
    const url = generateShareableURL();
    if (url) {
      navigator.clipboard
        .writeText(url)
        .then(() => alert("Shareable URL copied to clipboard!"))
        .catch((err) => console.error("Failed to copy URL: ", err));
    } else {
      alert("Unable to generate shareable URL. Please try again.");
    }
  };

  // if (isLoading) {
  //   return <AnimatedLoadingText />;
  // }

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <header className="p-4">
        <Link href={"/hello"}>
          <h1 className="text-2xl font-bold">My X Bedroom</h1>
        </Link>
      </header>

      <main className="flex-grow flex flex-col md:flex-row gap-12 items-center justify-center md:space-y-0 space-y-4 p-4">
        <Bedroom onStateChange={handleBedroomStateChange} />
      </main>
      <footer className="p-4 flex justify-between items-center">
        <span>Powered by JECZ</span>
        <div>
          <button className="px-4 py-2 bg-gray-800 text-white rounded mr-2">
            Get the app
          </button>
          <button
            className="px-4 py-2 bg-gray-800 text-white rounded mr-2"
            onClick={copyShareableURL}
          >
            Copy link
          </button>
          <button className="px-4 py-2 bg-gray-800 text-white rounded">
            Save & Share
          </button>
        </div>
      </footer>
    </div>
  );
};
export default VersePage;
