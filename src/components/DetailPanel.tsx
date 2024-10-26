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

  return (
    <div className="w-[300px] h-[500px] bg-white p-4 ml-4 rounded-lg shadow-lg">
      {hoveredElement ? (
        <div className="text-black">
          <p>
            <strong>Name:</strong> {hoveredElement.name}
          </p>
          <p>
            <strong>Description:</strong> {hoveredElement.description}
          </p>
          <p>
            <strong>Category:</strong> {hoveredElement.category}
          </p>
          <p>
            <strong>ID:</strong> {hoveredElement.id}
          </p>
        </div>
      ) : (
        <p className="text-[#A9A9A9]">
          Hover over an element to see its details.
        </p>
      )}
    </div>
  );
};

export default DetailPanel;
