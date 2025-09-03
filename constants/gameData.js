// Fake data (in real app you’ll call API)
export const categoriesData = [
  { id: 1, name: "Sports" },
  { id: 2, name: "Extreme" },
  { id: 3, name: "Precision" },
];

export const gamesData = [
  
  {
    id: 1,
    title: "VR Basketball",
    description:
      "Feel the adrenaline rush of professional tennis in virtual reality. With precise gameplay mechanics and detailed environments, VR Tennis Pro offers the most realistic tennis experience ever created.",
    release_date: "2024-05-12",
    download_count: 0,
    active_players_count: 20,
    status: "active",
    category: "sports",

    features: [
      {
        id: "1",
        title: "Feature 1",
        description: "Advanced Ball Physics",
      },
      { id: "2", title: "Feature 2", description: "Online tournaments" },
      {
        id: "3",
        title: "Feature 3",
        description: "Different playing surfaces",
      },
      {
        id: "4",
        title: "Feature 4",
        description: "Career and exhibition modes",
      },
    ],
    images: [
      { id: "img1", image_path: "/images/games/game1-1.jpg", is_primary: 1 },
      { id: "img2", image_path: "/images/games/game1-2.jpg", is_primary: 0 },
      { id: "img3", image_path: "/images/games/game2-1.jpg", is_primary: 0 },
      { id: "img3", image_path: "/images/games/game2-1.jpg", is_primary: 0 },
    ],

    developer: "Unity Labs",
    platform: {
      list: ["Oculus Quest", "HTC Vive", "PlayStation VR"],
      requirements: [
        "Any VR headset compatible with SteamVR, Oculus, or PlayStation VR",
      ],
    },
  },

  {
    id: 2,
    title: "Skydiving Extreme",
    description:
      "Feel the adrenaline rush of professional tennis in virtual reality. With precise gameplay mechanics and detailed environments, VR Tennis Pro offers the most realistic tennis experience ever created.",
    release_date: "2024-06-20",
    download_count: 0,
    active_players_count: 30,
    status: "active",
    category: "extreme",
    features: [
      {
        id: "1",
        title: "Feature 1",
        description: "Advanced Ball Physics",
      },
      { id: "2", title: "Feature 2", description: "Online tournaments" },
      {
        id: "3",
        title: "Feature 3",
        description: "Different playing surfaces",
      },
      {
        id: "4",
        title: "Feature 4",
        description: "Career and exhibition modes",
      },
    ],
    images: [
      { id: "img3", image_path: "/images/games/game2-1.jpg", is_primary: 0 },
      { id: "img4", image_path: "/images/games/game2-2.jpg", is_primary: 1 },
      { id: "img3", image_path: "/images/games/game2-1.jpg", is_primary: 0 },
      { id: "img4", image_path: "/images/games/game2-2.jpg", is_primary: 0 },
    ],

    developer: "Epic Games",
    platform: {
      list: ["Oculus Quest", "HTC Vive", "PlayStation VR"],
      requirements: [
        "Any VR headset compatible with SteamVR, Oculus, or PlayStation VR",
      ],
    },
  },
  {
    id: 3,
    title: "VR Basketball",
    description:
      "Feel the adrenaline rush of professional tennis in virtual reality. With precise gameplay mechanics and detailed environments, VR Tennis Pro offers the most realistic tennis experience ever created.",
    release_date: "2024-05-12",
    download_count: 0,
    active_players_count: 100,
    status: "active",
    category: "sports",

    features: [
      {
        id: "1",
        title: "Feature 1",
        description: "Advanced Ball Physics",
      },
      { id: "2", title: "Feature 2", description: "Online tournaments" },
      {
        id: "3",
        title: "Feature 3",
        description: "Different playing surfaces",
      },
      {
        id: "4",
        title: "Feature 4",
        description: "Career and exhibition modes",
      },
    ],
    images: [
      { id: "img1", image_path: "/images/games/game1-1.jpg", is_primary: 1 },
      { id: "img2", image_path: "/images/games/game1-2.jpg", is_primary: 0 },
      { id: "img3", image_path: "/images/games/game2-1.jpg", is_primary: 0 },
      { id: "img3", image_path: "/images/games/game2-1.jpg", is_primary: 0 },
    ],

    developer: "Unity Labs",
    platform: {
      list: ["Oculus Quest", "HTC Vive", "PlayStation VR"],
      requirements: [
        "Any VR headset compatible with SteamVR, Oculus, or PlayStation VR",
      ],
    },
  },

  {
    id: 4,
    title: "Skydiving Extreme",
    description:
      "Feel the adrenaline rush of professional tennis in virtual reality. With precise gameplay mechanics and detailed environments, VR Tennis Pro offers the most realistic tennis experience ever created.",
    release_date: "2024-06-20",
    download_count: 0,
    active_players_count: 0,
    status: "active",
    category: "extreme",
    features: [
      {
        id: "1",
        title: "Feature 1",
        description: "Advanced Ball Physics",
      },
      { id: "2", title: "Feature 2", description: "Online tournaments" },
      {
        id: "3",
        title: "Feature 3",
        description: "Different playing surfaces",
      },
      {
        id: "4",
        title: "Feature 4",
        description: "Career and exhibition modes",
      },
    ],
    images: [
      { id: "img3", image_path: "/images/games/game2-1.jpg", is_primary: 0 },
      { id: "img4", image_path: "/images/games/game2-2.jpg", is_primary: 1 },
      { id: "img3", image_path: "/images/games/game2-1.jpg", is_primary: 0 },
      { id: "img4", image_path: "/images/games/game2-2.jpg", is_primary: 0 },
    ],

    developer: "Epic Games",
    platform: {
      list: ["Oculus Quest", "HTC Vive", "PlayStation VR"],
      requirements: [
        "Any VR headset compatible with SteamVR, Oculus, or PlayStation VR",
      ],
    },
  },

  {
    id: 5,
    title: "VR Basketball",
    description:
      "Feel the adrenaline rush of professional tennis in virtual reality. With precise gameplay mechanics and detailed environments, VR Tennis Pro offers the most realistic tennis experience ever created.",
    release_date: "2024-05-12",
    download_count: 0,
    active_players_count: 20,
    status: "active",
    category: "sports",

    features: [
      {
        id: "1",
        title: "Feature 1",
        description: "Advanced Ball Physics",
      },
      { id: "2", title: "Feature 2", description: "Online tournaments" },
      {
        id: "3",
        title: "Feature 3",
        description: "Different playing surfaces",
      },
      {
        id: "4",
        title: "Feature 4",
        description: "Career and exhibition modes",
      },
    ],
    images: [
      { id: "img1", image_path: "/images/games/game1-1.jpg", is_primary: 1 },
      { id: "img2", image_path: "/images/games/game1-2.jpg", is_primary: 0 },
      { id: "img3", image_path: "/images/games/game2-1.jpg", is_primary: 0 },
      { id: "img3", image_path: "/images/games/game2-1.jpg", is_primary: 0 },
    ],

    developer: "Unity Labs",
    platform: {
      list: ["Oculus Quest", "HTC Vive", "PlayStation VR"],
      requirements: [
        "Any VR headset compatible with SteamVR, Oculus, or PlayStation VR",
      ],
    },
  },
];

