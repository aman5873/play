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
    title: "Clash of clan",
    tagline:
      "Explore our vast collection of premium games across all genres. Find your next gaming obsession.",
    description:
      "Join millions of players worldwide as you build your village, raise a clan, and compete in epic Clan Wars! Clash of Clans is an epic combat strategy game where you build your village, train your troops, and battle with millions of other players online!",
    download_link: "",
    website_link: "",
    networks: "clashofclane.com",
    category: "Adventure",
    active_players_count: 20,
    status: "active",

    release_date: "2024-05-12",
    size: "200mb",
    in_app_purchase: "$0.99 - $99.99",
    age_rating: "9+ (Everyone 9+)",
    publisher: "Supercell",
    developer: "Unity Labs",
    genres: ["Multiplayer", "Free-to-Play"],
    review: {
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
    },
    socials: [
      { key: "twitter", value: "https://x.com/" },
      { key: "instagram", value: "https://www.instagram.com/" },
      { key: "discord", value: "https://discord.com/" },
    ],
    platforms: [
      { key: "android", value: "https://play.google.com/store/apps?hl=en_IN" },
      { key: "ios", value: "https://www.apple.com/in/app-store/" },
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
  },

  {
    id: 2,
    title: "Skydiving Extreme",
    tagline:
      "Explore our vast collection of premium games across all genres. Find your next gaming obsession.",
    description:
      "Feel the adrenaline rush of professional tennis in virtual reality. With precise gameplay mechanics and detailed environments, VR Tennis Pro offers the most realistic tennis experience ever created.",

    download_link: "",
    website_link: "",
    category: "extreme",
    active_players_count: 30,
    status: "active",

    release_date: "2024-06-20",
    size: "240mb",
    in_app_purchase: "$0.99 - $99.99",
    age_rating: "9+ (Everyone 9+)",
    publisher: "Supercell",
    developer: "Supercell",
    genres: ["Fantasy", "Mobile"],
    review: {
      total_review: 2847,
      average_rating: 4.7,
      reviews: [
        {
          id: 1,
          user: {
            name: "ChiefWarrior",
            avatar_url: "/images/home/user2Avatar.png",
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
            avatar_url: "/images/home/user2Avatar.png",
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
    },
    socials: [
      { key: "twitter", value: "https://x.com/" },
      { key: "instagram", value: "https://www.instagram.com/" },
      { key: "discord", value: "https://discord.com/" },
    ],
    platforms: [
      { key: "android", value: "https://play.google.com/store/apps?hl=en_IN" },
      { key: "ios", value: "https://www.apple.com/in/app-store/" },
    ],

    images: [
      { id: "img3", image_path: "/images/games/game2-1.jpg", is_primary: 0 },
      { id: "img4", image_path: "/images/games/game2-2.jpg", is_primary: 1 },
      { id: "img3", image_path: "/images/games/game2-1.jpg", is_primary: 0 },
      { id: "img4", image_path: "/images/games/game2-2.jpg", is_primary: 0 },
    ],
  },
  {
    id: 3,
    title: "VR Basketball",
    tagline:
      "Explore our vast collection of premium games across all genres. Find your next gaming obsession.",
    description:
      "Feel the adrenaline rush of professional tennis in virtual reality. With precise gameplay mechanics and detailed environments, VR Tennis Pro offers the most realistic tennis experience ever created.",
    download_link: "",
    website_link: "",
    category: "sports",
    active_players_count: 100,
    status: "active",

    release_date: "2024-05-12",
    size: "200mb",
    in_app_purchase: "$0.99 - $99.99",
    age_rating: "9+ (Everyone 9+)",
    publisher: "Supercell",
    developer: "Unity Labs",
    genres: ["Free-to-Play", "Fantasy", "Mobile"],
    review: {
      total_review: 2847,
      average_rating: 4.7,
      reviews: [
        {
          id: 1,
          user: {
            name: "ChiefWarrior",
            avatar_url: "/images/home/user2Avatar.png",
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
            avatar_url: "/images/home/user2Avatar.png",
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
    },
    socials: [
      { key: "twitter", value: "https://x.com/" },
      { key: "instagram", value: "https://www.instagram.com/" },
      { key: "discord", value: "https://discord.com/" },
    ],
    platforms: [
      { key: "android", value: "https://play.google.com/store/apps?hl=en_IN" },
      { key: "ios", value: "https://www.apple.com/in/app-store/" },
    ],

    images: [
      { id: "img1", image_path: "/images/games/game1-1.jpg", is_primary: 1 },
      { id: "img2", image_path: "/images/games/game1-2.jpg", is_primary: 0 },
      { id: "img3", image_path: "/images/games/game2-1.jpg", is_primary: 0 },
      { id: "img3", image_path: "/images/games/game2-1.jpg", is_primary: 0 },
    ],
  },
  {
    id: 4,
    title: "Clash of clan",
    tagline:
      "Explore our vast collection of premium games across all genres. Find your next gaming obsession.",
    description:
      "Join millions of players worldwide as you build your village, raise a clan, and compete in epic Clan Wars! Clash of Clans is an epic combat strategy game where you build your village, train your troops, and battle with millions of other players online!",
    download_link: "",
    website_link: "",
    category: "Adventure",
    active_players_count: 20,
    status: "active",

    release_date: "2024-05-12",
    size: "200mb",
    in_app_purchase: "$0.99 - $99.99",
    age_rating: "9+ (Everyone 9+)",
    publisher: "Supercell",
    developer: "Unity Labs",
    genres: ["Multiplayer", "Free-to-Play"],
    review: {
      total_review: 2847,
      average_rating: 4.7,
      reviews: [
        {
          id: 1,
          user: {
            name: "ChiefWarrior",
            avatar_url: "/images/home/user2Avatar.png",
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
            avatar_url: "/images/home/user2Avatar.png",
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
    },
    socials: [
      { key: "twitter", value: "https://x.com/" },
      { key: "instagram", value: "https://www.instagram.com/" },
      { key: "discord", value: "https://discord.com/" },
    ],
    platforms: [
      { key: "android", value: "https://play.google.com/store/apps?hl=en_IN" },
      { key: "ios", value: "https://www.apple.com/in/app-store/" },
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
  },

  {
    id: 5,
    title: "Skydiving Extreme",
    tagline:
      "Explore our vast collection of premium games across all genres. Find your next gaming obsession.",
    description:
      "Feel the adrenaline rush of professional tennis in virtual reality. With precise gameplay mechanics and detailed environments, VR Tennis Pro offers the most realistic tennis experience ever created.",

    download_link: "",
    website_link: "",
    category: "extreme",
    active_players_count: 30,
    status: "active",

    release_date: "2024-06-20",
    size: "240mb",
    in_app_purchase: "$0.99 - $99.99",
    age_rating: "9+ (Everyone 9+)",
    publisher: "Supercell",
    developer: "Supercell",
    genres: ["Fantasy", "Mobile"],
    review: {
      total_review: 2847,
      average_rating: 4.7,
      reviews: [
        {
          id: 1,
          user: {
            name: "ChiefWarrior",
            avatar_url: "/images/home/user2Avatar.png",
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
            avatar_url: "/images/home/user2Avatar.png",
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
    },
    socials: [
      { key: "twitter", value: "https://x.com/" },
      { key: "instagram", value: "https://www.instagram.com/" },
      { key: "discord", value: "https://discord.com/" },
    ],
    platforms: [
      { key: "android", value: "https://play.google.com/store/apps?hl=en_IN" },
      { key: "ios", value: "https://www.apple.com/in/app-store/" },
    ],

    images: [
      { id: "img3", image_path: "/images/games/game2-1.jpg", is_primary: 0 },
      { id: "img4", image_path: "/images/games/game2-2.jpg", is_primary: 1 },
      { id: "img3", image_path: "/images/games/game2-1.jpg", is_primary: 0 },
      { id: "img4", image_path: "/images/games/game2-2.jpg", is_primary: 0 },
    ],
  },
  {
    id: 6,
    title: "VR Basketball",
    tagline:
      "Explore our vast collection of premium games across all genres. Find your next gaming obsession.",
    description:
      "Feel the adrenaline rush of professional tennis in virtual reality. With precise gameplay mechanics and detailed environments, VR Tennis Pro offers the most realistic tennis experience ever created.",
    download_link: "",
    website_link: "",
    category: "sports",
    active_players_count: 100,
    status: "active",

    release_date: "2024-05-12",
    size: "200mb",
    in_app_purchase: "$0.99 - $99.99",
    age_rating: "9+ (Everyone 9+)",
    publisher: "Supercell",
    developer: "Unity Labs",
    genres: ["Free-to-Play", "Fantasy", "Mobile"],
    review: {
      total_review: 2847,
      average_rating: 4.7,
      reviews: [
        {
          id: 1,
          user: {
            name: "ChiefWarrior",
            avatar_url: "/images/home/user2Avatar.png",
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
            avatar_url: "/images/home/user2Avatar.png",
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
    },
    socials: [
      { key: "twitter", value: "https://x.com/" },
      { key: "instagram", value: "https://www.instagram.com/" },
      { key: "discord", value: "https://discord.com/" },
    ],
    platforms: [
      { key: "android", value: "https://play.google.com/store/apps?hl=en_IN" },
      { key: "ios", value: "https://www.apple.com/in/app-store/" },
    ],

    images: [
      { id: "img1", image_path: "/images/games/game1-1.jpg", is_primary: 1 },
      { id: "img2", image_path: "/images/games/game1-2.jpg", is_primary: 0 },
      { id: "img3", image_path: "/images/games/game2-1.jpg", is_primary: 0 },
      { id: "img3", image_path: "/images/games/game2-1.jpg", is_primary: 0 },
    ],
  },

  {
    id: 7,
    title: "Clash of clan",
    tagline:
      "Explore our vast collection of premium games across all genres. Find your next gaming obsession.",
    description:
      "Join millions of players worldwide as you build your village, raise a clan, and compete in epic Clan Wars! Clash of Clans is an epic combat strategy game where you build your village, train your troops, and battle with millions of other players online!",
    download_link: "",
    website_link: "",
    category: "Adventure",
    active_players_count: 20,
    status: "active",

    release_date: "2024-05-12",
    size: "200mb",
    in_app_purchase: "$0.99 - $99.99",
    age_rating: "9+ (Everyone 9+)",
    publisher: "Supercell",
    developer: "Unity Labs",
    genres: ["Multiplayer", "Free-to-Play"],
    review: {
      total_review: 2847,
      average_rating: 4.7,
      reviews: [
        {
          id: 1,
          user: {
            name: "ChiefWarrior",
            avatar_url: "/images/home/user2Avatar.png",
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
            avatar_url: "/images/home/user2Avatar.png",
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
    },
    socials: [
      { key: "twitter", value: "https://x.com/" },
      { key: "instagram", value: "https://www.instagram.com/" },
      { key: "discord", value: "https://discord.com/" },
    ],
    platforms: [
      { key: "android", value: "https://play.google.com/store/apps?hl=en_IN" },
      { key: "ios", value: "https://www.apple.com/in/app-store/" },
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
  },

  {
    id: 8,
    title: "Skydiving Extreme",
    tagline:
      "Explore our vast collection of premium games across all genres. Find your next gaming obsession.",
    description:
      "Feel the adrenaline rush of professional tennis in virtual reality. With precise gameplay mechanics and detailed environments, VR Tennis Pro offers the most realistic tennis experience ever created.",

    download_link: "",
    website_link: "",
    category: "extreme",
    active_players_count: 30,
    status: "active",

    release_date: "2024-06-20",
    size: "240mb",
    in_app_purchase: "$0.99 - $99.99",
    age_rating: "9+ (Everyone 9+)",
    publisher: "Supercell",
    developer: "Supercell",
    genres: ["Fantasy", "Mobile"],
    review: {
      total_review: 2847,
      average_rating: 4.7,
      reviews: [
        {
          id: 1,
          user: {
            name: "ChiefWarrior",
            avatar_url: "/images/home/user2Avatar.png",
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
            avatar_url: "/images/home/user2Avatar.png",
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
    },
    socials: [
      { key: "twitter", value: "https://x.com/" },
      { key: "instagram", value: "https://www.instagram.com/" },
      { key: "discord", value: "https://discord.com/" },
    ],
    platforms: [
      { key: "android", value: "https://play.google.com/store/apps?hl=en_IN" },
      { key: "ios", value: "https://www.apple.com/in/app-store/" },
    ],

    images: [
      { id: "img3", image_path: "/images/games/game2-1.jpg", is_primary: 0 },
      { id: "img4", image_path: "/images/games/game2-2.jpg", is_primary: 1 },
      { id: "img3", image_path: "/images/games/game2-1.jpg", is_primary: 0 },
      { id: "img4", image_path: "/images/games/game2-2.jpg", is_primary: 0 },
    ],
  },
  {
    id: 9,
    title: "VR Basketball",
    tagline:
      "Explore our vast collection of premium games across all genres. Find your next gaming obsession.",
    description:
      "Feel the adrenaline rush of professional tennis in virtual reality. With precise gameplay mechanics and detailed environments, VR Tennis Pro offers the most realistic tennis experience ever created.",
    download_link: "",
    website_link: "",
    category: "sports",
    active_players_count: 100,
    status: "active",

    release_date: "2024-05-12",
    size: "200mb",
    in_app_purchase: "$0.99 - $99.99",
    age_rating: "9+ (Everyone 9+)",
    publisher: "Supercell",
    developer: "Unity Labs",
    genres: ["Free-to-Play", "Fantasy", "Mobile"],
    review: {
      total_review: 2847,
      average_rating: 4.7,
      reviews: [
        {
          id: 1,
          user: {
            name: "ChiefWarrior",
            avatar_url: "/images/home/user2Avatar.png",
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
            avatar_url: "/images/home/user2Avatar.png",
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
    },
    socials: [
      { key: "twitter", value: "https://x.com/" },
      { key: "instagram", value: "https://www.instagram.com/" },
      { key: "discord", value: "https://discord.com/" },
    ],
    platforms: [
      { key: "android", value: "https://play.google.com/store/apps?hl=en_IN" },
      { key: "ios", value: "https://www.apple.com/in/app-store/" },
    ],

    images: [
      { id: "img1", image_path: "/images/games/game1-1.jpg", is_primary: 1 },
      { id: "img2", image_path: "/images/games/game1-2.jpg", is_primary: 0 },
      { id: "img3", image_path: "/images/games/game2-1.jpg", is_primary: 0 },
      { id: "img3", image_path: "/images/games/game2-1.jpg", is_primary: 0 },
    ],
  },
];

// ******** tournament
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
      id: "tour-1",
      title: "Clan Tournament",
      description:
        "Explore our vast collection of premium games across all genres. Find your next gaming obsession.",

      status: "Registration open",
      how_to_register: [
        "After creating an account, click Join Tournament above.",
        "Then [Join our Discord Server](YOUR DISCORD URL). We'll be coordinating matches in the #GAMENAME channel and assisting players. DISCORDNAME#1234 is the main admin to message with any questions.",
        "Lastly, head to your Account Settings and add your GAME NAME username in the 'Platform Links' tab. This will make it much easier to challenge your opponent the day of the tournament when we check into the Discord.",
      ],
      format: [
        "Capped at 128 Players. Best of 3 Matches.",
        "The finals Best of 5. Single Elimination Bracket.",
        "Start Time: January Xth at Xpm EST.",
      ],
      frequently_asked: [
        "The bracket will be viewable on this page after the tournament starts. Tournament payouts will be paid out immediately after the tournament ends. Reach out to CONTACT EMAIL with any questions.",
      ],

      start_date: "2025-09-30",
      teams_participated_count: 16,
      max_teams: 32,
      prize: "$ 50,000",
      categories: ["VR Snowboarding", "Single Elimination", "1v1"],

      category: "VR Snowboarding",
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

      organizer: {
        avatar_url: "/images/home/user1Avatar.png",
        name: "IMM Sports",
      },
    },

    {
      id: "tour-2",
      title: "VR Basketball Masters",
      description:
        "The 2023 VR World Cup is the biggest virtual reality football event. 32 teams from around the world will compete to win the world title and a €50,000 prize pool. The tournament will be played over three weeks, with group stages followed by knockout rounds. Matches will be streamed live on our official platform.",
      status: "Registration open",
      how_to_register: [
        "After creating an account, click Join Tournament above.",
        "Then [Join our Discord Server](YOUR DISCORD URL). We'll be coordinating matches in the #GAMENAME channel and assisting players. DISCORDNAME#1234 is the main admin to message with any questions.",
        "Lastly, head to your Account Settings and add your GAME NAME username in the 'Platform Links' tab. This will make it much easier to challenge your opponent the day of the tournament when we check into the Discord.",
      ],
      format: [
        "Capped at 128 Players. Best of 3 Matches.",
        "The finals Best of 5. Single Elimination Bracket.",
        "Start Time: January Xth at Xpm EST.",
      ],
      frequently_asked: [
        "The bracket will be viewable on this page after the tournament starts. Tournament payouts will be paid out immediately after the tournament ends. Reach out to CONTACT EMAIL with any questions.",
      ],

      start_date: "2025-07-15",
      teams_participated_count: 16,
      max_teams: 16,
      prize: "25,000",
      category: "VR Basketball",
      categories: ["VR Basketball"],
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

      organizer: {
        avatar_url: "/images/home/user3Avatar.png",
        name: "IMM Sports",
      },
    },
    {
      id: 3,
      title: "VR World Cup 2023",
      description:
        "The 2023 VR World Cup is the biggest virtual reality football event. 32 teams from around the world will compete to win the world title and a €50,000 prize pool. The tournament will be played over three weeks, with group stages followed by knockout rounds. Matches will be streamed live on our official platform.",
      status: "Registration open",
      how_to_register: [
        "After creating an account, click Join Tournament above.",
        "Then [Join our Discord Server](YOUR DISCORD URL). We'll be coordinating matches in the #GAMENAME channel and assisting players. DISCORDNAME#1234 is the main admin to message with any questions.",
        "Lastly, head to your Account Settings and add your GAME NAME username in the 'Platform Links' tab. This will make it much easier to challenge your opponent the day of the tournament when we check into the Discord.",
      ],
      format: [
        "Capped at 128 Players. Best of 3 Matches.",
        "The finals Best of 5. Single Elimination Bracket.",
        "Start Time: January Xth at Xpm EST.",
      ],
      frequently_asked: [
        "The bracket will be viewable on this page after the tournament starts. Tournament payouts will be paid out immediately after the tournament ends. Reach out to CONTACT EMAIL with any questions.",
      ],

      start_date: "2025-07-15",
      teams_participated_count: 16,
      max_teams: 32,
      prize: "50,000",
      category: "VR Soccer League",
      categories: ["VR Soccer League"],
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

      organizer: {
        avatar_url: "/images/home/user1Avatar.png",
        name: "IMM Sports",
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
