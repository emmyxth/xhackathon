import React, { useState } from "react";

interface Element {
  id: string;
  type: string;
  props: any;
}

const EditableComponent: React.FC = () => {
  const [elements, setElements] = useState<Element[]>([]);

  const addElement = (element: Element) => {
    setElements([...elements, element]);
  };

  return (
    <div className="relative w-full h-full text-white">
      <img
        src="https://discz-production-s3-bucket.s3.amazonaws.com/background/1dfe3775-12fb-41d6-98fa-068f7233b59a.png"
        className="h-full w-full object-cover"
        alt="Background"
      />
    </div>
  );
};

const DraggableElement: React.FC<Element> = ({ type, props }) => {
  // Implement draggable functionality here
  return <div>{/* Render element based on type */}</div>;
};

export default EditableComponent;
