"use client";
import { signIn, signOut, useSession } from "next-auth/react";


export function SignIn() {
  const session = useSession();
  return (
    <button
      className="bg-black text-white flex items-center justify-center rounded-full p-6 minecraft-font text-3xl"
      onClick={() => signIn("twitter")}
      style={{ width: '400px', height: '80px' }}
    >
      {/* <svg width="40" height="40" viewBox="0 0 1200 1227"
        <path
          d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"
          fill="white"
        ></path>
      </svg> */}
      Connect to X
    </button>
  );
}

export function SignOut({ handle }: { handle: string }) {
  return (
    <div className="dropdown dropdown-bottom dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-outline">
        <svg width="20" height="20" viewBox="0 0 1200 1227">
          <path
            d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"
            fill="black"
          ></path>
        </svg>
        @{handle}
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
      >
        <li>
          <button
            onClick={() => signOut()}
            className="text-black hover:bg-red-600"
          >
            Sign out
          </button>
        </li>
      </ul>
    </div>
  );
}
