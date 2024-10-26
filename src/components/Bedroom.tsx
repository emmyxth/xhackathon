import React, { useState, useCallback } from "react";
import EditableComponent from "./EditableComponent";
import DetailPanel from "./DetailPanel";

interface BedroomProps {
  onStateChange: (elements: any[], backgroundColor: string) => void;
}

const Bedroom: React.FC<BedroomProps> = ({ onStateChange }) => {
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
    </div>
  );
};

export default Bedroom;
