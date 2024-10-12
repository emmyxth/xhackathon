import React from "react";
import Image from "next/image";

const ElementPanel: React.FC = () => {
  const elements: { id: string; src: string; alt: string }[] = [
    // { id: "chair1", src: "/chair1.png", alt: "Red chair" },
    // { id: "chair2", src: "/chair2.png", alt: "Gaming chair" },
    // Add more elements here
  ];

  return (
    <div className="grid grid-cols-3 gap-2 p-4">
      {elements.map((element) => (
        <div
          key={element.id}
          className="bg-white p-2 rounded cursor-pointer hover:bg-gray-100 transition-colors"
        >
          <Image
            src={element.src}
            alt={element.alt}
            width={64}
            height={64}
            layout="responsive"
          />
        </div>
      ))}
    </div>
  );
};

export default ElementPanel;
