// EditableComponent.tsx

import React, { useState, useRef } from "react";
import Draggable from "react-draggable"; // Import Draggable
import Image from "next/image"; // Next.js Image component

interface Element {
  id: string;
  type: string;
  src: string;
  initialX: number;
  initialY: number;
}

const EditableComponent: React.FC = () => {
  const [elements, setElements] = useState<Element[]>([
    // Initialize with draggable elements
    {
      id: "1",
      type: "radio",
      src: "/assets/radio.png",
      initialX: 50,
      initialY: 50,
    },
    // Add more elements as needed
  ]);

  const addElement = (element: Element) => {
    setElements([...elements, element]);
  };

  return (
    <div className="relative w-full h-full bg-black text-white p-4">
      {/* ...header content */}

      {/* Container for base image and draggable elements */}
      <div className="relative w-full h-full">
        {/* Base Image */}
        <Image
          src="/assets/table-chair.png"
          alt="Table and Chair"
          layout="fill"
          objectFit="contain"
          draggable={false}
        />

        {/* Draggable Elements */}
        {elements.map((element) => (
          <DraggableElement key={element.id} {...element} />
        ))}
      </div>
    </div>
  );
};

const DraggableElement: React.FC<Element> = ({
  id,
  type,
  src,
  initialX,
  initialY,
}) => {
  const nodeRef = useRef(null);

  return (
    <Draggable defaultPosition={{ x: initialX, y: initialY }} nodeRef={nodeRef}>
      <div ref={nodeRef} style={{ touchAction: "none", userSelect: "none" }}>
        <img
          src={src}
          alt={type}
          width={50} // Adjust size as needed
          height={50}
          draggable={false} // Prevent default drag behavior
          style={{ pointerEvents: "none" }} // Ensure the img doesn't capture pointer events
        />
      </div>
    </Draggable>
  );
};

export default EditableComponent;
