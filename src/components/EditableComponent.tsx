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
    <div className="relative w-full h-full bg-black text-white p-4">
      <h2 className="text-3xl font-bold text-center py-4">DISCO BRAT</h2>
      <p className="text-center">monemmy's Internet Bedroom</p>
      {elements.map((element) => (
        <DraggableElement key={element.id} {...element} />
      ))}
      {/* Add more default elements here */}
    </div>
  );
};

const DraggableElement: React.FC<Element> = ({ type, props }) => {
  // Implement draggable functionality here
  return <div>{/* Render element based on type */}</div>;
};

export default EditableComponent;
