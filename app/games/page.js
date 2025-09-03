"use client";
import React, { useEffect, useState, useMemo } from "react";

import { GameCard } from "@/components/screens/GameFeed";
import TopComp from "@/components/TopComp";
import { gamesData } from "@/constants/gameData";
import ReactSelectInput from "@/components/common/ReactSelectInput";

// Top banner content
const content = {
  chip: "Games",
  title: "Discover our VR sports",
  description:
    "Explore our collection of virtual reality sports games and take your skills to the next level.",
  backgroundImage:
    "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=2078&auto=format&fit=crop",
};

function GamePageFeed() {
  const [gameList, setGameList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Load data
  useEffect(() => {
    setGameList(gamesData);
  }, []);

  // Debounce search (delay updates)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm.toLowerCase());
    }, 400);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Extract unique categories for dropdown
  const categoryOptions = useMemo(() => {
    const uniqueCategories = [
      ...new Set(gamesData.map((g) => g.category).filter(Boolean)),
    ];
    return uniqueCategories.map((c) => ({ value: c, label: c }));
  }, []);

  // Filtered results
  const filteredGames = useMemo(() => {
    return gameList.filter((game) => {
      const matchesSearch =
        !debouncedTerm ||
        game.title?.toLowerCase().includes(debouncedTerm) ||
        game.status?.toLowerCase().includes(debouncedTerm) ||
        game.category?.toLowerCase().includes(debouncedTerm) ||
        game.description?.toLowerCase().includes(debouncedTerm);

      const matchesCategory =
        !selectedCategory || game.category === selectedCategory.value;

      return matchesSearch && matchesCategory;
    });
  }, [gameList, debouncedTerm, selectedCategory]);

  return (
    <div className="px-10 mx-auto py-10 pb-20 w-full">
      {/* Search + Filter controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        {/* Search box */}
        <input
          type="text"
          placeholder="Search games..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full  px-4 py-2 rounded-lg border"
          style={{
            borderColor: "var(--border)",
            backgroundColor: "var(--surface)",
            color: "var(--text)",
          }}
        />

        {/* Category dropdown */}
        <div className="w-full">
          <ReactSelectInput
            value={selectedCategory}
            onChange={setSelectedCategory}
            options={categoryOptions}
            placeholder="Filter by category"
          />
        </div>
      </div>

      {/* Game cards */}
      <div className="flex flex-wrap gap-5 scroll-smooth scrollbar-hide mx-auto">
        {filteredGames.length > 0 ? (
          filteredGames.map((obj) => (
            <GameCard
              key={obj?.id}
              gameInfo={obj}
              style={{ margin: 0 }}
              showDesc={true}
            />
          ))
        ) : (
          <p style={{ color: "var(--subtitle)" }}>No games found.</p>
        )}
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <TopComp content={content} />
      <GamePageFeed />
    </div>
  );
}
