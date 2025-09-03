import TopComp from "@/components/TopComp";
import React from "react";

const content = {
  chip: "Tournaments",
  title: "Compete in our tournaments",
  description:
    "Participate in VR sports tournaments, show off your skills, and win exclusive prizes.",
  backgroundImage:
    "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=2070&auto=format&fit=crop",
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
