import React from "react";
import elementDetails from "../../image_retrieval/items_description.json";

interface ElementDetail {
  name: string;
  description: string;
  id: number;
  category: string;
}

interface DetailPanelProps {
  hoveredElementName: string | null;
}

const DetailPanel: React.FC<DetailPanelProps> = ({ hoveredElementName }) => {
  const hoveredElement = hoveredElementName
    ? elementDetails.find((el) => el.name === hoveredElementName)
    : null;

  const formatName = (name: string) => {
    return name
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  return (
    <div className="w-[300px] h-[500px] bg-white p-4 ml-4 rounded-lg shadow-lg flex flex-col">
      {hoveredElement ? (
        <div className="text-black h-full flex flex-col">
          <h2 className="text-2xl font-bold mb-4">
            {formatName(hoveredElement.name)}
          </h2>
          <p className="text-gray-700 flex-grow">
            {hoveredElement.description}
          </p>
        </div>
      ) : (
        <div className="h-full flex items-center justify-center">
          <p className="text-[#A9A9A9] text-center">
            Hover over an element to see its details.
          </p>
        </div>
      )}
    </div>
  );
};

export default DetailPanel;
