"use client";

import { useEffect, useState } from "react";

const ProfileMatchPanel = ({ text }: { text: string }) => {
  const fullText = text;
  const [typedText, setTypedText] = useState("");
  const oldtext = `Based on the analysis of the tweets and liked tweets, the user X appears to be deeply involved in the tech community, particularly around coding, AI, and hackathons. This suggests a personality that is innovative, tech-savvy, and possibly enjoys the challenge of problem-solving and the thrill of new technological developments. Here's how we can match these traits to the list of accessories:

- **PETS**: Given the user's interest in cutting-edge technology and possibly unconventional hobbies, a pet that stands out would be fitting. **Capybara** - these animals are unique, social, and somewhat quirky, aligning with someone who might enjoy the unusual.

- **FOOD**: Tech enthusiasts often have a preference for quick, energy-boosting snacks due to long hours of coding or attending events like hackathons. **Red Bull can** - this is a go-to for energy during long nights of coding or hackathons.

- **CHAIR**: Comfort is key for someone who likely spends a lot of time sitting, coding, or brainstorming. **Gaming chair** - designed for long hours of sitting, ergonomic, and often chosen by tech enthusiasts for comfort during extended sessions.

- **RUG**: Given the tech and possibly meme culture involvement, **Doge** - this rug ties into the tech community's love for memes, especially those related to cryptocurrencies like Dogecoin.

- **DECOR**: 
  - **Spiderman Funko Pop figure** - Reflects a love for pop culture, which often intersects with tech culture.
  - **KAWS Stormtrooper figure** - High-end collectibles often appreciated by those in tech for their design and exclusivity.
  - **Anime character figure** - Anime is popular in tech communities, reflecting a blend of technology and art.
  - **Stack of books** - Likely to be on tech, AI, or coding, showing a commitment to continuous learning.
  - **Leica compact camera** - For someone who might enjoy capturing moments from hackathons or tech events.
  - **Incense stick in holder** - For creating a calm, focused environment during coding sessions.
  - **Blue lava lamp** - A nod to the '90s tech culture, often seen in rooms of tech enthusiasts.
  - **Potted succulent plants** - Low maintenance, adding a touch of nature which is popular in modern tech office setups.
  - **Sunglasses with blue lenses** - Could be for style or for reducing screen glare, practical for long hours in front of screens.
  - **ZYN nicotine pouches** - Often used by those needing a quick, non-smoking nicotine fix during breaks.

- **GIF**: **Animated bear playing piano** - This could represent a playful side or a break from serious tech work, enjoying lighter, creative content.

Here's the formatted list:

["Capybara", "Red Bull can", "Gaming chair", "Doge", "Spiderman Funko Pop figure", "KAWS Stormtrooper figure", "Anime character figure", "Stack of books", "Leica compact camera", "Incense stick in holder", "Blue lava lamp", "Potted succulent plants", "Sunglasses with blue lenses", "ZYN nicotine pouches", "Animated bear playing piano"]
`;

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      setTypedText((prev) => prev + fullText[index]);
      index++;
      if (index === fullText.length) {
        clearInterval(intervalId);
      }
    }, 20); // Adjusted typing speed to make it faster

    return () => clearInterval(intervalId);
  }, []);

  const renderText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/);
    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <div className="flex flex-col h-screen w-full black p-4">
      <div className="overflow-y-auto flex-grow bg-white rounded-lg shadow-md p-6">
        <div className="prose max-w-none text-black">
          {renderText(typedText)}
        </div>
      </div>
    </div>
  );
};

export default ProfileMatchPanel;
