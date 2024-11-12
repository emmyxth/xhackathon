import React from "react";

const TeamProfiles = () => {
  const teamMembers = [
    {
      name: "Chris",
      handle: "@realChrisHailey",
      link: "https://x.com/realChrisHailey",
      image: "/assets/profiles/chris.jpg",
    },
    {
      name: "Emmy",
      handle: "@emmyxth",
      link: "https://x.com/emmyxth",
      image: "/assets/profiles/emmy.jpg",
    },
    {
      name: "Zane",
      handle: "@zanesabbagh",
      link: "https://x.com/zanesabbagh",
      image: "/assets/profiles/zane.jpg",
    },
    {
      name: "Jin",
      handle: "@thisisjinkim",
      link: "https://x.com/thisisjinkim",
      image: "/assets/profiles/jin.jpg",
    },
  ];

  return (
    <div className="flex tems-center gap-3">
      <span className="text-sm text-gray-400">Created by</span>
      <div className="flex -space-x-2">
        {teamMembers.map((member, index) => (
          <a
            href={member.link}
            key={member.handle}
            className="relative group"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-gray-800 hover:scale-110 transition-transform duration-200 relative z-10">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {member.handle}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default TeamProfiles;
