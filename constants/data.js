// Fake data (in real app you’ll call API)

export const gameReviewData = {
  total_review: 2847,
  average_rating: 4.7,
  reviews: [
    {
      id: 1,
      user: {
        name: "ChiefWarrior",
        avatar_url: "/images/home/user3Avatar.png",
      },
      date_time: "1 hour ago",
      rating: 5,
      description:
        "Been playing for 8 years and still love it! The clan wars are incredibly strategic and the constant updates keep things fresh. Best mobile strategy game ever!",
    },
    {
      id: 2,
      user: {
        name: "ChiefWarrior",
        avatar_url: "/images/home/user1Avatar.png",
      },

      date_time: "A moment ago",
      rating: 4.5,
      description:
        "I've been playing this game for over eight years! The strategic depth of the clan wars is exceptional, and the regular updates keep the gameplay fresh and exciting. It's undoubtedly the best mobile strategy game out there!",
    },
    {
      id: 3,
      user: {
        name: "ChiefWarrior",
        avatar_url: "/images/home/user3Avatar.png",
      },
      date_time: "1 hour ago",
      rating: 5,
      description:
        "Been playing for 8 years and still love it! The clan wars are incredibly strategic and the constant updates keep things fresh. Best mobile strategy game ever!",
    },
    {
      id: 4,
      user: {
        name: "ChiefWarrior",
        avatar_url: "/images/home/user1Avatar.png",
      },

      date_time: "A moment ago",
      rating: 4.5,
      description:
        "I've been playing this game for over eight years! The strategic depth of the clan wars is exceptional, and the regular updates keep the gameplay fresh and exciting. It's undoubtedly the best mobile strategy game out there!",
    },
  ],
};

export const statusesData = [
  { id: 1, name: "Registration open" },
  { id: 2, name: "Soon" },
  { id: 3, name: "In progress" },
  { id: 4, name: "Completed" },
];

export const tournamentAnalytics = {
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
    is_featured: true,
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
    is_featured: true,
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
    is_featured: false,
    title: "Exciting Tournament News: Record-Breaking Prize Pool Announced",
    categories: ["Category"],
    image_path: "/images/home/news1.png",
    description:
      "The upcoming Global Championship is set to shatter all records with an incredible $3M prize pool, showcasing teams from 40 nations.",
    date_time: "Oct 10, 7:30 PM",
    views_count: 350,
  },
  {
    id: 4,
    is_featured: false,
    title: "Exciting Tournament News",
    categories: ["Competitions", "Hot Topics"],
    image_path: "/images/home/news2.png",
    description:
      "The upcoming Global Championship is set to shatter all records with an incredible $3M prize pool, showcasing teams from 40 nations.",
    date_time: "Oct 10, 7:30 PM",
    views_count: 350,
  },
  {
    id: 5,
    is_featured: false,
    title: "Exciting Tournament News: Record-Breaking Prize Pool Announced",
    categories: ["Competitions", "Hot Topics"],
    image_path: "/images/home/news1.png",
    description:
      "The upcoming Global Championship is set to shatter all records with an incredible $3M prize pool, showcasing teams from 40 nations.",
    date_time: "Oct 10, 7:30 PM",
    views_count: 350,
  },
  {
    id: 6,
    is_featured: false,
    title: "Exciting Tournament News: Record-Breaking Prize Pool Announced",
    categories: ["Competitions", "Hot Topics"],
    image_path: "/images/home/news2.png",
    description:
      "The upcoming Global Championship is set to shatter all records with an incredible $3M prize pool, showcasing teams from 40 nations.",
    date_time: "Oct 10, 7:30 PM",
    views_count: 350,
  },
  {
    id: 7,
    is_featured: false,
    title: "Exciting Tournament News: Record-Breaking Prize Pool Announced",
    categories: ["Competitions", "Hot Topics"],
    image_path: "/images/home/news1.png",
    description:
      "The upcoming Global Championship is set to shatter all records with an incredible $3M prize pool, showcasing teams from 40 nations.",
    date_time: "Oct 10, 7:30 PM",
    views_count: 350,
  },
  {
    id: 8,
    is_featured: false,
    title: "Exciting Tournament News",
    categories: ["Competitions", "Hot Topics"],
    image_path: "/images/home/news2.png",
    description:
      "The upcoming Global Championship is set to shatter all records with an incredible $3M prize pool, showcasing teams from 40 nations.",
    date_time: "Oct 10, 7:30 PM",
    views_count: 350,
  },
];

// ***** socials
export const socialAnalytics = {
  video_shared: "150+",
  active_members: "$2.5M+",
  verified_creators: "50K+",
  live_streams: "24/7",
};

