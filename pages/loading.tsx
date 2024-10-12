// pages/page1.tsx

import AnimatedLoadingText from "@/components/AnimatedLoadingText";
import React from "react";

const VersePage: React.FC = () => {
  return (
    <div className="flex flex-col">
      <AnimatedLoadingText />
    </div>
  );
};
export default VersePage;
