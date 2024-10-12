// pages/page1.tsx

import React from "react";
import Image from "next/image";
import ElementPanel from "../src/components/ElementPanel";
import EditableComponent from "../src/components/EditableComponent";

const VersePage: React.FC = () => {
  return (
    <div className="flex flex-col h-screen bg-blue-300">
      <header className="p-4">
        <h1 className="text-2xl font-bold">VERSE</h1>
      </header>
      <main className="flex-grow flex">
        <div className="flex-grow p-4">
          <EditableComponent />
        </div>
        <aside className="w-64 bg-blue-200 p-4">
          <ElementPanel />
        </aside>
      </main>
      <footer className="p-4 flex justify-between items-center">
        <span>Powered by Verse</span>
        <div>
          <button className="px-4 py-2 bg-gray-800 text-white rounded mr-2">
            Get the app
          </button>
          <button className="px-4 py-2 bg-gray-800 text-white rounded mr-2">
            Copy link
          </button>
          <button className="px-4 py-2 bg-gray-800 text-white rounded">
            Save &amp; Share
          </button>
        </div>
      </footer>
    </div>
  );
};

export default VersePage;
