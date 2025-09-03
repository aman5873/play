export const categoriesData = [
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
    category_id: 1,
    status_id: 1,
    title: "VR World Cup 2023",
    start_date: "2023-05-15",
    total_teams: 32,
    prize: "€50,000",
    images: [
      { id: "img3", url: "/images/games/game2-1.jpg" },
      { id: "img4", url: "/images/games/game2-2.jpg" },
    ],
    primary_image: "/images/games/game2-1.jpg",
  },
];
