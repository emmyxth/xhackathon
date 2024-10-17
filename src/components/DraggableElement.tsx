import React, { useRef, useState, useEffect } from "react";
import Draggable from "react-draggable";

interface DraggableElementProps {
  id: string;
  type: string;
  src: string;
  initialX: number;
  initialY: number;
  category: string;
  isSelected: boolean;
  onClick: (event: React.MouseEvent) => void;
  onHover: (isHovered: boolean) => void;
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
  onHover,
}) => {
  const nodeRef = useRef(null);
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const [isHovered, setIsHovered] = useState(false);

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
    GROUND2: 150,
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

  return (
    <Draggable defaultPosition={{ x: initialX, y: initialY }} nodeRef={nodeRef}>
      <div
        ref={nodeRef}
        style={{
          touchAction: "none",
          userSelect: "none",
          position: "absolute",
        }}
        onMouseEnter={() => {
          setIsHovered(true);
          onHover(true);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          onHover(false);
        }}
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
              zIndex: "1000",
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
            {id.split("-")[0]}
          </div>
        )}
      </div>
    </Draggable>
  );
};

export default DraggableElement;
