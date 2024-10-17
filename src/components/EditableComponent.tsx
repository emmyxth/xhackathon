"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import assets from "../../image_retrieval/assets.json";

const items = [
  "shiba_inu_dog_laying_down",
  "haribo_goldbears_packaging",
  "flower_shaped_chair",
  "green_checkered_cherry_rug",
  "american_flag",
  "teddy_bear",
  "spiderman_funko_pop_figure",
  "gumball_machine",
  "cinnamoroll_plush_toy",
  "plush_mouse_toy_with_pink_bow",
  "blue_lava_lamp",
  "potted_monstera_plant",
  "toy_doll_with_strawberry_helmet",
  "anime_character_figure",
  "pilea_plant_in_pot",
  "abstract_3d_structure",
];

const categoryOrder = [
  "PETS",
  "FOOD",
  "CHAIR",
  "RUG",
  "POSTER",
  "DECOR",
  "DECOR",
  "DECOR",
  "DECOR",
  "DECOR",
  "DECOR",
  "DECOR",
  "DECOR",
  "DECOR",
  "DECOR",
  "GIF",
];

const categoryMapping = {
  PETS: "PETS",
  FOOD: "FOOD",
  CHAIR: "CHAIR",
  RUG: "RUG",
  POSTER1: "POSTER",
  SHELF1: "DECOR",
  SHELF2: "DECOR",
  SHELF3: "DECOR",
  SHELF4: "DECOR",
  TABLE1: "DECOR",
  TABLE2: "DECOR",
  TABLE3: "DECOR",
  TABLE4: "DECOR",
  GROUND1: "DECOR",
  CEILING: "GIF",
};

const reverseCategoriesDecor = [
  "SHELF1",
  "SHELF2",
  "SHELF3",
  "SHELF4",
  "TABLE1",
  "TABLE2",
  "TABLE3",
  "TABLE4",
  "GROUND1",
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
  PETS: { x: -20, y: 280 },
  FOOD: { x: 200, y: 200 },
  SHELF1: { x: 30, y: 10 },
  SHELF2: { x: 30, y: -70 },
  SHELF3: { x: -30, y: 10 },
  SHELF4: { x: -30, y: -70 },
  CHAIR: { x: 200, y: 220 },
  RUG: { x: 200, y: 300 },
  POSTER1: { x: 0, y: 0 },
  TABLE1: { x: 100, y: 100 },
  TABLE2: { x: 10, y: 100 },
  TABLE3: { x: 70, y: 70 },
  TABLE4: { x: 80, y: 80 },
  GROUND1: { x: 90, y: 280 },
  CEILING: { x: 100, y: 100 },
  GIF: { x: 240, y: 0 },
};

const EditableComponent: React.FC = () => {
  const [elements, setElements] = useState<Element[]>([]);
  const [windowDimensions, setWindowDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [elementsInitialized, setElementsInitialized] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("");
  const [selectedElementId, setSelectedElementId] = useState<string | null>(
    null
  );
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const updateWindowDimensions = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateWindowDimensions();
    window.addEventListener("resize", updateWindowDimensions);

    // Parse URL parameters
    const urlState = searchParams.get("state");
    if (urlState) {
      try {
        const decodedState = JSON.parse(atob(urlState));
        setElements(decodedState.elements);
        setBackgroundColor(decodedState.backgroundColor);
        setElementsInitialized(true);
      } catch (error) {
        console.error("Failed to parse URL state:", error);
        // Generate random background color if URL parsing fails
        setBackgroundColor(
          `#${Math.floor(Math.random() * 16777215).toString(16)}`
        );
      }
    } else {
      // Generate random background color if no URL state
      setBackgroundColor(
        `#${Math.floor(Math.random() * 16777215).toString(16)}`
      );
    }

    return () => {
      window.removeEventListener("resize", updateWindowDimensions);
    };
  }, [searchParams]);

  const getRandomPosition = () => {
    const margin = 100;
    return {
      x: Math.random() * (windowDimensions.width - 2 * margin) + margin,
      y: Math.random() * (windowDimensions.height - 2 * margin) + margin,
    };
  };

  const addElement = (item: string, index: number) => {
    let category = categoryOrder[index];
    const assetCategory = assets[category as keyof typeof assets];
    const asset = Object.values(assetCategory).find(([name]) => name === item);

    if (!asset) return;
    if (category === "DECOR") {
      const decorIndex = index % reverseCategoriesDecor.length;
      category = reverseCategoriesDecor[decorIndex];
      // category =
      //   reverseCategoriesDecor[
      //     Math.floor(Math.random() * reverseCategoriesDecor.length)
      //   ];
    } else if (category == "POSTER") {
      category = "POSTER1";
    }
    console.log("category: ", category, "item:", item);
    const [name, src] = asset;
    const type =
      src.split(".").pop()?.toLowerCase() === "gif" ? "gif" : "image";
    console.log("type:", type);
    setElements((prevElements) => {
      const position =
        categoryPositions[category as keyof typeof categoryPositions];

      if (!position) {
        console.log("POSITION NOT", category);
      }

      const newElement: Element = {
        id: `${item}-${index}`,
        type,
        src,
        category,
        initialX: position.x,
        initialY: position.y,
      };
      return [...prevElements, newElement];
    });
  };

  useEffect(() => {
    if (
      !elementsInitialized &&
      windowDimensions.width &&
      windowDimensions.height
    ) {
      items.forEach((item, index) => addElement(item, index));
      setElementsInitialized(true);
    }
  }, [windowDimensions, elementsInitialized]);

  const generateShareableURL = () => {
    const state = { elements, backgroundColor };
    const encodedState = btoa(JSON.stringify(state));
    return `${window.location.origin}${window.location.pathname}?state=${encodedState}`;
  };

  const copyShareableURL = () => {
    navigator.clipboard
      .writeText(generateShareableURL())
      .then(() => alert("Shareable URL copied to clipboard!"))
      .catch((err) => console.error("Failed to copy URL: ", err));
  };

  const handleElementClick = (id: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setSelectedElementId(id);
  };

  const handleBackgroundClick = () => {
    setSelectedElementId(null);
  };

  return (
    <div
      className="relative w-full min-h-screen text-white p-4"
      style={{ backgroundColor }}
      onClick={handleBackgroundClick}
    >
      <div className="relative w-full h-full">
        <img
          src="/assets/bedroom-base.png"
          alt="Table and Chair"
          style={{
            width: "450px",
            height: "450px",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-55%, 0%)",
          }}
        />
        {elements.map((element) => (
          <DraggableElement
            key={element.id}
            {...element}
            isSelected={selectedElementId === element.id}
            onClick={(event) => handleElementClick(element.id, event)}
          />
        ))}
      </div>
      <button
        onClick={copyShareableURL}
        className="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Share URL
      </button>
    </div>
  );
};

