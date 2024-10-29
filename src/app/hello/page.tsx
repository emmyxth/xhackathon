"use client";
import AnimatedLoadingText from "@/components/AnimatedLoadingText";
import { SignIn } from "@/components/Authenticate";
import { supabase } from "@/utils/db";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import React, { useState } from "react";

const InternetBedroomPage: React.FC = () => {
  const router = useRouter();
  const session = useSession();
  const [loading, setLoading] = useState(false);

  const generateUserBedroom = async () => {
    if (session.data && session.data?.user.id_str) {
      setLoading(true);
      const id_str = session.data?.user.id_str;
      const username = session.data?.user.username;
      const bearer_token = session.data?.user.access_token;
      const tweets = await axios.get(
        `/api/user_tweets?user_id=${id_str}&bearer_token=${bearer_token}`
      );

      const liked_tweets = await axios.get(
        `/api/user_tweets?user_id=${id_str}&bearer_token=${bearer_token}`
      );
      const { data, error } = await supabase
        .from("rooms")
        .select("*")
        .eq("profile_id", id_str)
        .eq("author_id", id_str);

      if (!error && data.length > 0) {
        setLoading(false);
        const room_id = data[0].id;
        router.push(`/bedroom/${username}/${room_id}`);
      } else {
        const analyze = await axios.post(`api/analyze_user_tweets`, {
          tweets: tweets.data,
          liked_tweets: liked_tweets.data,
        });
        console.log(analyze);
        setLoading(false);
      }
    }
  };

  const generateFriendBedroom = async (friendHandle: string) => {
    if (session.data && session.data?.user.id_str) {
      const id_str = session.data?.user.id_str;
      const bearer_token = session.data?.user.access_token;
      const friendId = await axios.get(
        `/api/user_id?user_handle=${friendHandle}&bearer_token=${bearer_token}`
      );

      const tweets = await axios.get(
        `/api/user_tweets?user_id=${friendId.data.id}&bearer_token=${bearer_token}`
      );

      const liked_tweets = await axios.get(
        `/api/user_liked_tweets?user_id=${id_str}&bearer_token=${bearer_token}`
      );

      router.push("/bedroom");
    }
  };

  if (loading) {
    return <AnimatedLoadingText />;
  } else {
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
                    const friendHandle = (
                      target.elements[0] as HTMLInputElement
                    ).value;
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
  }
};

export default InternetBedroomPage;
