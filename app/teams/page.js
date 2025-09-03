import TopComp from "@/components/TopComp";
import React from "react";

const content = {
  chip: "Teams",
  title: "Discover the best teams",
  description:
    "Explore the most competitive VR esports teams, along with their stats and achievements.",
  backgroundImage:
    "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2069&auto=format&fit=crop",
};

export default function page() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <TopComp content={content} />
    </div>
  );
}
