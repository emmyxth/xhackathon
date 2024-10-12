// pages/page1.tsx
import EditableComponent from "@/components/EditableComponent"; // Ensure the path is correct
import ElementPanel from "@/components/ElementPanel"; // Corrected the path
import Link from "next/link";
import React from "react";

const VersePage: React.FC = () => {
  return (
    <div className="flex flex-col h-screen bg-blue-300">
      <header className="p-4">
        <Link href={"/hello"}>
          <h1 className="text-2xl font-bold">My X Bedroom</h1>
        </Link>
      </header>

      <main className="flex-grow flex flex-row gap-12 items-center justify-center space-y-4">
        <div className="w-[375px] h-[full] max-h-[80%] bg-black rounded-3xl overflow-hidden">
          <EditableComponent />
        </div>
        <div className="w-[375px] h-[200px] bg-blue-200 rounded-lg overflow-y-auto">
          <ElementPanel />
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
