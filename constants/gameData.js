// Fake data (in real app you’ll call API)
export const categoriesData = [
  { id: 1, name: "Sports" },
  { id: 2, name: "Extreme" },
  { id: 3, name: "Precision" },
  { id: 4, name: "Adventure" },
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
      {
        id: "5",
        title: "Feature 4",
        description: "Career and exhibition modes",
      },
      {
        id: "6",
        title: "Feature 6",
        description:
          "Career and exhibition modes,Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores accusamus nihil voluptatem nesciunt similique, voluptatum ex eveniet iste ipsa at.",
      },
    ],
    images: [
      {
        id: "img1",
        image_path: "/images/games/clashOfClan.png",
        is_primary: 1,
      },
      { id: "img2", image_path: "/images/games/game1-2.jpg", is_primary: 0 },
      { id: "img3", image_path: "/images/games/game2-1.jpg", is_primary: 0 },
      { id: "img3", image_path: "/images/games/game2-1.jpg", is_primary: 0 },
    ],

    developer: "Unity Labs",
    platform: {
      list: ["Oculus Quest", "HTC Vive", "PlayStation VR"],
      requirements:
        "Any VR headset compatible with SteamVR, Oculus, or PlayStation VR",
    },
    genres: [
      "Strategy",
      "Tower Defense",
      "Multiplayer",
      "Free-to-Play",
      "Fantasy",
      "Mobile",
    ],
    ratings: {
      count: 186,
      avg_rating: 4.7,
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
    genres: ["Multiplayer", "Free-to-Play", "Fantasy", "Mobile"],
    ratings: {
      count: 102,
      avg_rating: 4.5,
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
    genres: ["Free-to-Play", "Fantasy", "Mobile"],
    ratings: {
      count: 126,
      avg_rating: 4.2,
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
    genres: ["Free-to-Play", "Fantasy", "Mobile"],
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
    ratings: {
      count: 126,
      avg_rating: 4.2,
    },
    genres: ["Free-to-Play", "Fantasy", "Mobile"],
  },
];

// ******* tournament
export const tournamentCategoriesData = [
  { id: 1, name: "VR Soccer League" },
  { id: 2, name: "VR Climbing Challenge" },
  { id: 3, name: "VR Basketball" },
  { id: 4, name: "VR Snowboarding" },
];

export const statusesData = [
  { id: 1, name: "Registration open" },
  { id: 2, name: "Soon" },
  { id: 3, name: "In progress" },
  { id: 4, name: "Completed" },
];

export const tournamentsData = {
  tournaments: [
    {
      id: "tour-4",
      title: "VR Winter Games",
      description:
        "The 2023 VR World Cup is the biggest virtual reality football event. 32 teams from around the world will compete to win the world title and a €50,000 prize pool. The tournament will be played over three weeks, with group stages followed by knockout rounds. Matches will be streamed live on our official platform.",
      start_date: "2025-09-30",
      teams_participated_count: 16,
      max_teams: 32,
      prize: "$ 50,000",
      category: "VR Snowboarding",
      categories: ["VR Snowboarding", "Single Elimination", "1v1"],
      status: "Registration open",
      images: [
        { id: "img4", image_path: "/images/home/olderFall.png", is_primary: 1 },
        {
          id: "img3",
          image_path:
            "https://images.unsplash.com/photo-1605540436563-5bca919ae766?q=80&w=2069&auto=format&fit=crop",
          is_primary: 0,
        },
        { id: "img1", image_path: "/images/games/game2-1.jpg", is_primary: 0 },
        { id: "img2", image_path: "/images/games/game2-2.jpg", is_primary: 0 },
      ],

      schedule: [
        {
          id: "1",
          phase: "Group Stage",
          dates: ["2025-08-15", "2025-08-20"],
          start_date: "2025-08-15",
          end_date: "2025-08-20",
        },
        {
          id: "2",
          phase: "Quarter finals",
          dates: ["2025-08-15", "2025-08-20", "2025-08-25"],
          start_date: "2025-08-23",
          end_date: "2025-08-25",
        },
        {
          id: "3",
          phase: "Semifinals",
          dates: ["2025-08-28"],
          start_date: "2025-08-28",
        },
        {
          id: "4",
          phase: "Final",
          start_date: "2025-08-30",
          dates: ["2025-08-30"],
        },
      ],
      format:
        "6v6 competition system. Group stage followed by knockout rounds.",
      prizeList: [
        {
          id: "1",
          title: "1st Place",
          description: "€25,000 + Virtual Trophy + VR Equipment",
        },
        {
          id: "2",
          title: "2nd Place",
          description: "€15,000 + Virtual Medals",
        },
        {
          id: "3",
          title: "3rd Place",
          description: "€10,000 + Virtual Medals",
        },
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
      game: {
        id: 1,
        title: "Olderfall",
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
    },

    {
      id: "tour-2",
      title: "VR Basketball Masters",
      description:
        "The 2023 VR World Cup is the biggest virtual reality football event. 32 teams from around the world will compete to win the world title and a €50,000 prize pool. The tournament will be played over three weeks, with group stages followed by knockout rounds. Matches will be streamed live on our official platform.",
      start_date: "2025-07-15",
      teams_participated_count: 16,
      max_teams: 16,
      prize: "25,000",
      category: "VR Basketball",
      categories: ["VR Basketball"],
      status: "Registration open",
      images: [
        {
          id: "img3",
          image_path:
            "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=2070&auto=format&fit=crop",
          is_primary: 1,
        },
        { id: "img4", image_path: "/images/games/game2-2.jpg", is_primary: 0 },
        {
          id: "img3",
          image_path:
            "https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=2069&auto=format&fit=crop",
          is_primary: 0,
        },
        { id: "img4", image_path: "/images/games/game2-2.jpg", is_primary: 0 },
      ],

      schedule: [
        {
          id: "1",
          phase: "Group Stage",
          dates: ["2025-08-15", "2025-08-20"],
          start_date: "2025-08-15",
          end_date: "2025-08-20",
        },
        {
          id: "2",
          phase: "Quarter finals",
          dates: ["2025-08-15", "2025-08-20", "2025-08-25"],
          start_date: "2025-08-23",
          end_date: "2025-08-25",
        },
        {
          id: "3",
          phase: "Semifinals",
          dates: ["2025-08-28"],
          start_date: "2025-08-28",
        },
        {
          id: "4",
          phase: "Final",
          start_date: "2025-08-30",
          dates: ["2025-08-30"],
        },
      ],
      format:
        "6v6 competition system. Group stage followed by knockout rounds.",
      prizeList: [
        {
          id: "1",
          title: "1st Place",
          description: "€25,000 + Virtual Trophy + VR Equipment",
        },
        {
          id: "2",
          title: "2nd Place",
          description: "€15,000 + Virtual Medals",
        },
        {
          id: "3",
          title: "3rd Place",
          description: "€10,000 + Virtual Medals",
        },
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
      game: {
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
      categories: ["VR Soccer League"],
      status: "Registration open",
      images: [
        {
          id: "img3",
          image_path:
            "https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=2069&auto=format&fit=crop",
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
          dates: ["2025-08-15", "2025-08-20"],
          start_date: "2025-08-15",
          end_date: "2025-08-20",
        },
        {
          id: "2",
          phase: "Quarter finals",
          dates: ["2025-08-15", "2025-08-20", "2025-08-25"],
          start_date: "2025-08-23",
          end_date: "2025-08-25",
        },
        {
          id: "3",
          phase: "Semifinals",
          dates: ["2025-08-28"],
          start_date: "2025-08-28",
        },
        {
          id: "4",
          phase: "Final",
          start_date: "2025-08-30",
          dates: ["2025-08-30"],
        },
      ],
      format:
        "6v6 competition system. Group stage followed by knockout rounds.",
      prizeList: [
        {
          id: "1",
          title: "1st Place",
          description: "€25,000 + Virtual Trophy + VR Equipment",
        },
        {
          id: "2",
          title: "2nd Place",
          description: "€15,000 + Virtual Medals",
        },
        {
          id: "3",
          title: "3rd Place",
          description: "€10,000 + Virtual Medals",
        },
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
      game: {
        id: 1,
        title: "Cricket league",
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
    },
  ],
  active_tournaments: "150+",
  total_prize_pool: "$2.5M+",
  total_earned: "50K+",
};

// ***** Challenges
export const challengesData = {
  challenges: [
    {
      id: 1,
      title: "Streak Master",
      image_path: "/images/home/challenge.png",
      description:
        "Play 3 different games today and win at least 1 match in each",
      completed_count: 1,
      total_count: 3,
      points: 100,
      status: "Active",
    },
    {
      id: 2,
      title: "Follow our X",
      image_path: "/images/home/link.png",
      description:
        "Follow our X (Twitter) account and engage with our latest post",
      completed_count: 0,
      total_count: 1,
      points: 100,
      status: "Pending",
    },
    {
      id: 3,
      title: "Link your steam account",
      image_path: "/images/home/challenge.png",
      description:
        "Connect your Steam account to unlock Steam achievements tracking",
      completed_count: 1,
      total_count: 1,
      points: 100,
      status: "Claimed",
    },
    {
      id: 4,
      title: "Connect Your Wallet",
      image_path: "/images/home/link.png",
      description: "Link your EVM-compatible wallet to enable crypto rewards",
      completed_count: 1,
      total_count: 1,
      points: 100,
      status: "Pending",
    },
  ],
  completed_today: 2,
  in_progress: 1,
  total_earned: 10,
};

// ***** news & updates

export const newsData = [
  {
    id: 1,
    title: "Exciting Tournament News: Record-Breaking Prize Pool Announced",
    categories: ["Competitions", "Hot Topics"],
    image_path: "/images/home/news1.png",
    description:
      "The upcoming Global Championship is set to shatter all records with an incredible $3M prize pool, showcasing teams from 40 nations.",
    date_time: "Oct 10, 7:30 PM",
    views_count: 350,
  },
  {
    id: 2,
    title: "Exciting Tournament News: Record-Breaking Prize Pool Announced",
    categories: ["Competitions", "Hot Topics"],
    image_path: "/images/home/news2.png",
    description:
      "The upcoming Global Championship is set to shatter all records with an incredible $3M prize pool, showcasing teams from 40 nations.",
    date_time: "Oct 10, 7:30 PM",
    views_count: 350,
  },
  {
    id: 3,
    title: "Exciting Tournament News: Record-Breaking Prize Pool Announced",
    categories: ["Competitions", "Hot Topics"],
    image_path: "/images/home/news1.png",
    description:
      "The upcoming Global Championship is set to shatter all records with an incredible $3M prize pool, showcasing teams from 40 nations.",
    date_time: "Oct 10, 7:30 PM",
    views_count: 350,
  },
  {
    id: 4,
    title: "Exciting Tournament News",
    categories: ["Competitions", "Hot Topics"],
    image_path: "/images/home/news2.png",
    description:
      "The upcoming Global Championship is set to shatter all records with an incredible $3M prize pool, showcasing teams from 40 nations.",
    date_time: "Oct 10, 7:30 PM",
    views_count: 350,
  },
];

export const socialData = [
  {
    id: 1,
    category: "VR Sports",
    channel: {
      logo: "/images/home/postChannelLogo.png",
      title: "Epic VR Basketball Slam Dunk",
      description: "VRProGamer",
    },
    media: {
      thumbnail: "/images/home/post1.png",
      type: "video",
      duration: 60000,
    },
    avg_rating: 4.8,
    like_count: 1122,
    comment_count: 350,
    views_count: 350,
  },
  {
    id: 2,
    category: "Tutorials",
    channel: {
      logo: "/images/home/postChannelLogo.png",
      title: "Epic VR Basketball Slam Dunk",
      description: "VRProGamer",
    },
    media: {
      thumbnail: "/images/home/post2.png",
      type: "video",
      duration: 60000,
    },
    avg_rating: 4.8,
    like_count: 1122,
    comment_count: 350,
    views_count: 350,
  },
  {
    id: 3,
    category: "Live Streams",
    channel: {
      logo: "/images/home/postChannelLogo.png",
      title: "Epic VR Basketball Slam Dunk",
      description: "VRProGamer",
    },
    media: {
      thumbnail: "/images/home/post1.png",
      type: "video",
      duration: 60000,
    },
    avg_rating: 4.8,
    like_count: 1122,
    comment_count: 350,
    views_count: 350,
  },
  {
    id: 4,
    category: "VR Sports",
    channel: {
      logo: "/images/home/postChannelLogo.png",
      title: "Epic VR Basketball Slam Dunk",
      description: "VRProGamer",
    },
    media: {
      thumbnail: "/images/home/post2.png",
      type: "video",
      duration: 60000,
    },
    avg_rating: 4.8,
    like_count: 1122,
    comment_count: 350,
    views_count: 350,
  },
];
// ******** Teams
export const teams = [
  {
    id: 1,
    logo: "https://i.pravatar.cc/150?img=61",
    title: "Phoenix VR",
    country: "Spain",
    member_count: 8,
  },
  {
    id: 2,
    logo: "https://i.pravatar.cc/150?img=62",
    title: "Quantum Force",
    country: "Germany",
    member_count: 7,
  },
  {
    id: 3,
    logo: "https://i.pravatar.cc/150?img=63",
    title: "Digital Tigers",
    country: "France",
    member_count: 5,
  },
  {
    id: 4,
    logo: "https://i.pravatar.cc/150?img=64",
    title: "Virtual Vipers",
    country: "Italy",
    member_count: 6,
  },
];