// ******* tournament
export const tournamentCategoriesData = [
  { id: 1, name: "VR Soccer League" },
  { id: 2, name: "VR Climbing Challenge" },
  { id: 3, name: "VR Basketball" },
];

export const statusesData = [
  { id: 1, name: "Registration open" },
  { id: 2, name: "Soon" },
  { id: 3, name: "In progress" },
  { id: 4, name: "Completed" },
];

export const tournamentsData = [
  {
    id: 1,
    title: "VR World Cup 2023",
    description:
      "The 2023 VR World Cup is the biggest virtual reality football event. 32 teams from around the world will compete to win the world title and a €50,000 prize pool. The tournament will be played over three weeks, with group stages followed by knockout rounds. Matches will be streamed live on our official platform.",
    start_date: "2025-07-15",
    teams_participated_count: 16,
    max_teams: 32,
    prize: "50,000",
    category: "VR Soccer League",
    status: "Registration open",
    images: [
      { id: "img3", image_path: "/images/games/game2-1.jpg", is_primary: 1 },
      { id: "img4", image_path: "/images/games/game2-2.jpg", is_primary: 0 },
      { id: "img3", image_path: "/images/games/game2-1.jpg", is_primary: 0 },
      { id: "img4", image_path: "/images/games/game2-2.jpg", is_primary: 0 },
    ],

    schedule: [
      {
        id: "1",
        phase: "Group Stage",
        start_date: "2025-08-15",
        end_date: "2025-08-20",
      },
      {
        id: "2",
        phase: "Quarter finals",
        start_date: "2025-08-23",
        end_date: "2025-08-25",
      },
      { id: "3", phase: "Semifinals", start_date: "2025-08-28" },
      { id: "4", phase: "Final", start_date: "2025-08-30" },
    ],
    format: "6v6 competition system. Group stage followed by knockout rounds.",
    prizeList: [
      {
        id: "1",
        title: "1st Place",
        description: "€25,000 + Virtual Trophy + VR Equipment",
      },
      { id: "2", title: "2nd Place", description: "€15,000 + Virtual Medals" },
      { id: "3", title: "3rd Place", description: "€10,000 + Virtual Medals" },
      {
        id: "4",
        title: "MVP of the Tournament",
        description: "€5,000 + Exclusive Item",
      },
    ],
    organizer: {
      name: "IMM Sports",
      description: "Official organizer",
      email: "contact@iim.gmail.com",
    },
    rules: [
      "Teams must have between 6 and 10 registered players.",
      "All players must use equipment compatible with VR Soccer League gameplay.",
      "The use of any type of modification or hack is prohibited.",
      "Teams must arrive 15 minutes before each match.",
      "The organization reserves the right to modify the calendar if necessary.",
    ],
    games: [
      {
        id: 1,
        title: "VR Basketball",
        category_id: 1,
        release_date: "2024-05-12",
        developer: "Unity Labs",
        is_live: true,
        images: [
          { id: "img1", url: "/images/games/game1-1.jpg" },
          { id: "img2", url: "/images/games/game1-2.jpg" },
        ],
        primary_image: "/images/games/game1-1.jpg",
      },
    ],
  },
  {
    id: "tour-2",
    title: "VR World Cup 2023",
    description:
      "The 2023 VR World Cup is the biggest virtual reality football event. 32 teams from around the world will compete to win the world title and a €50,000 prize pool. The tournament will be played over three weeks, with group stages followed by knockout rounds. Matches will be streamed live on our official platform.",
    start_date: "2025-07-15",
    teams_participated_count: 16,
    max_teams: 32,
    prize: "50,000",
    category: "VR Soccer League",
    status: "Registration open",
    images: [
      {
        id: "img3",
        image_path:
          "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=2070&auto=format&fit=crop",
        is_primary: 1,
      },
      { id: "img4", image_path: "/images/games/game2-2.jpg", is_primary: 0 },
      { id: "img3", image_path: "/images/games/game2-1.jpg", is_primary: 0 },
      { id: "img4", image_path: "/images/games/game2-2.jpg", is_primary: 0 },
    ],

    schedule: [
      {
        id: "1",
        phase: "Group Stage",
        start_date: "2025-08-15",
        end_date: "2025-08-20",
      },
      {
        id: "2",
        phase: "Quarter finals",
        start_date: "2025-08-23",
        end_date: "2025-08-25",
      },
      { id: "3", phase: "Semifinals", start_date: "2025-08-28" },
      { id: "4", phase: "Final", start_date: "2025-08-30" },
    ],
    format: "6v6 competition system. Group stage followed by knockout rounds.",
    prizeList: [
      {
        id: "1",
        title: "1st Place",
        description: "€25,000 + Virtual Trophy + VR Equipment",
      },
      { id: "2", title: "2nd Place", description: "€15,000 + Virtual Medals" },
      { id: "3", title: "3rd Place", description: "€10,000 + Virtual Medals" },
      {
        id: "4",
        title: "MVP of the Tournament",
        description: "€5,000 + Exclusive Item",
      },
    ],
    organizer: {
      name: "IMM Sports",
      description: "Official organizer",
      email: "contact@iim.gmail.com",
    },
    rules: [
      "Teams must have between 6 and 10 registered players.",
      "All players must use equipment compatible with VR Soccer League gameplay.",
      "The use of any type of modification or hack is prohibited.",
      "Teams must arrive 15 minutes before each match.",
      "The organization reserves the right to modify the calendar if necessary.",
    ],
    games: [
      {
        id: 1,
        title: "VR Basketball",
        category_id: 1,
        release_date: "2024-05-12",
        developer: "Unity Labs",
        is_live: true,
        images: [
          { id: "img1", url: "/images/games/game1-1.jpg" },
          { id: "img2", url: "/images/games/game1-2.jpg" },
        ],
        primary_image: "/images/games/game1-1.jpg",
      },
    ],
  },
  {
    id: 3,
    title: "VR World Cup 2023",
    description:
      "The 2023 VR World Cup is the biggest virtual reality football event. 32 teams from around the world will compete to win the world title and a €50,000 prize pool. The tournament will be played over three weeks, with group stages followed by knockout rounds. Matches will be streamed live on our official platform.",
    start_date: "2025-07-15",
    teams_participated_count: 16,
    max_teams: 32,
    prize: "50,000",
    category: "VR Soccer League",
    status: "Registration open",
    images: [
      { id: "img3", image_path: "/images/games/game2-1.jpg", is_primary: 1 },
      { id: "img4", image_path: "/images/games/game2-2.jpg", is_primary: 0 },
      { id: "img3", image_path: "/images/games/game2-1.jpg", is_primary: 0 },
      { id: "img4", image_path: "/images/games/game2-2.jpg", is_primary: 0 },
    ],

    schedule: [
      {
        id: "1",
        phase: "Group Stage",
        start_date: "2025-08-15",
        end_date: "2025-08-20",
      },
      {
        id: "2",
        phase: "Quarter finals",
        start_date: "2025-08-23",
        end_date: "2025-08-25",
      },
      { id: "3", phase: "Semifinals", start_date: "2025-08-28" },
      { id: "4", phase: "Final", start_date: "2025-08-30" },
    ],
    format: "6v6 competition system. Group stage followed by knockout rounds.",
    prizeList: [
      {
        id: "1",
        title: "1st Place",
        description: "€25,000 + Virtual Trophy + VR Equipment",
      },
      { id: "2", title: "2nd Place", description: "€15,000 + Virtual Medals" },
      { id: "3", title: "3rd Place", description: "€10,000 + Virtual Medals" },
      {
        id: "4",
        title: "MVP of the Tournament",
        description: "€5,000 + Exclusive Item",
      },
    ],
    organizer: {
      name: "IMM Sports",
      description: "Official organizer",
      email: "contact@iim.gmail.com",
    },
    rules: [
      "Teams must have between 6 and 10 registered players.",
      "All players must use equipment compatible with VR Soccer League gameplay.",
      "The use of any type of modification or hack is prohibited.",
      "Teams must arrive 15 minutes before each match.",
      "The organization reserves the right to modify the calendar if necessary.",
    ],
    games: [
      {
        id: 1,
        title: "VR Basketball",
        category_id: 1,
        release_date: "2024-05-12",
        developer: "Unity Labs",
        is_live: true,
        images: [
          { id: "img1", url: "/images/games/game1-1.jpg" },
          { id: "img2", url: "/images/games/game1-2.jpg" },
        ],
        primary_image: "/images/games/game1-1.jpg",
      },
    ],
  },
  {
    id: "tour-4",
    title: "VR World Cup 2023",
    description:
      "The 2023 VR World Cup is the biggest virtual reality football event. 32 teams from around the world will compete to win the world title and a €50,000 prize pool. The tournament will be played over three weeks, with group stages followed by knockout rounds. Matches will be streamed live on our official platform.",
    start_date: "2025-07-15",
    teams_participated_count: 16,
    max_teams: 32,
    prize: "50,000",
    category: "VR Soccer League",
    status: "Registration open",
    images: [
      {
        id: "img3",
        image_path:
          "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=2070&auto=format&fit=crop",
        is_primary: 1,
      },
      { id: "img4", image_path: "/images/games/game2-2.jpg", is_primary: 0 },
      { id: "img3", image_path: "/images/games/game2-1.jpg", is_primary: 0 },
      { id: "img4", image_path: "/images/games/game2-2.jpg", is_primary: 0 },
    ],

    schedule: [
      {
        id: "1",
        phase: "Group Stage",
        start_date: "2025-08-15",
        end_date: "2025-08-20",
      },
      {
        id: "2",
        phase: "Quarter finals",
        start_date: "2025-08-23",
        end_date: "2025-08-25",
      },
      { id: "3", phase: "Semifinals", start_date: "2025-08-28" },
      { id: "4", phase: "Final", start_date: "2025-08-30" },
    ],
    format: "6v6 competition system. Group stage followed by knockout rounds.",
    prizeList: [
      {
        id: "1",
        title: "1st Place",
        description: "€25,000 + Virtual Trophy + VR Equipment",
      },
      { id: "2", title: "2nd Place", description: "€15,000 + Virtual Medals" },
      { id: "3", title: "3rd Place", description: "€10,000 + Virtual Medals" },
      {
        id: "4",
        title: "MVP of the Tournament",
        description: "€5,000 + Exclusive Item",
      },
    ],
    organizer: {
      name: "IMM Sports",
      description: "Official organizer",
      email: "contact@iim.gmail.com",
    },
    rules: [
      "Teams must have between 6 and 10 registered players.",
      "All players must use equipment compatible with VR Soccer League gameplay.",
      "The use of any type of modification or hack is prohibited.",
      "Teams must arrive 15 minutes before each match.",
      "The organization reserves the right to modify the calendar if necessary.",
    ],
    games: [
      {
        id: 1,
        title: "VR Basketball",
        category_id: 1,
        release_date: "2024-05-12",
        developer: "Unity Labs",
        is_live: true,
        images: [
          { id: "img1", url: "/images/games/game1-1.jpg" },
          { id: "img2", url: "/images/games/game1-2.jpg" },
        ],
        primary_image: "/images/games/game1-1.jpg",
      },
    ],
  },
];
