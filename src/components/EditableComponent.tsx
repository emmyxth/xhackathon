"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import DraggableElement from "./DraggableElement";
import DetailPanel from "./DetailPanel";
import assets from "../../image_retrieval/assets.json";
import elementDetails from "../../image_retrieval/items_description.json";

const items = [
  "shiba_inu_dog_laying_down",
  "haribo_goldbears_packaging",
  "flower_shaped_chair",
  "green_checkered_cherry_rug",
  "american_flag",
  "teddy_bear",
  "pilea_plant_in_pot",
  "blue_lava_lamp",
  "cinnamoroll_plush_toy",
  "gumball_machine",
  "plush_mouse_toy_with_pink_bow",
  "toy_doll_with_strawberry_helmet",
  "anime_character_figure",
  "spiderman_funko_pop_figure",
  "potted_monstera_plant",
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
  GROUND2: "DECOR",
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
  "GROUND2",
];

interface Element {
  id: string;
  type: string;
  src: string;
  category: string;
  initialX: number;
  initialY: number;
}

interface ElementDetail {
  name: string;
  description: string;
  id: number;
  category: string;
}
// Define positions for each category
const categoryPositions = {
  PETS: { x: -20, y: 280 },
  FOOD: { x: 220, y: 210 },
  SHELF1: { x: 30, y: 25 },
  SHELF2: { x: 30, y: -65 },
  SHELF3: { x: -30, y: 25 },
  SHELF4: { x: -30, y: -65 },
  CHAIR: { x: 200, y: 220 },
  RUG: { x: 200, y: 300 },
  POSTER1: { x: 0, y: 0 },
  TABLE1: { x: 110, y: 130 },
  TABLE2: { x: 10, y: 130 },
  TABLE3: { x: 70, y: 130 },
  TABLE4: { x: 140, y: 130 },
  GROUND1: { x: 110, y: 260 },
  GROUND2: { x: 150, y: 350 },
  CEILING: { x: 100, y: 100 },
  GIF: { x: 240, y: 0 },
};

interface EditableComponentProps {
  onElementHover: (name: string | null) => void;
}

const EditableComponent: React.FC<EditableComponentProps> = ({
  onElementHover,
}) => {
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
        setBackgroundColor(
          `#${Math.floor(Math.random() * 16777215).toString(16)}`
        );
      }
    } else {
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
      className="relative w-[350px] h-[500px]"
      style={{ backgroundColor }}
      onClick={handleBackgroundClick}
    >
      <img
        src="/assets/bedroom-base.png"
        alt="Table and Chair"
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />
      {elements.map((element) => (
        <DraggableElement
          key={element.id}
          {...element}
          isSelected={selectedElementId === element.id}
          onClick={(event) => handleElementClick(element.id, event)}
          onHover={(isHovered) =>
            onElementHover(isHovered ? element.id.split("-")[0] : null)
          }
        />
      ))}
      <button
        onClick={copyShareableURL}
        className="absolute bottom-4 right-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Share URL
      </button>
    </div>
  );
};

export default EditableComponent;
