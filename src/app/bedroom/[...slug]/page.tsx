"use client";
import Bedroom from "@/components/Bedroom";
import { supabase } from "@/utils/db";
import { signOut, useSession } from "next-auth/react";
import AudioControlButton from "../../../components/AudioControlButton";
import TeamProfiles from "../../../components/TeamProfiles";

import Link from "next/link";
import { redirect, useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const VersePage: React.FC = () => {
  const router = useRouter();
  const { slug } = useParams();
  const session = useSession();
  const [arrOfItems, setArrOfItems] = useState<
    {
      category: string;
      object: string;
      reasoning: string;
    }[]
  >([]);

  const [bedroomState, setBedroomState] = useState<{
    elements: any[];
    backgroundColor: string;
  } | null>(null);

  const getUserRoomData = async () => {
    // @ts-ignore
    const { data, error } = await supabase
      .from("rooms")
      .select("*")
      .eq("id", slug[1]);
    if (!error && data.length > 0) {
      const items = getItemsFromRoomData(data);
      return items;
    } else {
      return [];
    }
  };

  const getItemsFromRoomData = (roomData: any) => {
    const arrOfItems = roomData[0]["prompt_response"]["response"];
    return arrOfItems;
  };

  useEffect(() => {
    const roomData = localStorage.getItem("roomData");
    const roomDataUser = localStorage.getItem("roomDataUser");

    const fetchRoomData = async () => {
      const items = await getUserRoomData();
      setArrOfItems(items);
    };
    fetchRoomData();

    // if (roomData && roomDataUser && roomDataUser == slug[0]) {
    //   const parsedRoomData = JSON.parse(roomData);
    //   const arrOfItems = parsedRoomData[0]["prompt_response"]["response"];
    //   setArrOfItems(arrOfItems);
    // } else {
    //   const fetchRoomData = async () => {
    //     const roomData = await getUserRoomData();
    //     if (Array.isArray(roomData) && roomData.length > 0) {
    //       const items = getItemsFromRoomData(roomData);
    //       localStorage.setItem("roomData", JSON.stringify(roomData));
    //       localStorage.setItem("roomDataUser", slug[0]);
    //       // setArrOfItems(items);
    //     } else {
    //       router.push("/");
    //     }
    //   };
    //   fetchRoomData();
    // }
  }, []);

  const handleBedroomStateChange = (
    elements: any[],
    backgroundColor: string
  ) => {
    setBedroomState({ elements, backgroundColor });
  };

  if (session.status === "unauthenticated") {
    router.push("/");
  }

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <header className="p-4 flex flex-row justify-between">
        <Link href={"/"}>
          <h1 className="text-2xl font-bold">My X Bedroom</h1>
        </Link>
        <button
          className="px-4 py-2 bg-white border border-white text-black rounded-full float-right"
          onClick={() => {
            signOut();
            localStorage.removeItem("roomData");
            localStorage.removeItem("roomDataUser");
            redirect("/");
          }}
        >
          Log Out
        </button>
      </header>

      <main className="flex-grow flex flex-col lg:flex-row gap-12 items-center justify-center lg:space-y-0 space-y-4 p-4">
        {arrOfItems.length > 0 && (
          <Bedroom
            onStateChange={handleBedroomStateChange}
            bedroomState={bedroomState}
            items={arrOfItems}
            user={slug[0]}
          />
        )}
      </main>
      <footer className="p-4 flex sm:justify-between justify-center items-center ">
        {/* <span>Powered by JECZ</span> */}
        <TeamProfiles />
        <div className="fixed bottom-4 right-4 z-50">
          <AudioControlButton />
        </div>
      </footer>
    </div>
  );
};
export default VersePage;