interface DraggableElementProps extends Element {
  isSelected: boolean;
  onClick: (event: React.MouseEvent) => void;
}

const DraggableElement: React.FC<DraggableElementProps> = ({
  id,
  type,
  src,
  initialX,
  initialY,
  category,
  isSelected,
  onClick,
}) => {
  const nodeRef = useRef(null);
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [displayedText, setDisplayedText] = useState("");

  const categoryHeights: { [key: string]: number } = {
    PETS: 200,
    FOOD: 80,
    CHAIR: 230,
    RUG: 100,
    DECOR: 100,
    GIF: 100,
    SHELF1: 150,
    SHELF2: 150,
    SHELF3: 150,
    SHELF4: 150,
    POSTER1: 100,
    TABLE1: 150,
    TABLE2: 150,
    TABLE3: 150,
    TABLE4: 150,
    GROUND1: 150,
    CEILING: 150,
  };

  const desiredHeight = categoryHeights[category] || 150;

  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight } = event.currentTarget;
    if (naturalWidth && naturalHeight) {
      const scaleFactor = Math.min(1, desiredHeight / naturalHeight);
      setDimensions({
        width: naturalWidth * scaleFactor,
        height: naturalHeight * scaleFactor,
      });
    }
  };

  useEffect(() => {
    if (isHovered) {
      const text = "test";
      let index = 0;
      const intervalId = setInterval(() => {
        setDisplayedText(text.slice(0, index + 1));
        index++;
        if (index === text.length) {
          clearInterval(intervalId);
        }
      }, 100); // Adjust typing speed here

      return () => clearInterval(intervalId);
    } else {
      setDisplayedText("");
    }
  }, [isHovered]);

  return (
    <Draggable defaultPosition={{ x: initialX, y: initialY }} nodeRef={nodeRef}>
      <div
        ref={nodeRef}
        style={{
          touchAction: "none",
          userSelect: "none",
          position: "absolute",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
      >
        <div
          style={{
            position: "relative",
            display: "inline-block",
          }}
        >
          <img
            src={src}
            alt={category}
            onLoad={handleImageLoad}
            style={{
              width: type === "gif" ? `${desiredHeight}px` : dimensions?.width,
              height: type === "gif" ? "auto" : dimensions?.height,
              pointerEvents: "none",
              display: type === "gif" || dimensions ? "block" : "none",
            }}
            draggable={false}
          />
          {isSelected && (
            <div
              style={{
                position: "absolute",
                top: -2,
                left: -2,
                right: -2,
                bottom: -2,
                border: "2px solid black",
                pointerEvents: "none",
              }}
            />
          )}
        </div>
        {isHovered && (
          <div className="absolute top-0 left-full ml-2 bg-white text-black p-2 rounded shadow-md min-w-[60px] min-h-[24px]">
            {displayedText}
          </div>
        )}
      </div>
    </Draggable>
  );
};

export default EditableComponent;
