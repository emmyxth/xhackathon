"use client";
import Bedroom from "@/components/Bedroom";

import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const VersePage: React.FC = () => {
  const { slug } = useParams();

  const [arrOfItems, setArrOfItems] = useState([]);

  const [bedroomState, setBedroomState] = useState<{
    elements: any[];
    backgroundColor: string;
  } | null>(null);

  const findLastBracketIndex = (message: string): number => {
    return message.lastIndexOf("[");
  };

  useEffect(() => {
    const roomData = localStorage.getItem("roomData");
    if (roomData) {
      const parsedRoomData = JSON.parse(roomData);
      const parsedMessage =
        parsedRoomData[0]["prompt_response"]["response"]["choices"][0][
          "message"
        ]["content"];

      const arrOfItems = JSON.parse(
        parsedMessage.substring(findLastBracketIndex(parsedMessage))
      );

      const formattedArrOfItems = arrOfItems.map((item: string) => {
        const reformatted = item.replace(/\s+/g, "_").toLowerCase();
        return reformatted;
      });

      setArrOfItems(formattedArrOfItems);
    }
  }, []);

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
        <Link href={"/"}>
          <h1 className="text-2xl font-bold">My X Bedroom</h1>
        </Link>
      </header>

      <main className="flex-grow flex flex-col md:flex-row gap-12 items-center justify-center md:space-y-0 space-y-4 p-4">
        <Bedroom
          onStateChange={handleBedroomStateChange}
          bedroomState={bedroomState}
          items={arrOfItems}
          user={slug[0]}
        />
      </main>
      <footer className="p-4 flex justify-between items-center">
        <span>Powered by JECZ</span>
      </footer>
    </div>
  );
};
export default VersePage;
