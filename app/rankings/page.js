import TopComp from "@/components/TopComp";
import React from "react";

const content = {
  chip: "Rankings",
  title: "Global rankings",
  description: "Discover the world's best players and teams in VR sports.",
  backgroundImage:
    "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2074&auto=format&fit=crop",
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
