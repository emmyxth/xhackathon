// pages/index.tsx

import React from "react";
import Link from "next/link";

const Home: React.FC = () => {
  return (
    <div>
      <h1>Welcome to My Next.js App</h1>
      <nav>
        <ul>
          <li>
            <Link href="/page1">Go to Page 1</Link>
          </li>
          <li>
            <Link href="/page2">Go to Page 2</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
