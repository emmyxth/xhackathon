import React, { useState, useCallback } from "react";
import EditableComponent from "./EditableComponent";
import DetailPanel from "./DetailPanel";

interface BedroomProps {
  onStateChange: (elements: any[], backgroundColor: string) => void;
  bedroomState: {
    elements: any[];
    backgroundColor: string;
  } | null;
}

const Bedroom: React.FC<BedroomProps> = ({ onStateChange, bedroomState }) => {
  const [hoveredElementName, setHoveredElementName] = useState<string | null>(
    null
  );

  const handleElementHover = (name: string | null) => {
    setHoveredElementName(name);
  };

  const memoizedOnStateChange = useCallback(
    (elements: any[], backgroundColor: string) => {
      onStateChange(elements, backgroundColor);
    },
    [onStateChange]
  );

  const generateShareableURL = () => {
    if (bedroomState) {
      const encodedState = btoa(JSON.stringify(bedroomState));
      console.log("bed state", bedroomState);
      return `${window.location.origin}${window.location.pathname}?state=${encodedState}`;
    }
    return "";
  };

  const copyShareableURL = () => {
    const url = generateShareableURL();
    if (url) {
      navigator.clipboard
        .writeText(url)
        .then(() => alert("Shareable URL copied to clipboard!"))
        .catch((err) => console.error("Failed to copy URL: ", err));
    } else {
      alert("Unable to generate shareable URL. Please try again.");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 style={{ textAlign: "center", fontSize: "2em" }}>
        <strong>@xyz</strong>'s bedroom
      </h1>
      <div className="flex flex-col space-y-8 md:flex-row md:space-y-0 md:gap-16">
        <EditableComponent
          onElementHover={handleElementHover}
          onStateChange={memoizedOnStateChange}
        />
        <DetailPanel hoveredElementName={hoveredElementName} />
      </div>
      <button
        className="px-4 py-2 bg-black border border-white text-white rounded-full mr-2 w-[20%] self-center hover:bg-white hover:text-black"
        onClick={copyShareableURL}
      >
        Copy link
      </button>
    </div>
  );
};

export default Bedroom;
