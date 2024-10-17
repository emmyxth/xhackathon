import React, { useState } from "react";
import EditableComponent from "./EditableComponent";
import DetailPanel from "./DetailPanel";

const Bedroom: React.FC = () => {
  const [hoveredElementName, setHoveredElementName] = useState<string | null>(
    null
  );

  const handleElementHover = (name: string | null) => {
    setHoveredElementName(name);
  };

  return (
    <div className="flex flex-col space-y-8 md:flex-row md:space-y-0 md:gap-16">
      <EditableComponent onElementHover={handleElementHover} />
      <DetailPanel hoveredElementName={hoveredElementName} />
    </div>
  );
};

export default Bedroom;
