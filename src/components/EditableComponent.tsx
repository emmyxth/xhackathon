"use client";
// EditableComponent.tsx
import React, { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import assets from "../../image_retrieval/assets.json";

const example_items = [
  "PETS",
  "FOOD",
  "SHELF_1",
  "SHELF_2",
  "CHAIR",
  "RUG",
  "POSTER1",
  "SHELF1",
  "SHELF2",
  "TABLE1",
  "TABLE2",
  "TABLE3",
  "TABLE4",
  "GROUND1",
  "CEILING",
];

const categoryMapping = {
  PETS: "PETS",
  FOOD: "FOOD",
  SHELF_1: "DECOR",
  SHELF_2: "DECOR",
  CHAIR: "CHAIR",
  RUG: "RUG",
  POSTER1: "POSTER",
  SHELF1: "DECOR",
  SHELF2: "DECOR",
  TABLE1: "DECOR",
  TABLE2: "DECOR",
  TABLE3: "DECOR",
  TABLE4: "DECOR",
  GROUND1: "DECOR",
  CEILING: "GIF",
};

interface Element {
  id: string;
  type: string;
  src: string;
  category: string;
  initialX: number;
  initialY: number;
}

// Define positions for each category
const categoryPositions = {
  PETS: { x: -20, y: 280 },
  FOOD: { x: 100, y: 130 },
  SHELF_1: { x: 400, y: 100 },
  SHELF_2: { x: 500, y: 150 },
  CHAIR: { x: 200, y: 220 },
  RUG: { x: 200, y: 300 },
  POSTER1: { x: 30, y: 20 },
  TABLE1: { x: 50, y: 50 },
  TABLE2: { x: 60, y: 60 },
  TABLE3: { x: 70, y: 70 },
  TABLE4: { x: 80, y: 80 },
  GROUND1: { x: 90, y: 90 },
  CEILING: { x: 100, y: 100 },
};

const EditableComponent: React.FC = () => {
  const [elements, setElements] = useState<Element[]>([]);
  const [windowDimensions, setWindowDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [elementsInitialized, setElementsInitialized] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("");

  useEffect(() => {
    const updateWindowDimensions = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateWindowDimensions();
    window.addEventListener("resize", updateWindowDimensions);

    // Generate random background color
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    setBackgroundColor(randomColor);

    return () => {
      window.removeEventListener("resize", updateWindowDimensions);
    };
  }, []);

  const getRandomPosition = () => {
    const margin = 100; // Margin from the edges
    return {
      x: Math.random() * (windowDimensions.width - 2 * margin) + margin,
      y: Math.random() * (windowDimensions.height - 2 * margin) + margin,
    };
  };

  const getRandomAsset = (category: string) => {
    const categoryAssets = assets[category as keyof typeof assets];
    if (!categoryAssets) return null;
    const assetKeys = Object.keys(categoryAssets);
    const randomKey = assetKeys[Math.floor(Math.random() * assetKeys.length)];
    return categoryAssets[randomKey as keyof typeof categoryAssets];
  };

  const addElement = (elementType: string, index: number) => {
    const category =
      categoryMapping[elementType as keyof typeof categoryMapping];
    const asset = getRandomAsset(category);
    if (!asset) return;

    const [name, src] = asset;
    const fileExtension = src.split(".").pop()?.toLowerCase();
    const type = fileExtension === "gif" ? "gif" : "image";

    setElements((prevElements) => {
      const position = categoryPositions[
        category as keyof typeof categoryPositions
      ] || { x: 0, y: 0 };
      const newElement: Element = {
        id: `${elementType}-${index}`,
        type,
        src,
        category: elementType,
        initialX: position.x,
        initialY: position.y,
      };
      return [...prevElements, newElement];
    });
  };

  // Initialize elements when windowDimensions are available
  useEffect(() => {
    if (
      !elementsInitialized &&
      windowDimensions.width &&
      windowDimensions.height
    ) {
      example_items.forEach((item, index) => {
        addElement(item, index);
      });
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
            top: "50%",
            left: "50%",
            transform: "translate(-50%, 80%)",
          }}
        />
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
    PETS: 200,
    FOOD: 80,
    SHELF_1: 150,
    SHELF_2: 150,
    CHAIR: 230,
    RUG: 100,
    POSTER1: 100,
    TABLE1: 150,
    TABLE2: 150,
    TABLE3: 150,
    TABLE4: 150,
    GROUND1: 150,
    CEILING: 150,
    DECOR: 100,
    GIF: 100,
  };

  const desiredHeight = categoryHeights[category] || 100;

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
      <div
        ref={nodeRef}
        style={{
          touchAction: "none",
          userSelect: "none",
          position: "absolute",
        }}
      >
        {type === "gif" ? (
          <img
            src={src}
            alt={category}
            style={{
              width: `${desiredHeight}px`,
              height: "auto",
              pointerEvents: "none",
            }}
            draggable={false}
          />
        ) : (
          <img
            src={src}
            alt={category}
            onLoad={handleImageLoad}
            width={dimensions ? dimensions.width : undefined}
            height={dimensions ? dimensions.height : undefined}
            style={{
              pointerEvents: "none",
              display: dimensions ? "block" : "none",
            }}
            draggable={false}
          />
        )}
      </div>
    </Draggable>
  );
};

export default EditableComponent;
