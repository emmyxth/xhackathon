"use client";
import AnimatedLoadingText from "@/components/AnimatedLoadingText";
import { SignIn } from "@/components/Authenticate";
import { supabase } from "@/utils/db";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const ErrorOverlay = ({ message }: { message: string }) => (
  <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
    <div className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg">
      {message}
    </div>
  </div>
);

const InternetBedroomPage: React.FC = () => {
  const router = useRouter();
  const session = useSession();
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  // Function to show error for 3 seconds
  const showErrorMessage = () => {
    setShowError(true);
    setTimeout(() => setShowError(false), 3000);
  };

  const generateUserBedroom = async () => {
    if (session.data && session.data?.user.id_str) {
      setLoading(true);
      const id_str = session.data?.user.id_str;
      const username = session.data?.user.handle;
      const bearer_token = session.data?.user.access_token;

      try {
        const { data, error } = await supabase
          .from("rooms")
          .select("*")
          .eq("profile_id", id_str)
          .eq("author_id", id_str);

        if (!error && data.length > 0) {
          setLoading(false);
          localStorage.setItem("roomData", JSON.stringify(data));
          const room_id = data[0].id;
          router.push(`/bedroom/${username}/${room_id}`);
        } else {
          const tweets = await axios.get(
            `/api/user_tweets?user_id=${id_str}&bearer_token=${bearer_token}`
          );

          const liked_tweets = await axios.get(
            `/api/user_tweets?user_id=${id_str}&bearer_token=${bearer_token}`
          );

          const analyze = await axios.post(`api/analyze_user_tweets`, {
            tweets: tweets.data,
            liked_tweets: liked_tweets.data,
          });

          const { data, error } = await supabase
            .from("rooms")
            .insert({
              author_id: id_str,
              profile_id: id_str,
              prompt_response: {
                response: analyze.data.data,
              },
            })
            .select();

          if (!!data && !error) {
            localStorage.setItem("roomData", JSON.stringify(data));
            const room_id = data[0].id;
            router.push(`/bedroom/${username}/${room_id}`);
          }
          setLoading(false);
        }
      } catch {
        setLoading(false);
      }
    }
  };

  const generateFriendBedroom = async (friendHandle: string) => {
    if (session.data && session.data?.user.id_str) {
      setLoading(true);

      const id_str = session.data?.user.id_str;
      const bearer_token = session.data?.user.access_token;

      var friendId = null;
      try {
        friendId = await axios.get(
          `/api/user_id?user_handle=${friendHandle}&bearer_token=${bearer_token}`
        );
      } catch (e) {
        console.log("User ID not Found");
        setLoading(false);
        showErrorMessage();
        return;
      }

      try {
        const { data, error } = await supabase
          .from("rooms")
          .select("*")
          .eq("profile_id", friendId)
          .eq("author_id", id_str);

        if (!error && data.length > 0 && friendId) {
          setLoading(false);
          localStorage.setItem("roomData", JSON.stringify(data));
          const room_id = data[0].id;
          router.push(`/bedroom/${friendHandle}/${room_id}`);
        } else {
          const tweets = await axios.get(
            `/api/user_tweets?user_id=${friendId.data.id}&bearer_token=${bearer_token}`
          );

          const analyze = await axios.post(`api/analyze_user_tweets`, {
            tweets: tweets.data,
            liked_tweets: tweets.data,
          });

          const { data, error } = await supabase
            .from("rooms")
            .insert({
              author_id: id_str,
              profile_id: id_str,
              prompt_response: {
                response: analyze.data.data,
              },
            })
            .select();

          if (!!data && !error) {
            localStorage.setItem("roomData", JSON.stringify(data));
            const room_id = data[0].id;
            router.push(`/bedroom/${friendHandle}/${room_id}`);
          }
          setLoading(false);
        }
      } catch {
        setLoading(false);
      }
    }
  };

  if (loading) {
    return <AnimatedLoadingText />;
  } else {
    return (
      <div className="min-h-screen relative overflow-hidden flex items-center">
        {/* Error Alert Overlay */}
        {showError && <ErrorOverlay message="Please input a valid X handle" />}

        {/* Animated Background - Always visible */}
        {/* <div className="absolute inset-0 z-0">
          <img
            src="https://madeonverse.com/video/sky-30fps-reduced.webp"
            alt="Animated sky background"
            className="hidden lg:block object-cover w-full h-full"
          />
        </div> */}
        <div className="absolute inset-0 z-0">
          {/* Desktop Background - only visible on lg screens */}
          <img
            src="https://madeonverse.com/video/sky-30fps-reduced.webp"
            alt="Animated sky background"
            className="hidden lg:block object-cover w-full h-full"
          />

          {/* Mobile/Tablet Background - hidden on lg screens */}
          <div className="lg:hidden w-full h-full">
            <img
              src="/mobile-hero-background.gif"
              alt="Mobile background pattern"
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        {/* Content Wrapper */}
        <div className="relative z-10 flex flex-col lg:flex-row w-full min-h-screen lg:min-h-0 h-screen">
          {/* Left Section - Black background only on desktop */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 lg:p-24 lg:bg-black text-black lg:text-white min-h-screen lg:min-h-0">
            <div className="flex flex-col items-center max-w-4xl w-full flex-1 lg:flex-initial justify-center sm:pt-12 ">
              <h1 className="text-5xl lg:text-6xl font-bold mb-8 lg:mb-6 minecraft-font text-center flex flex-col gap-6 lg:gap-4">
                <span>YOUR</span>
                <span>X</span>
                <span>BEDROOM</span>
              </h1>
              <p className="text-[20px] lg:text-[24px] mb-8 lg:mb-6 text-center max-w-xs lg:max-w-md mx-auto">
                Find out what your bedroom looks like based off your X profile
              </p>

              {session.status !== "authenticated" ? (
                <SignIn />
              ) : (
                <div className="w-full flex flex-col lg:flex-row lg:items-start lg:gap-8">
                  {/* Left side - Generate My Bedroom */}
                  <div className="w-full lg:w-1/2 text-center mb-8 lg:mb-0 flex flex-col justify-between items-center">
                    {session.data && session.data?.user.handle && (
                      <h1 className="text-2xl lg:text-2xl font-bold mb-6 lg:mb-4">
                        Welcome, @{session.data?.user.handle}{" "}
                      </h1>
                    )}
                    <button
                      onClick={generateUserBedroom}
                      className="w-48 lg:w-full px-4 py-3 lg:px-6 lg:py-4 bg-black lg:bg-blue-500 text-white rounded-full hover:bg-gray-800 lg:hover:bg-blue-600 transition-colors text-sm lg:text-base"
                    >
                      Create Bedroom
                    </button>
                  </div>

                  {/* Divider for mobile/tablet */}
                  <div className="lg:hidden">
                    <p className="text-center text-gray-600 mb-6 font-bold">
                      OR
                    </p>
                  </div>

                  {/* Vertical divider for desktop */}
                  <div className="hidden lg:block border-r border-gray-500 h-full" />

                  {/* Right side - Friend's Room */}
                  <div className="w-full lg:w-1/2 text-center mb-8 lg:mb-0 flex flex-col justify-center items-center">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        const target = e.currentTarget;
                        const friendHandle = (
                          target.elements[0] as HTMLInputElement
                        ).value;
                        generateFriendBedroom(friendHandle);
                      }}
                      className="flex flex-col gap-9 w-full items-center h-full"
                    >
                      <input
                        id="friendInput"
                        type="text"
                        className="w-64 lg:w-full p-2 rounded text-black bg-gray-200 text-sm lg:text-base"
                        placeholder="Enter any public X handle"
                      />
                      <button
                        type="submit"
                        className="w-48 lg:w-full px-4 py-3 lg:px-6 lg:py-4 bg-black lg:bg-blue-500 text-white rounded-full hover:bg-gray-800 lg:hover:bg-blue-600 transition-colors text-sm lg:text-base mt-auto"
                      >
                        Generate
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Section - Only visible on desktop */}
          <div className="hidden lg:flex w-full lg:w-1/2 relative flex-col items-center justify-between lg:p-12 bg-black bg-opacity-30 h-full">
            <div className="flex-grow flex items-center justify-center w-full h-full">
              <img
                src="/hero-x-decorated.svg"
                className="w-full h-full object-contain" // Adjusted class to make image take more space
              />
            </div>
            <div className="text-white text-right self-end">
              <p>powered by</p>
              <p className="text-xl lg:text-2xl font-bold">Roomify</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default InternetBedroomPage;
