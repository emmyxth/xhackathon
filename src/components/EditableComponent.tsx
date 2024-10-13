"use client";
// EditableComponent.tsx
import React, { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";

const example_items = [
  "shiba_inu_dog_laying_down",
  "haribo_goldbears_packaging",
  "flower_shaped_chair",
  "white_brown_rug",
  "teddy_bear",
  "spiderman_funko_pop_figure",
  "blue_lava_lamp",
  "cinnamoroll_plush_toy",
  "potted_monstera_plant",
  "pilea_plant_in_pot",
  "plush_mouse_toy_with_pink_bow",
  "anime_character_figure",
  "gumball_machine",
  "toy_doll_with_strawberry_helmet",
  "rotating_red_heart_animation",
];

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
  PETS: { x: 30, y: 300 },
  FOOD: { x: 150, y: 130 },
  SHELF_1: { x: 400, y: 120 },
  SHELF_2: { x: 500, y: 150 },
  CHAIR: { x: 0, y: 100 },
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

  // const addElement = (element: Omit<Element, "initialX" | "initialY">) => {
  //   setElements((prevElements) => {
  //     if (prevElements.some((el) => el.id === element.id)) {
  //       return prevElements;
  //     }
  //     const position = categoryPositions[element.category];
  //     console.log(position);

  //     const newElement: Element = {
  //       ...element,
  //       initialX: position.x,
  //       initialY: position.y,
  //     };

  //     return [...prevElements, newElement];
  //   });
  // };

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
      // addElement({
      //   id: "2",
      //   type: "poster",
      //   src: "/assets/posters/doge.png",
      //   category: "POSTER1",
      // });
      addElement({
        id: "3",
        type: "pet",
        src: "/assets/pets/C3PO.webp",
        category: "PETS",
      });
      addElement({
        id: "4",
        type: "chair",
        src: "/assets/radio.png",
        category: "FOOD",
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
    PETS: 100,
    FOOD: 80,
    SHELF_1: 150,
    SHELF_2: 150,
    CHAIR: 200,
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
        <img
          src={src}
          alt={type}
          onLoad={handleImageLoad}
          width={dimensions ? dimensions.width : undefined}
          height={dimensions ? dimensions.height : undefined}
          style={{
            pointerEvents: "none",
            display: dimensions ? "block" : "none",
          }}
          draggable={false}
        />
      </div>
    </Draggable>
  );
};

export default EditableComponent;
