import React from "react";

interface ElementDetail {
  name: string;
  description: string;
  id: number;
  category: string;
}

interface DetailPanelProps {
  hoveredElementName: string | null;
  items: { category: string; object: string; reasoning: string }[];
}

const DetailPanel: React.FC<DetailPanelProps> = ({
  hoveredElementName,
  items,
}) => {
  const hoveredElement = hoveredElementName
    ? items.find(
        (i: { category: string; object: string; reasoning: string }) =>
          i.object === hoveredElementName
      )
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
            {formatName(hoveredElement.object)}
          </h2>
          <p className="text-gray-700 flex-grow">{hoveredElement.reasoning}</p>
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
