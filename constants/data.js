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

export const teamsAnalytics = {
  active_teams: "1247",
  verified_teams: "892",
  active_members: "9834",
};
export const teamsData = [
  {
    id: 1,
    rank: 1,
    logo: "/images/screens/team_avatar.png",
    title: "Phoenix VR",
    description: "Adventure Seekers",
    country: "Spain",
    member_count: 5,
    success_rate: "80%",
    achievement: "VR Champions",
    points: 12450,
  },
  {
    id: 2,
    rank: 2,
    logo: "/images/screens/team_avatar.png",
    title: "Quantum Force",
    country: "Germany",
    description: "Defender League",
    member_count: 7,
    max_team_member: 8,
    success_rate: "95%",
    achievement: "Elite Fighters",
    points: 11450,
  },
  {
    id: 3,
    rank: 3,
    logo: "/images/screens/team_avatar.png",
    title: "Digital Tigers",
    description: "Stealth Assassins",
    country: "France",
    member_count: 5,
    max_team_member: 8,
    success_rate: "70%",
    achievement: "Adventure Seekers ",
    points: 10450,
  },
  {
    id: 4,
    rank: 4,
    logo: "/images/screens/team_avatar.png",
    title: "Virtual Vipers",
    description: "Stealth Assassins",
    country: "Italy",
    member_count: 6,
    max_team_member: 8,
    success_rate: "85%",
    achievement: "Star Conquest",
    points: 9450,
  },
  {
    id: 5,
    logo: "/images/screens/team_avatar.png",
    title: "Phoenix VR",
    country: "Spain",
    description: "Adventure Seekers",
    success_rate: "80%",
    is_private_team: false,
    rank: 5,
    max_team_member: 8,
    member_count: 5,
    victory_count: 130,
    points: 12450,
    founded_in: "2025-11-30 00:00:00",
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
    achievement: "VR Champions",
  },
  {
    id: 6,
    rank: 6,
    logo: "/images/screens/team_avatar.png",
    title: "Quantum Force",
    country: "Germany",
    description: "Defender League",
    member_count: 7,
    max_team_member: 8,
    success_rate: "95%",
    achievement: "Elite Fighters",
    points: 11450,
  },
  {
    id: 7,
    rank: 7,
    logo: "/images/screens/team_avatar.png",
    title: "Digital Tigers",
    description: "Stealth Assassins",
    country: "France",
    member_count: 5,
    max_team_member: 8,
    success_rate: "70%",
    achievement: "Adventure Seekers ",
    points: 10450,
  },
  {
    id: 8,
    rank: 8,
    logo: "/images/screens/team_avatar.png",
    title: "Virtual Vipers",
    description: "Stealth Assassins",
    country: "Italy",
    member_count: 6,
    max_team_member: 8,
    success_rate: "85%",
    achievement: "Star Conquest",
    points: 9450,
  },
  {
    id: 9,
    rank: 9,
    logo: "/images/screens/team_avatar.png",
    title: "Virtual Vipers",
    description: "Stealth Assassins",
    country: "Italy",
    member_count: 6,
    max_team_member: 8,
    success_rate: "85%",
    achievement: "Star Conquest",
    points: 9450,
  },
  {
    id: 10,
    rank: 10,
    logo: "/images/screens/team_avatar.png",
    title: "Virtual Vipers",
    description: "Stealth Assassins",
    country: "Italy",
    member_count: 6,
    max_team_member: 8,
    success_rate: "85%",
    achievement: "Star Conquest",
    points: 9450,
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

export const manageTeamData = {
  activityFeed: [
    {
      id: 1,
      icon: "trophy",
      title: "Qualified for VR Championship Finals",
      description:
        "Team has secured their spot in the championship finals after defeating Azure Phantoms 3-1",
      date_time: "2 hours ago",
      chip: { label: "$100,000 Prize Pool" },
      category: { value: "matches", label: "Matches" },
      action: "Details",
    },
    {
      id: 2,
      icon: "trophy",
      title: "Victory vs Azure Phantoms",
      description: "Dominant performance in the semifinals",
      date_time: "3 hours ago",
      chip: { label: "3-1" },
      category: { value: "matches", label: "Matches" },
      action: "Details",
    },
    {
      id: 3,
      icon: "play",
      title: "Insane 4K clutch by ProGamer",
      description: "Incredible comeback play that secured the match",
      date_time: "5 hours ago",
      views_count: "15,420 views",
      category: { value: "clips", label: "Clips" },
      action: "Watch",
    },
    {
      id: 4,
      icon: "news",
      title: "Featured in Esports Weekly",
      description: "Team spotlight article discussing our championship run",
      date_time: "2 days ago",
      category: { value: "news", label: "News" },
      action: "Read",
    },
  ],
  invites: [
    {
      id: 1,
      avatar_url: "/images/home/user1Avatar.png",
      name: "Jake Thompson",
      userName: "@FrostBite",
      role: "Support",
      rating: 8760,
      date_time: "5 days ago",
      status: { label: "Pending", value: "pending" },
    },
    {
      id: 2,
      avatar_url: "/images/home/user2Avatar.png",
      name: "Maria Garcia",
      userName: "@Quickshot",
      role: "DPS",
      rating: 7760,
      date_time: "1 week ago",
      status: { label: "Accepted", value: `accepted` },
    },
    {
      id: 3,
      avatar_url: "/images/home/user1Avatar.png",
      name: "Ryan Park",
      userName: "@Defender",
      role: "Tank",
      rating: 2590,
      date_time: "3 days ago",
      status: { label: "Declined", value: "declined" },
    },
  ],
  notes: [
    {
      id: 1,
      title: "Championship Strategy Notes",
      category: { label: "Strategy", value: "strategy" },
      created_by: "ProGamer",
      date_time: "2 hours ago",
      description:
        "Key strategies for the upcoming finals match. Focus on early aggression and map control.",
    },
    {
      id: 2,
      title: "Roster Changes Discussion",
      category: { label: "Roster", value: "roster" },
      created_by: "Coach Mike",
      date_time: "1 day ago",
      description:
        "Evaluating potential roster adjustments for next season based on performance metrics.",
    },
    {
      id: 3,
      title: "Training Schedule Updates",
      category: { label: "General", value: "general" },
      created_by: "TeamManager",
      date_time: "2 days ago",
      description:
        "Updated practice schedule for the finals preparation. Increased scrimmage time.",
    },
  ],
  wallet_splits: {
    members: [
      {
        id: 1,
        avatar_url: "/images/home/user1Avatar.png",
        name: "FuturePlay",
        role: "Captain",
        per: "25%",
        amount: "$12,500",
        status: "active",
      },
      {
        id: 2,
        avatar_url: "/images/home/user2Avatar.png",
        name: "NeuroFusion",
        role: "Co-Captain",
        per: "20%",
        amount: "$10,000",
        status: "active",
      },
      {
        id: 3,
        avatar_url: "/images/home/user1Avatar.png",
        name: "HoloDash",
        role: "Player",
        per: "20%",
        amount: "$10,000",
        status: "active",
      },
      {
        id: 4,
        avatar_url: "/images/home/user2Avatar.png",
        name: "VirtuaSports",
        role: "Player",
        per: "18%",
        amount: "$9,000",
        status: "pending",
      },
      {
        id: 5,
        avatar_url: "/images/home/user1Avatar.png",
        name: "CyberArena",
        role: "Player",
        per: "17%",
        amount: "$8,500",
        status: "active",
      },
    ],
    total: {
      amount: "$50,000",
      per: "100%",
    },
  },
  roster: {
    auto_lock_tournaments_roster: true,
    allow_emergency_substitutions: false,

    substitutions_requests: [
      {
        id: 1,
        player: {
          name: "Healer",
          mobile: "+911234567890",
        },
        title: "Unavailable Feb 15–20",
        description: "Medical appointment conflict",
      },
    ],
    lock_statuses: {
      current_status: { id: 1, label: "Unlocked" },
      next_tournament: {
        id: 2,
        title: "VR Champions League",
        lock_date: "Feb 14, 2024 - 6:00 PM",
      },
      active_players: {
        total_count: 8,
        available_count: 7,
        substitutes_available: 2,
      },
    },
    recent_activities: [
      {
        id: 1,
        title: "Roster auto-lock enabled for VR Champions League",
        date_time: "2 hours ago",
      },
      {
        id: 2,
        title: "Healer submitted substitution request",
        date_time: "1 day ago",
      },
      {
        id: 3,
        title: "Emergency substitutions policy updated",
        date_time: "3 day ago",
      },
    ],
  },
  disputes: [
    {
      id: 1,
      title: "Practice Schedule Conflict",
      category: { label: "Medium", value: "medium" },
      description:
        "Several team members cannot attend the proposed practice times due to scheduling conflicts.",
      reported_by: "Healer",
      date_time: "1 day ago",
      status: { id: 1, value: "open", label: "Open" },
    },
    {
      id: 2,
      title: "Prize Distribution Concern",
      category: { label: "Investigating", value: "investigating" },
      description:
        "Question about the distribution of recent tournament winnings and transparency in calculations.",
      reported_by: "TankMaster",
      date_time: "1 day ago",
      status: { id: 1, value: "open", label: "Open" },
    },
  ],
};

export const userAchievements = [
  {
    id: 1,
    title: "🏆 First Victory",
    description: "Win your first match in any game",
    category: "Common",
    date: "2024-01-15",
  },
  {
    id: 2,
    title: "👑 Tournament Champion",
    description: "Win your first tournament championship",
    category: "Legendery",
    date: "2024-01-15",
  },
  {
    id: 3,
    title: "⚡ Speed Demon",
    description: "Complete 100 matches in 24 hours",
    category: "Legendery",
    date: "2024-01-15",
  },
];

export const assetsData = [
  {
    id: 1,
    title: "Arena Basketball Pro",
    description:
      "Professional basketball arena with realistic sound effects and immersive crowd atmosphere",
    created_by: "NBAFan2024",
    game: {
      id: 1,
      title: "VR Basketball",
    },
    category: {
      id: "1",
      label: "Stadiums",
      value: "stadiums",
    },
    amount: {
      currency: "€",
      value: 2.99,
    },
    avg_rating: 4.8,
    download_count: "12.5k",
    level: {
      id: "1",
      label: "Advanced",
      value: 4,
    },
    images: [
      {
        id: "6dd387eb-ccc0-42d1-8fcc-28aa459c3c05",
        is_primary: 1,
        image_url: "/images/assets/vr_basketball",
      },
    ],
  },
  {
    id: 2,
    title: "Ultimate Drift Simulator",
    description:
      "Experience high-speed drifting on a variety of tracks with stunning graphics and responsive controls",
    created_by: "Speedster2024",
    game: {
      id: 1,
      title: "Formula Drift",
    },
    category: {
      id: "1",
      label: "Racetracks",
      value: "Racetracks",
    },
    amount: {
      currency: "€",
      value: 2.99,
    },
    avg_rating: 4.7,
    download_count: "8.49k",
    level: {
      id: "5",
      label: "Expert",
      value: 5,
    },
    images: [
      {
        id: "b4e81f28-7ed6-4422-bab2-f0508b2f1dc0",
        is_primary: 1,
        image_url: "/images/assets/vr_drift.png",
      },
    ],
  },
  {
    id: 3,
    title: "Wildlife Adventure",
    description:
      "Experience high-speed drifting on a variety of tracks with stunning graphics and responsive controls",
    created_by: "Speedster2024",
    game: {
      id: 1,
      title: "Explorer",
    },
    category: {
      id: "1",
      label: "Parks",
      value: "Parks",
    },
    amount: {
      currency: "€",
      value: 1.99,
    },
    avg_rating: 4.5,
    download_count: "5.2k",
    level: {
      id: "3",
      label: "Intermediate",
      value: 3,
    },

    images: [
      {
        id: "c3a4357a-da9e-4467-92ad-a07c122dab1d",
        is_primary: 1,
        image_url: "/images/assets/vr_park.png",
      },
    ],
  },
  {
    id: 4,
    title: "Simulator",
    description:
      "Build and manage your dream city, with dynamic events and challenges",
    created_by: "CityBuilder2024",
    game: {
      id: 1,
      title: "Urban Journey",
    },
    category: {
      id: "1",
      label: "Parks",
      value: "Parks",
    },
    amount: {
      currency: "€",
      value: 2.99,
    },
    avg_rating: 4.9,
    download_count: "15.7k",
    level: {
      id: "5",
      label: "Expert",
      value: 5,
    },

    images: [
      {
        id: "c3a4357a-da9e-4467-92ad-a07c122dab1d",
        is_primary: 1,
        image_url: "/images/assets/vr_city.png",
      },
    ],
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
  {
    id: 5,
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

export const contentCreatorData = {
  profile: {
    analytics: [
      {
        id: 1,
        name: "instagram",
        growth_per: "+15.2%",
        followers: "1.2M",
        avg_views: "85K",
        engagement_per: "12.5%",
        posts_count: 342,
      },
      {
        id: 2,
        name: "tickTock",
        growth_per: "+15.2%",
        followers: "1.2M",
        avg_views: "85K",
        engagement_per: "12.5%",
        posts_count: 342,
      },
    ],
    achievements: [
      {
        id: 1,
        icon: "",
        title: "Top Creator",
        subtitle: "Achievement Unlocked",
        description:
          "Recognized as one of the top gaming content creators in the FPS category with over 1M+ combined followers across all platforms.",
      },
      {
        id: 2,
        icon: "",
        title: "Engagement Master",
        subtitle: "Achievement Unlocked",
        description:
          "Achieved exceptional engagement rates across all social media platforms with an average of 15%+ engagement on all content.",
      },
    ],
  },
  latestContent: [
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
    {
      id: 5,
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
  ],

  creator_dashboard: {
    analytics: [
      {
        id: 1,
        followers_growth: "+12.5%",
        total_followers: "125,400",
      },
      {
        id: 2,
        avg_eng_growth: "8.7%",
        avg_eng: "8.7%",
      },
      {
        id: 3,
        watch_growth: "+18.7%",
        total_watch_time: "2,847h",
      },
      {
        id: 4,
        earnings_growth: "+18.2%",
        earnings: "2,847h",
      },
    ],
    quest_rewards: [
      {
        id: 1,
        title: "Weekly Highlight Reel",
        description: "Create and upload a weekly highlight compilation video",
        status: { label: "Active", value: "active" },
        date_time: "3 days left",
        progress_per: "75%",
        tokens: "+500",
      },
      {
        id: 1,
        title: "Viral Moment",
        description: "Achieve 100K+ views on a single piece of content",
        status: { label: "Active", value: "active" },
        date_time: "5 days left",
        progress_per: "45%",
        tokens: "+1000",
      },
      {
        id: 1,
        title: "Community Engagement",
        description: "Respond to 50+ comments across all platforms",
        status: { label: "Completed", value: "completed" },
        progress_per: "75%",
        tokens: "+250",
      },
    ],
    payouts: [
      {
        id: 1,
        title: "Weekly content quest completion",
        date: "Dec 15, 2024",
        amount: {
          currency: "$",
          value: 450,
        },
        status: { label: "completed" },
        category: { label: "quest completion" },
      },
      {
        id: 2,
        title: "Monthly creator bonus",
        date: "Dec 10, 2024",
        amount: {
          currency: "$",
          value: 450,
        },
        status: { label: "pending" },
        category: { label: "monthly bonus" },
      },
      {
        id: 3,
        title: "Brand collaboration payout",
        date: "Dec 8, 2024",
        amount: {
          currency: "$",
          value: 2800,
        },
        status: { label: "processing" },
        category: { label: "collaboration" },
      },
    ],

    social_accounts: [
      {
        id: 1,
        title: "Instagram",
        followers: "89.2K",
        avg_views: "45.8K",
        engagement: "7.2%",
        posts: "156",
      },
      {
        id: 1,
        title: "TikTok",
        followers: "234.7K",
        avg_views: "128.8k",
        engagement: "9.8%",
        posts: "89",
      },
    ],
  },
  top_creators: [
    {
      id: 1,
      avatar_url: "/images/home/user1Avatar.png",
      name: "Jake Thompson",
      userName: "@FrostBite",
      location: "Austin,Tx",
      followers: "150K",
      monthly_growth: "+13%",
      engagement: "8.0%",
      avg_views: "50.0K",
    },
    {
      id: 2,
      avatar_url: "/images/home/user2Avatar.png",
      name: "Maria Garcia",
      userName: "@Quickshot",
      location: "San Francisco, CA",
      followers: "250K",
      monthly_growth: "+13%",
      engagement: "8.5%",
      avg_views: "60.0K",
    },
    {
      id: 3,
      avatar_url: "/images/home/user1Avatar.png",
      name: "Ryan Park",
      userName: "@Defender",
      location: "New York, NY",
      followers: "98.3K",
      monthly_growth: "+10.5%",
      engagement: "7.2%",
      avg_views: "30.0K",
    },
  ],
};

// quest
export const questData = [
  {
    id: 1,
    category: { label: "Social Media" },
    title: "Follow us on X",
    description:
      "Follow @SuraGaming on X for the latest updates and exclusive content",
    completed_count: 0,
    total_count: 1,
    points: "100",
    icon: "xIcon",
  },
  {
    id: 2,
    icon: "instagram",
    category: { label: "Social Media" },
    completed_count: 1,
    total_count: 1,
    points: "100",
    title: "Follow us on Instagram",
    description:
      "Follow our Instagram for behind-the-scenes content and community highlights",
  },
  {
    id: 3,
    icon: "upload",
    category: { label: "Daily Challenge" },
    completed_count: 0,
    total_count: 1,
    points: "100",
    title: "First Upload",
    description: "Upload your first gaming clip to the platform",
  },
  {
    id: 4,
    icon: "social",
    category: { label: "Community" },
    completed_count: 0,
    total_count: 1,
    points: "100",
    title: "Join a Team",
    description: "Join or create a team to compete with friends",
    isVerify: true,
  },
  {
    id: 5,
    icon: "media",
    category: { label: "Engagement" },
    completed_count: 1,
    total_count: 1,
    points: "100",
    title: "Share Epic Moment",
    description:
      "Share your favorite clip on social media and tag us for bonus rewards",
  },
  {
    id: 6,
    icon: "game",
    category: { label: "Gameplay" },
    completed_count: 1,
    total_count: 5,
    points: "100",
    title: "Game Registration",
    description: "Connect a new game to your profile and verify your stats",
  },
];

export const questAnalytics = [
  {
    id: 1,
    title: "Total Progress",
    description: "quests completed",
    completed_count: 1,
    total_count: 8,
    icon: "mission",
  },
  {
    id: 2,
    title: "Active Quests",
    description: "in progress",
    completed_count: 2,
    total_count: 5,
    icon: "trend",
  },
  {
    id: 3,
    title: "Daily Challenges",
    description: "time limited",
    time_left: "22h 15m left",
    icon: "calender",
  },
  {
    id: 4,
    title: "Current Streak",
    description: "daily",
    completed_count: 5,
    total_count: 7,
    icon: "flame",
  },
];
