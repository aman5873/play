"use client";
import ReactSelectInput from "@/components/common/ReactSelectInput";
import { TournamentCard } from "@/components/screens/TournamentFeed";
import TopComp from "@/components/TopComp";
import { tournamentsData } from "@/constants/gameData";
import React, { useEffect, useMemo, useState } from "react";

const content = {
  chip: ["Tournaments"],
  title: "Compete in our tournaments",
  description:
    "Participate in VR sports tournaments, show off your skills, and win exclusive prizes.",
  backgroundImage:
    "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=2070&auto=format&fit=crop",
};

function TournamentFeed() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [tournamentList, setTournamentList] = useState([]);

  useEffect(() => {
    setTournamentList(tournamentsData);
  }, []);

  // Load data
  useEffect(() => {
    setTournamentList(tournamentsData);
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
      ...new Set(tournamentsData.map((g) => g.category).filter(Boolean)),
    ];
    return uniqueCategories.map((c) => ({ value: c, label: c }));
  }, []);

  // Filtered results
  const filteredGames = useMemo(() => {
    return tournamentList.filter((game) => {
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
  }, [tournamentList, debouncedTerm, selectedCategory]);

  return (
    <div className="px-10 mx-auto py-10 pb-20 w-full">
      {/* Search + Filter controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        {/* Search box */}
        <input
          type="text"
          placeholder="Search Tournament..."
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
            <TournamentCard
              key={obj?.id}
              tournamentInfo={obj}
              style={{ margin: 0 }}
              showDesc={true}
              contClass={"w-[20rem] sm:w-full lg:w-[28rem]"}
            />
          ))
        ) : (
          <p style={{ color: "var(--subtitle)" }}>No tournaments found.</p>
        )}
      </div>
    </div>
  );
}

export default function page() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <TopComp content={content} />
      <TournamentFeed />
    </div>
  );
}
