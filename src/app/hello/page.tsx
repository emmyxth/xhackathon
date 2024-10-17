"use client";
import { SignIn } from "@/components/Authenticate";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import React from "react";


const InternetBedroomPage: React.FC = () => {
  const router = useRouter();
  const session = useSession();
  console.log(session);

  const generateUserBedroom = async () => {
    if (session.data && session.data?.user.id_str) {
      const id_str = session.data?.user.id_str;
      const bearer_token = session.data?.user.access_token;
      const tweets = await axios.get(
        `/api/user_tweets?user_id=${id_str}&bearer_token=${bearer_token}`
      );

      const liked_tweets = await axios.get(
        `/api/user_tweets?user_id=${id_str}&bearer_token=${bearer_token}`
      );

      localStorage.setItem("tweetsData", JSON.stringify(tweets.data));
      localStorage.setItem(
        "likedTweetsData",
        JSON.stringify(liked_tweet.data)
      );
      router.push("/bedroom");
    }
  };

  const generateFriendBedroom = async (friendHandle: string) => {
    if (session.data && session.data?.user.id_str) {
      const id_str = session.data?.user.id_str;
      const bearer_token = session.data?.user.access_token;
      const friendId = await axios.get(
        `/api/user_id?user_handle=${friendHandle}&bearer_token=${bearer_token}`
      );

      console.log(friendId.data.id);
      const tweets = await axios.get(
        `/api/user_tweets?user_id=${friendId.data.id}&bearer_token=${bearer_token}`
      );

      const liked_tweets = await axios.get(
        `/api/user_tweets?user_id=${id_str}&bearer_token=${bearer_token}`
      );

      localStorage.setItem("tweetsData", JSON.stringify(tweets.data));
      localStorage.setItem(
        "likedTweetsData",
        JSON.stringify(liked_tweet.data)
      );
      router.push("/bedroom");
    }
  };

  return (
    <div className="flex flex-col min-h-screen text-white relative overflow-x-hidden font-minecraft">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://madeonverse.com/video/sky-30fps-reduced.webp"
          alt="Animated sky background"
          className="object-cover w-full h-full"
        />
      </div>
      {/* Content Wrapper */}
      <div className="relative z-10 flex flex-col w-full font-minecraft items-center justify-center p-4 md:p-12 flex-grow">
        {/* Main Content Section */}
        <div className="w-full max-w-3xl flex flex-col items-center justify-center text-center">
          <h1 className="text-6xl md:text-8xl mb-4 font-impact leading-tight whitespace-nowrap">
            YOUR
            <br className="h-0" />
            BASED
            <br className="h-0" />
            BEDROOM
          </h1>

          <p className="text-lg md:text-2xl mb-0" style={{ fontFamily: 'Helvetica, sans-serif' }}>
            Find out what your bedroom looks like
          </p>
          <p className="text-lg md:text-2xl mb-10 md:mb-20" style={{ fontFamily: 'Helvetica, sans-serif' }}>
            based off your X profile
          </p>

          {session.status !== "authenticated" ? (
            <SignIn />
          ) : (
            <div className="w-full max-w-md">
              {session.data && session.data?.user.handle && (
                <h1 className="text-2xl font-bold mb-4">
                  Welcome, @{session.data?.user.handle}{" "}
                </h1>
              )}

              <button
                onClick={generateUserBedroom}
                className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Generate My Bedroom
              </button>
              <div className="w-full border-t border-gray-500 mt-4"></div>
              <p className="text-center text-gray-400 mb-4">OR</p>
              <h1 className="text-xl font-bold mb-4">
                Make a room for a friend
              </h1>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const target = e.currentTarget;
                  const friendHandle = (target.elements[0] as HTMLInputElement)
                    .value;
                  generateFriendBedroom(friendHandle);
                }}
              >
                <input
                  id="friendInput"
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded mb-4 text-black"
                  placeholder="Enter any public X handle"
                />
                <button
                  type="submit"
                  className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                  Generate
                </button>
              </form>
            </div>
          )}

          {/* Powered by Roomify */}
          <div className="relative z-10 w-full text-white text-center minecraft-font p-4 mt-auto">
            <p className="font-bold text-xl md:text-2xl">powered by Roomify</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternetBedroomPage;
