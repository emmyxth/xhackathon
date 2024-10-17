// pages/page1.tsx
"use client";
import AnimatedLoadingText from "@/components/AnimatedLoadingText";
import EditableComponent from "@/components/EditableComponent";
import ElementPanel from "@/components/ElementPanel";
import axios from "axios";

import Link from "next/link";
import React, { useEffect, useState } from "react";

const VersePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [storedMessage, setStoredMessage] = useState<string | null>(null);
  const [arrOfItems, setArrOfItems] = useState([]);

  const tweetsData = JSON.stringify({
    justText: ["This is a dummy tweet", "Another dummy tweet"],
  });
  const likedTweetsData = JSON.stringify({
    justText: ["This is a liked dummy tweet", "Another liked dummy tweet"],
  });

  // const tweetsData = localStorage.getItem("tweetsData");
  // const likedTweetsData = localStorage.getItem("likedTweetsData");

  const getPrompt = async () => {
    if (tweetsData && likedTweetsData) {
      const tweets = JSON.parse(tweetsData);
      const likedTweets = JSON.parse(likedTweetsData);
      console.log("Tweets:", tweets.justText);
      console.log("Liked Tweets:", likedTweets.justText);

      setIsLoading(true);
      const prompt = await axios.post("/api/analyze_user_tweets", {
        tweets: tweets,
        liked_tweets: likedTweets,
      });
      console.log(prompt);

      // Check if the response structure is as expected
      if (
        prompt.data &&
        prompt.data.data &&
        prompt.data.data.choices &&
        prompt.data.data.choices.length > 0
      ) {
        const message = prompt.data.data.choices[0].message.content;
        console.log(message);

        const parsedMessage = message
          ? JSON.parse(message.substring(findLastBracketIndex(message)))
          : [];
        console.log(parsedMessage);
        setArrOfItems(parsedMessage);
        setStoredMessage(message);
      } else {
        console.error("Unexpected response structure:", prompt);
      }

      setIsLoading(false);
    } else {
      console.error("No tweets data found in localStorage.");
    }
  };

  useEffect(() => {
    getPrompt();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 20000);

    return () => clearTimeout(timer);
  }, []);

  const findLastBracketIndex = (message: string): number => {
    return message.lastIndexOf("[");
  };

  if (isLoading) {
    return <AnimatedLoadingText />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-blue-300">
      <header className="p-4">
        <Link href={"/hello"}>
          <h1 className="text-2xl font-bold">My X Bedroom</h1>
        </Link>
      </header>

      <main className="flex-grow flex flex-col md:flex-row gap-12 items-center justify-center md:space-y-0 space-y-4 p-4">
        <div className="w-full md:w-[375px] h-[500px] bg-black rounded-3xl overflow-hidden">
          <EditableComponent />
        </div>
        <div className="w-full md:w-[375px] h-[300px] bg-blue-200 rounded-lg overflow-y-auto">
          {storedMessage && <ElementPanel text={storedMessage} />}
        </div>
      </main>
      <footer className="p-4 flex justify-between items-center">
        <span>Powered by JECZ</span>
        <div>
          <button className="px-4 py-2 bg-gray-800 text-white rounded mr-2">
            Get the app
          </button>
          <button className="px-4 py-2 bg-gray-800 text-white rounded mr-2">
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
