"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import assets from "../app/assets.json";
import DraggableElement from "./DraggableElement";

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
  reasoning: string;
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
  FOOD: { x: 200, y: 240 },
  SHELF1: { x: 30, y: 85 },
  SHELF2: { x: 30, y: -5 },
  SHELF3: { x: -30, y: 85 },
  SHELF4: { x: -30, y: -5 },
  CHAIR: { x: 200, y: 220 },
  RUG: { x: 80, y: 370 },
  POSTER1: { x: 180, y: 40 },
  TABLE1: { x: 110, y: 180 },
  TABLE2: { x: 10, y: 180 },
  TABLE3: { x: 70, y: 180 },
  TABLE4: { x: 140, y: 180 },
  GROUND1: { x: 110, y: 260 },
  GROUND2: { x: 150, y: 350 },
  CEILING: { x: 100, y: 100 },
  GIF: { x: 240, y: 0 },
};

interface EditableComponentProps {
  onElementHover: (name: string | null) => void;
  onStateChange: (elements: Element[], backgroundColor: string) => void;
  items: { category: string; object: string; reasoning: string }[];
}

const EditableComponent: React.FC<EditableComponentProps> = ({
  onElementHover,
  onStateChange,
  items,
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

  // Use useCallback to memoize the function
  const updateState = useCallback(() => {
    onStateChange(elements, backgroundColor);
  }, [elements, backgroundColor, onStateChange]);

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

  useEffect(() => {
    if (
      !elementsInitialized &&
      windowDimensions.width &&
      windowDimensions.height
    ) {
      // console.log(items);
      if (Array.isArray(items)) {
        items.forEach((item, index) => addElement(item, index));
        setElementsInitialized(true);
      } else {
        console.error("Expected 'items' to be an array, but got:", items);
      }
    }
  }, [windowDimensions, elementsInitialized]);

  // Use a separate useEffect for state updates
  useEffect(() => {
    if (elementsInitialized) {
      updateState();
    }
  }, [elementsInitialized]);

  const addElement = (
    item: { object: string; category: string; reasoning: string },
    index: number
  ) => {
    console.log(item);
    let category = item["category"];
    const assetCategory = assets[category as keyof typeof assets];
    // console.log(assetCategory);
    const asset = Object.values(assetCategory).find(
      ([name]) => name === item.object
    );
    // console.log(asset);

    if (!asset) return;
    if (category === "DECOR") {
      const decorIndex = index % reverseCategoriesDecor.length;
      category = reverseCategoriesDecor[decorIndex];
    } else if (category == "POSTER") {
      category = "POSTER1";
    }
    const [name, src] = asset;
    const type =
      src.split(".").pop()?.toLowerCase() === "gif" ? "gif" : "image";
    setElements((prevElements) => {
      const position =
        categoryPositions[category as keyof typeof categoryPositions];

      const newElement: Element = {
        id: `${item.object}-${index}`,
        type,
        src,
        reasoning: item.reasoning,
        category,
        initialX: position.x,
        initialY: position.y,
      };
      return [...prevElements, newElement];
    });
  };

  useEffect(() => {
    onStateChange(elements, backgroundColor);
  }, [elements, backgroundColor]);

  const handleElementClick = (id: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setSelectedElementId(id);
  };

  const handleBackgroundClick = () => {
    setSelectedElementId(null);
  };

  return (
    <div
      className="relative w-[320px] h-[500px] overflow-hidden sm:overflow-visible rounded-lg"
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
    </div>
  );
};

export default EditableComponent;
