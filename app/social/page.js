import TopComp from "@/components/TopComp";
import React from "react";

const content = {
  title: "VR Social Hub",
  description:
    "Discover, share, and connect with the world's largest VR sports community.",
  // backgroundImage:
  //   "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2074&auto=format&fit=crop",
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