export const socialData = [
  {
    id: 1,
    category: "VR Sports",
    is_trending: true,
    channel: {
      logo: "/images/home/user1Avatar.png",
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
    is_trending: true,
    channel: {
      logo: "/images/home/user1Avatar.png",
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
    is_trending: true,
    channel: {
      logo: "/images/home/user1Avatar.png",
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
    is_trending: true,
    channel: {
      logo: "/images/home/user1Avatar.png",
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

// **** Leaderboard
export const leaderboardData = {
  leaderboard: [
    {
      id: 1,
      rank: 1,
      avatar_url: "/images/home/user1Avatar.png",
      name: "Neonblade",
      country: "UK",
      score: "12000",
      points: "+89",
      achievement: "Grandmaster",
      equipment: "Phoenix VR",
      main_game: "VR Basketball",
    },
    {
      id: 2,
      rank: 2,
      avatar_url: "/images/home/user2Avatar.png",
      name: "Shadowstrike",
      country: "US",
      score: "12450",
      points: "+125",
      achievement: "Master",
      equipment: "Phoenix VR",
      main_game: "VR Basketball",
    },
    {
      id: 3,
      rank: 3,
      avatar_url: "/images/home/user2Avatar.png",
      name: "cyberphoenix",
      country: "GE",
      score: "10800",
      points: "+67",
      achievement: "Master",
      equipment: "Phoenix VR",
      main_game: "VR Basketball",
    },
    {
      id: 4,
      rank: 4,
      avatar_url: "/images/home/user1Avatar.png",
      name: "Quantumrage",
      country: "GE",
      score: "9950",
      points: "+67",
      achievement: "Grandmaster",
      equipment: "Phoenix VR",
      main_game: "VR Basketball",
    },
    {
      id: 5,
      rank: 5,
      avatar_url: "/images/home/user2Avatar.png",
      name: "Vortexhunter",
      country: "EU",
      score: "9720",
      points: "+67",
      achievement: "Master",
      equipment: "Phoenix VR",
      main_game: "VR Basketball",
    },
  ],
  selfRanking: {
    rank: 20,
    country: "IND",
    score: "12450",
    points: "+125",
  },
  achievements: [
    {
      id: 1,
      title: "First Victory",
      description: "Win your first match",
      category: "Common",
      progress: 0,
      total_progress: 100,
    },
    {
      id: 2,
      title: "Winning Streak",
      description: "Win 10 matches in a row",
      category: "Rare",
      progress: 40,
      total_progress: 100,
    },
    {
      id: 3,
      title: "Champion",
      description: "Win a tournament",
      category: "Epic",
      progress: 0,
      total_progress: 100,
    },
    {
      id: 4,
      title: "Legend",
      description: "Reach Grandmaster rank",
      category: "Legendry",
      progress: 40,
      total_progress: 100,
    },
  ],
};

// ******** Teams
export const teamsData = [
  {
    id: 1,
    logo: "/images/screens/team_avatar.png",
    title: "Phoenix VR",
    country: "Spain",
    description: "Adventure Seekers",
    success_rate: "80%",
    is_private_team: false,
    rank: 1,
    max_team_member: 8,
    member_count: 5,
    victory_count: 130,
    points: 12450,
    founded_in: "March 2024",
    tournaments_played: 12,
    trophies_count: 4,
    main_game: { name: "VR Basketball" },

    team_members: [
      {
        avatar_url: "/images/home/user1Avatar.png",
        name: "FuturePlay",
        role: "Captain",
        points: 8760,
      },
      {
        avatar_url: "/images/home/user2Avatar.png",
        name: "NeuroFusion",
        role: "Co-Captain",
        points: 10230,
      },
      {
        avatar_url: "/images/home/user1Avatar.png",
        name: "HoloDash",
        role: "Player",
        points: 12450,
      },
      {
        avatar_url: "/images/home/user2Avatar.png",
        name: "VirtuaSports",
        role: "Player",
        points: 11450,
      },
      {
        avatar_url: "/images/home/user1Avatar.png",
        name: "CyberArena",
        role: "Player",
        points: 11450,
      },
      {
        avatar_url: "/images/home/user1Avatar.png",
        name: "EchoGame",
        role: "Player",
        points: 10450,
      },
    ],
    primary_games: [],
    region: [],
    settings: {},

    // team_captain: {
    //   avatar_url: "",
    //   title: "Team Captain",
    //   description: "Full team management",
    // },
    // team_co_captain: {
    //   avatar_url: "",
    //   title: "Co-Captain",
    //   description: "Assist with management",
    // },
    // team_members: {
    //   avatar_url: "",
    //   title: "Members",
    //   description: "Core team players",
    // },
    // requirements_preference: {
    //   skill_level: { name: "Advanced" },
    //   preferred_playStyles: { name: "Aggressive" },
    //   additional_requirements: "",
    // },
  },
  {
    id: 2,
    logo: "/images/screens/team_avatar.png",
    title: "Quantum Force",
    country: "Germany",
    description: "Defender League",
    member_count: 7,
    max_team_member: 8,
    success_rate: "95%",
  },
  {
    id: 3,
    logo: "/images/screens/team_avatar.png",
    title: "Digital Tigers",
    description: "Stealth Assassins",
    country: "France",
    member_count: 5,
    max_team_member: 8,
    success_rate: "70%",
  },
  {
    id: 4,
    logo: "/images/screens/team_avatar.png",
    title: "Virtual Vipers",
    description: "Stealth Assassins",
    country: "Italy",
    member_count: 6,
    max_team_member: 8,
    success_rate: "85%",
  },
];

export const team_tournaments = [
  {
    id: 1,
    title: "VR World Cup 2022",
    position: "1st Place",
    prize: "$12450",
    date: "Just now",
  },
  {
    id: 2,
    title: "European Basketball League",
    position: "Champions",
    prize: "$11200",
    date: "24, sep, 2024",
  },
  {
    id: 3,
    title: "Tennis Masters 2021",
    position: "Semifinalists",
    prize: "$10800",
    date: "24, sep, 2024",
  },
  {
    id: 4,
    title: "Soccer Challenge Cup",
    position: "2nd Place",
    prize: "$9949",
    date: "24, sep, 2024",
  },
];
