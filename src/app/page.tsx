//@ts-nocheck
"use client";
import AnimatedLoadingText from "@/components/AnimatedLoadingText";
import { SignIn } from "@/components/Authenticate";
import TeamProfiles from "@/components/TeamProfiles";
import { supabase } from "@/utils/db";
import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import AudioControlButton from "../components/AudioControlButton";

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
  const [error, setError] = useState<string | null>(null);

  // Function to show error for 3 seconds
  const showError = (message: string) => {
    setError(message);
    setTimeout(() => setError(null), 3000);
  };

  /**
   * Generates a user's bedroom visualization based on their session data.
   *
   * This function checks if the user session is valid and retrieves the user's ID, handle, and access token.
   * It then checks if a room already exists for this user in the database.
   * If a room exists, it stores the room data in local storage and navigates to the room page.
   * If no room exists, it fetches the user's tweets and liked tweets, analyzes them to generate room data,
   * inserts the new room data into the database, stores it in local storage, and redirects the user to the new room page.
   * If any errors occur during these processes, an error message is displayed.
   */
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
          localStorage.setItem("roomData", JSON.stringify(data));
          localStorage.setItem("roomDataUser", username);
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

          if (error) {
            showError(error);
          }

          if (!!data && !error) {
            localStorage.setItem("roomData", JSON.stringify(data));
            localStorage.setItem("roomDataUser", username);
            const room_id = data[0].id;
            router.push(`/bedroom/${username}/${room_id}`);
          }
        }
      } catch (err) {
        showError(
          "Failed to generate bedroom. Check your handle and try again. You may need to log out and reauthenticate as well."
        );
      } finally {
        setLoading(false);
      }
    }
  };
  /**
   * Generates a friend's bedroom visualization based on their X handle.
   *
   * @param {string} friendHandle - The X handle of the friend whose bedroom is to be generated.
   *
   * This function validates the input handle and removes any leading '@' character.
   * If the user session is valid, it retrieves the friend's user ID using the handle.
   * It checks if a room already exists for this friend and the current user.
   * If a room exists, it stores the room data in local storage and navigates to the room page.
   * If no room exists, it fetches the friend's tweets and analyzes them to generate room data.
   * The new room data is inserted into the database, stored in local storage, and the user is redirected to the new room page.
   * If any errors occur during these processes, appropriate error messages are displayed.
   */
  const generateFriendBedroom = async (friendHandle: string) => {
    // console.log("friendHandle", friendHandle);
    if (!friendHandle.trim()) {
      showError("Please enter a valid X handle");
      return;
    }
    if (friendHandle.startsWith("@")) {
      friendHandle = friendHandle.substring(1);
    }

    if (session.data && session.data?.user.id_str) {
      setLoading(true);
      const id_str = session.data?.user.id_str;
      const bearer_token = session.data?.user.access_token;

      try {
        const friendIdResponse = await axios.get(
          `/api/user_id?user_handle=${friendHandle}&bearer_token=${bearer_token}`
        );

        const friendId = friendIdResponse.data.id;

        const { data: existingRoom, error: roomError } = await supabase
          .from("rooms")
          .select("*")
          .eq("profile_id", friendId)
          .eq("author_id", id_str);

        if (!roomError && existingRoom.length > 0) {
          localStorage.setItem("roomData", JSON.stringify(existingRoom));
          localStorage.setItem("roomDataUser", friendHandle);
          const room_id = existingRoom[0].id;
          router.push(`/bedroom/${friendHandle}/${room_id}`);
        } else {
          const tweets = await axios.get(
            `/api/user_tweets?user_id=${friendId}&bearer_token=${bearer_token}`
          );

          const analyze = await axios.post(`api/analyze_user_tweets`, {
            tweets: tweets.data,
            liked_tweets: tweets.data,
          });

          const { data: newRoom, error: insertError } = await supabase
            .from("rooms")
            .insert({
              author_id: id_str,
              profile_id: friendId,
              prompt_response: {
                response: analyze.data.data,
              },
            })
            .select();

          if (!!newRoom && !insertError) {
            localStorage.setItem("roomData", JSON.stringify(newRoom));
            localStorage.setItem("roomDataUser", friendHandle);
            const room_id = newRoom[0].id;
            router.push(`/bedroom/${friendHandle}/${room_id}`);
          } else {
            throw new Error("Failed to create room");
          }
        }
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 404) {
          showError(`@${friendHandle} doesn't exist on X`);
        } else if (axios.isAxiosError(err) && err.response?.status === 500) {
          showError(`@${friendHandle} may not be public. Please try again.`);
        }
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) {
    return <AnimatedLoadingText />;
  }

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center">
      {/* Error Alert Overlay */}
      {error && <ErrorOverlay message={error} />}

      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://madeonverse.com/video/sky-30fps-reduced.webp"
          alt="Animated sky background"
          className="hidden lg:block object-cover w-full h-full"
        />
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
        {/* Left Section */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 lg:p-24 lg:bg-black text-black lg:text-white min-h-screen lg:min-h-0">
          <div className="flex flex-col items-center max-w-4xl w-full flex-1 lg:flex-initial justify-center sm:pt-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 lg:mb-6 minecraft-font text-center flex flex-col gap-4 sm:gap-4 lg:gap-4">
              <span>YOUR</span>
              <span>X</span>
              <span>BEDROOM</span>
            </h1>
            <p className="text-[20px] lg:text-[24px] mb-4 sm:mb-6 lg:mb-6 text-center max-w-xs lg:max-w-md mx-auto">
              Find out what your bedroom looks like based off your X profile
            </p>

            {session.status !== "authenticated" ? (
              <SignIn />
            ) : (
              <div className="w-full flex flex-col gap-8 items-center">
                <div className="w-full flex flex-col lg:flex-row lg:items-start lg:gap-8">
                  {/* Left side - Generate My Bedroom */}
                  <div className="w-full lg:w-1/2 text-center mb-8 lg:mb-0 flex flex-col justify-between items-center">
                    {session.data && session.data?.user.handle && (
                      <h1 className="text-2xl lg:text-2xl font-bold mb-6 lg:mb-4">
                        Welcome, @{session.data?.user.handle}
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
                  <div className="w-full lg:w-1/2 text-center flex flex-col justify-between items-center">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        const target = e.currentTarget;
                        const friendHandle = (
                          target.elements[0] as HTMLInputElement
                        ).value;
                        generateFriendBedroom(friendHandle);
                      }}
                      className="flex flex-col gap-4 w-full items-center"
                    >
                      <input
                        id="friendInput"
                        type="text"
                        className="w-64 lg:w-full p-2 rounded text-black bg-gray-200 text-sm lg:text-base"
                        placeholder="Enter any public X handle"
                      />
                      <button
                        type="submit"
                        className="w-48 lg:w-full px-4 py-3 lg:px-6 lg:py-4 bg-black lg:bg-blue-500 text-white rounded-full hover:bg-gray-800 lg:hover:bg-blue-600 transition-colors text-sm lg:text-base"
                      >
                        Generate
                      </button>
                    </form>
                  </div>
                  <div className=""></div>
                </div>

                <button
                  className="px-4 py-2 bg-white border border-white text-black rounded-full items-center w-[100px] mt-4 hover:bg-black hover:text-white"
                  onClick={() => {
                    signOut();
                    localStorage.removeItem("roomData");
                  }}
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Section - Only visible on desktop */}
        <div className="hidden lg:flex w-full lg:w-1/2 relative flex-col items-center justify-between lg:p-12 bg-black bg-opacity-30 h-full ">
          <div className="absolute top-5 right-5">
            <AudioControlButton />
          </div>
          <div className="flex-grow flex items-center justify-center w-full h-full">
            <img
              src="/hero-x-decorated.svg"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex text-white text-right self-end gap-2 mb-2 pb-4">
            <TeamProfiles />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternetBedroomPage;
