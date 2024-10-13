"use client";
// EditableComponent.tsx
import React, { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import assetsData from "../app/assets.json";

interface Element {
  id: string;
  type: string;
  src: string;
  category: string;
  initialX: number;
  initialY: number;
}

const EditableComponent: React.FC = () => {
  const [elements, setElements] = useState<Element[]>([]);
  const [windowDimensions, setWindowDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [elementsInitialized, setElementsInitialized] = useState(false);

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
  const categoryPositions = {
    PETS: { x: 100, y: 100 },
    FOOD: { x: 150, y: 250 },
    SHELF_1: { x: 400, y: 100 },
    SHELF_2: { x: 500, y: 150 },
    CHAIR: {
      x: windowDimensions.width ? windowDimensions.width - 150 : 150,
      y: windowDimensions.height ? windowDimensions.height / 2 : 100,
    },
    RUG: { x: 200, y: 300 },
    POSTER1: { x: 80, y: 90 },
    TABLE1: { x: 50, y: 50 },
    TABLE2: { x: 60, y: 60 },
    TABLE3: { x: 70, y: 70 },
    TABLE4: { x: 80, y: 80 },
    GROUND1: { x: 90, y: 90 },
    CEILING: { x: 100, y: 100 },
  };

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const addElement = (element: Omit<Element, "initialX" | "initialY">) => {
    setElements((prevElements) => {
      if (prevElements.some((el) => el.id === element.id)) {
        return prevElements;
      }
      const position = categoryPositions[element.category];

      const newElement: Element = {
        ...element,
        initialX: position ? position.x : 0,
        initialY: position ? position.y : 0,
      };

      return [...prevElements, newElement];
    });
  };
  let backgroundColor = getRandomColor();

  // Initialize elements when windowDimensions are available
  useEffect(() => {
    if (
      !elementsInitialized &&
      windowDimensions.width &&
      windowDimensions.height
    ) {
      addElement({
        id: "1",
        type: "poster",
        src: "/assets/posters/american_flag.png",
        category: "POSTER1",
      });
      addElement({
        id: "2",
        type: "poster",
        src: "/assets/posters/doge.png",
        category: "POSTER1",
      });
      addElement({
        id: "3",
        type: "pet",
        src: "/assets/pets/pets2.webp",
        category: "PETS",
      });
      //   id: "2",
      //   type: "chair",
      //   src: "/assets/chair.webp",3x
      //   category: "CHAIR",
      // });
      setElementsInitialized(true);
    }
  }, [windowDimensions, elementsInitialized]);

  return (
    <div
      className="relative w-full min-h-screen text-white p-4"
      style={{ backgroundColor }}
    >
      {/* Container for base image and draggable elements */}
      <div className="relative w-full h-full">
        {/* Base Image */}
        {/* <Image
          src="/assets/table-chair.png"
          alt="Table and Chair"
          layout="fill"
          objectFit="contain"
          draggable={false}
          style={{ marginTop: "auto" }} // Adjust this value as needed
        /> */}
        <img
          src="/assets/table-chair.png"
          alt="Table and Chair"
          style={{
            width: "250px",
            height: "250px",
            position: "absolute",
            bottom: "-200px",
            left: "10px",
            // zIndex: -1, // Lower the z-index
          }}
        />
        {/* <div className="absolute inset-x-0 bottom-0 h-2/3">
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

  // Define desired heights for each category
  const categoryHeights: { [key in Element["category"]]: number } = {
    PETS: 100,
    FOOD: 80,
    SHELF_1: 150,
    SHELF_2: 150,
    CHAIR: 200,
    RUG: 100,
    POSTER1: 120,
    TABLE1: 150,
    TABLE2: 150,
    TABLE3: 150,
    TABLE4: 150,
    GROUND1: 150,
    CEILING: 150,
  };

  const desiredHeight = categoryHeights[category];

  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight } = event.currentTarget;

    if (naturalWidth && naturalHeight) {
      let scaleFactor = desiredHeight / naturalHeight;

      if (scaleFactor > 1) {
        scaleFactor = 1;
      }

      const finalWidth = naturalWidth * scaleFactor;
      const finalHeight = naturalHeight * scaleFactor;

      setDimensions({ width: finalWidth, height: finalHeight });
    }
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
            display: dimensions ? "block" : "none",
            zIndex: 100,
          }}
          draggable={false}
        />
      </div>
    </Draggable>
  );
};

export default EditableComponent;
