"use client";

import React, { useState, useEffect, useRef } from "react";
import Draggable from "react-draggable";
import Image from "next/image";

interface Element {
  id: string;
  type: string;
  src: string;
  initialX: number;
  initialY: number;
  category:
    | "PETS"
    | "FOOD"
    | "SHELF_1"
    | "SHELF_2"
    | "CHAIR"
    | "RUG"
    | "POSTER1"
    | "SHELF1"
    | "SHELF2"
    | "TABLE1"
    | "TABLE2"
    | "TABLE3"
    | "TABLE4"
    | "GROUND1"
    | "CEILING";
}
const categoryHeights: { [key in Element["category"]]: number } = {
  PETS: 80,
  FOOD: 80,
  SHELF_1: 50,
  SHELF_2: 50,
  CHAIR: 300,
  RUG: 60,
  POSTER1: 70,
  TABLE1: 70,
  TABLE2: 70,
  TABLE3: 70,
  TABLE4: 70,
  GROUND1: 70,
  CEILING: 70,
};

const EditableComponent: React.FC = () => {
  const [elements, setElements] = useState<Element[]>([]);
  const [windowDimensions, setWindowDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const updateWindowDimensions = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateWindowDimensions();
    window.addEventListener("resize", updateWindowDimensions);

    return () => {
      window.removeEventListener("resize", updateWindowDimensions);
    };
  }, []);

  // Define positions for each category
  const categoryPositions: {
    [key in Element["category"]]: { x: number; y: number };
  } = {
    PETS: { x: 100, y: 200 },
    FOOD: { x: 150, y: 250 },
    SHELF_1: { x: 400, y: 100 },
    SHELF_2: { x: 500, y: 150 },
    CHAIR: {
      x: windowDimensions.width ? windowDimensions.width - 150 : 150, // Default value if width is not available
      y: windowDimensions.height ? windowDimensions.height / 2 : 150, // Default value if height is not available
    },
    RUG: { x: 200, y: 300 },
    POSTER1: { x: 10, y: 10 },
    TABLE1: { x: 50, y: 50 },
    TABLE2: { x: 60, y: 60 },
    TABLE3: { x: 70, y: 70 },
    TABLE4: { x: 80, y: 80 },
    GROUND1: { x: 90, y: 90 },
    CEILING: { x: 100, y: 100 },
  };

  console.log(categoryPositions);

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const addElement = (element: Omit<Element, "initialX" | "initialY">) => {
    const position = categoryPositions[element.category];

    const newElement: Element = {
      ...element,
      initialX: position ? position.x : 0,
      initialY: position ? position.y : 0,
    };

    setElements([...elements, newElement]);
  };

  // Initialize elements on component mount
  useEffect(() => {
    addElement({
      id: "1",
      type: "radio",
      src: "/assets/radio.png",
      category: "POSTER1",
    });
    addElement({
      id: "2",
      type: "chair",
      src: "/assets/chair.webp",
      category: "CHAIR",
    });
    // Add more elements as needed
  }, [windowDimensions]);

  const backgroundColor = getRandomColor();

  return (
    <div
      className="relative w-full h-full text-white p-4"
      style={{ backgroundColor }}
    >
      <h2 className="text-3xl font-bold text-center py-4">DISCO BRAT</h2>
      <p className="text-center">Emmy's Internet Bedroom</p>

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
  category,
}) => {
  const nodeRef = useRef(null);
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);

  const desiredHeight = categoryHeights[category];

  const handleImageLoad = (event) => {
    const { naturalWidth, naturalHeight } = event.target;

    // Calculate the scaling factor
    let scaleFactor = desiredHeight / naturalHeight;

    // Prevent scaling beyond natural size
    if (scaleFactor > 1) {
      scaleFactor = 1;
    }

    // Calculate final dimensions
    const finalWidth = naturalWidth * scaleFactor;
    const finalHeight = naturalHeight * scaleFactor;

    setDimensions({ width: finalWidth, height: finalHeight });
  };

  return (
    <Draggable defaultPosition={{ x: initialX, y: initialY }} nodeRef={nodeRef}>
      <div ref={nodeRef} style={{ touchAction: "none", userSelect: "none" }}>
        <img
          src={src}
          alt={type}
          onLoad={handleImageLoad}
          width={dimensions ? dimensions.width : undefined}
          height={dimensions ? dimensions.height : undefined}
          style={{
            pointerEvents: "none",
            display: dimensions ? "block" : "none", // Hide until dimensions are calculated
          }}
          draggable={false}
        />
      </div>
    </Draggable>
  );
};

export default EditableComponent;
