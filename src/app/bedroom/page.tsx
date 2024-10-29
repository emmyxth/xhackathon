// pages/page1.tsx
"use client";
import Bedroom from "@/components/Bedroom";

import Link from "next/link";
import React, { useState } from "react";

const VersePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [storedMessage, setStoredMessage] = useState<string | null>(null);
  const [arrOfItems, setArrOfItems] = useState([]);
  const [bedroomState, setBedroomState] = useState<{
    elements: any[];
    backgroundColor: string;
  } | null>(null);

  // const tweetsData = localStorage.getItem("tweetsData");
  // const likedTweetsData = localStorage.getItem("likedTweetsData");

  const handleBedroomStateChange = (
    elements: any[],
    backgroundColor: string
  ) => {
    setBedroomState({ elements, backgroundColor });
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
        <Bedroom
          onStateChange={handleBedroomStateChange}
          bedroomState={bedroomState}
        />
      </main>
      <footer className="p-4 flex justify-between items-center">
        <span>Powered by JECZ</span>
      </footer>
    </div>
  );
};
export default VersePage;
