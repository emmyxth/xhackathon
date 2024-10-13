"use client";
// EditableComponent.tsx
import Image from 'next/image';
import React, { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import assetsData from '../app/assets.json';

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
  "rotating_red_heart_animation"
];

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

  const categoryPositions = {
    PETS: { x: 100, y: 100 },
    FOOD: { x: 150, y: 250 },
    SHELF1: { x: 400, y: 100 },
    SHELF2: { x: 500, y: 150 },
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

  const addElement = (element: Omit<Element, "initialX" | "initialY">) => {
    setElements((prevElements) => {
      if (prevElements.some((el) => el.id === element.id)) {
        return prevElements;
      }
      const position = categoryPositions[element.category as keyof typeof categoryPositions];

      const newElement: Element = {
        ...element,
        initialX: position ? position.x : 0,
        initialY: position ? position.y : 0,
      };

      return [...prevElements, newElement];
    });
  };

  const backgroundColor = getRandomColor();
  const loadAssetsFromJson = () => {
    const categoryOrder = [
      "PETS", "FOOD", "SHELF_1", "SHELF_2", "CHAIR", "RUG", "POSTER1",
      "SHELF1", "SHELF2", "TABLE1", "TABLE2", "TABLE3", "TABLE4", "GROUND1", "CEILING"
    ];

    const categoryMapping = {
      CEILING: "GIF",
      SHELF_1: "DECOR", SHELF_2: "DECOR", SHELF1: "DECOR", SHELF2: "DECOR",
      TABLE1: "DECOR", TABLE2: "DECOR", TABLE3: "DECOR", TABLE4: "DECOR", GROUND1: "DECOR",
      POSTER1: "POSTER" // Added this line to map POSTER1 to POSTER
    };

    example_items.forEach((item, index) => {
      const originalCategory = categoryOrder[index % categoryOrder.length];
      const category = categoryMapping[originalCategory as keyof typeof categoryMapping] || originalCategory;
      let src = "";

      if (category === "GIF") {
        src = assetsData.GIF.ASSET_15[1];
      } else {
        const assetEntry = Object.entries(assetsData[category as keyof typeof assetsData]).find(([_, value]) => value[0] === item);
        if (assetEntry) {
          src = assetEntry[1][1];
        }
      }

      if (src) {
        addElement({
          id: `asset_${index}`,
          type: originalCategory.toLowerCase(),
          src: src,
          category: originalCategory,
        });
      }
    });
  };

  useEffect(() => {
    if (
      !elementsInitialized &&
      windowDimensions.width &&
      windowDimensions.height
    ) {
      loadAssetsFromJson();
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

  const categoryHeights: { [key: string]: number } = {
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
