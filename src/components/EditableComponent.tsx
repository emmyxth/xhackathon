"use client";
import React, { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";

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

  const getRandomPosition = () => {
    const margin = 100; // Margin from the edges
    return {
      x: Math.random() * (windowDimensions.width - 2 * margin) + margin,
      y: Math.random() * (windowDimensions.height - 2 * margin) + margin,
    };
  };

  const addElement = (element: Omit<Element, "initialX" | "initialY">) => {
    setElements((prevElements) => {
      if (prevElements.some((el) => el.id === element.id)) {
        return prevElements;
      }
      const position = getRandomPosition();

      const newElement: Element = {
        ...element,
        initialX: position.x,
        initialY: position.y,
      };

      return [...prevElements, newElement];
    });
  };

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  let backgroundColor = getRandomColor();

  // Initialize elements when windowDimensions are available
  useEffect(() => {
    if (
      !elementsInitialized &&
      windowDimensions.width &&
      windowDimensions.height
    ) {
      // addElement({
      //   id: "1",
      //   type: "poster",
      //   src: "/assets/posters/american_flag.png",
      //   category: "POSTER1",
      // });
      // addElement({
      //   id: "2",
      //   type: "poster",
      //   src: "/assets/posters/doge.png",
      //   category: "POSTER1",
      // });
      // addElement({
      //   id: "3",
      //   type: "pet",
      //   src: "/assets/pets/C3PO.webp",
      //   category: "PETS",
      // });
      // addElement({
      //   id: "4",
      //   type: "chair",
      //   src: "/assets/chair/ASSET_9.webp",
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
      <div className="relative w-full h-full">
        <img
          src="/assets/table-chair.png"
          alt="Table and Chair"
          style={{
            width: "250px",
            height: "250px",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, 60%)",
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
      <div
        ref={nodeRef}
        style={{
          touchAction: "none",
          userSelect: "none",
          position: "absolute",
        }}
      >
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
