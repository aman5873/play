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

// ***** socials
export const socialData = [
  {
    id: 1,
    category: "VR Sports",
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
    },
    {
      id: 2,
      rank: 2,
      avatar_url: "/images/home/user2Avatar.png",
      name: "Shadowstrike",
      country: "US",
      score: "12450",
      points: "+125",
    },
    {
      id: 3,
      rank: 3,
      avatar_url: "/images/home/user2Avatar.png",
      name: "cyberphoenix",
      country: "GE",
      score: "10800",
      points: "+67",
    },
    {
      id: 4,
      rank: 4,
      avatar_url: "/images/home/user1Avatar.png",
      name: "Quantumrage",
      country: "GE",
      score: "9950",
      points: "+67",
    },
    {
      id: 5,
      rank: 5,
      avatar_url: "/images/home/user2Avatar.png",
      name: "Vortexhunter",
      country: "EU",
      score: "9720",
      points: "+67",
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
