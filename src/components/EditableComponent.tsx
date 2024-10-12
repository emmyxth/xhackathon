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
    | "desk1"
    | "desk2"
    | "chair"
    | "rug"
    | "poster1"
    | "poster2"
    | "shelf1"
    | "shelf2";
}

const categoryHeights: { [key in Element["category"]]: number } = {
  desk1: 80,
  desk2: 80,
  chair: 100,
  rug: 60,
  poster1: 70,
  poster2: 70,
  shelf1: 50,
  shelf2: 50,
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

  const categoryHeights: { [key in Element["category"]]: number } = {
    desk1: 80,
    desk2: 80,
    chair: 100,
    rug: 60,
    poster1: 70,
    poster2: 70,
    shelf1: 50,
    shelf2: 50,
  };
  // Define positions for each category
  const categoryPositions: {
    [key in Element["category"]]: { x: number; y: number };
  } = {
    desk1: { x: 100, y: 200 },
    desk2: { x: 150, y: 250 },
    chair: {
      x: windowDimensions.width ? windowDimensions.width - 100 : 300, // Default value if width is not available
      y: windowDimensions.height ? windowDimensions.height / 2 : 200, // Default value if height is not available
    },
    rug: { x: 200, y: 300 },
    poster1: { x: 10, y: 10 },
    poster2: { x: 300, y: 50 },
    shelf1: { x: 400, y: 100 },
    shelf2: { x: 500, y: 150 },
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
      category: "poster1",
    });
    addElement({
      id: "2",
      type: "chair",
      src: "/assets/chair.webp",
      category: "chair",
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
