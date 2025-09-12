import SocialPageFeed from "@/components/social/SocialPageFeed";
import { TopBgComp } from "@/components/TopComp";
import React from "react";

const socialSection = {
  chip: [
    {
      label: "Social Hub",
      icon: "trend",
      type: "primary",
    },
  ],
  title: "Social",
  highlightTitle: "Hub",
  description:
    "Join the largest VR Sports community. Share your best plays, vote for epic content, and participate in our Creator Program.",
  button: [
    {
      icon: "trophy",
      label: "Content Creator Program",
      redirect: "/",
      type: "primary",
    },
    {
      icon: "upload",
      label: "Upload Video",
      redirect: "/tournaments",
      type: "secondary",
    },
  ],
  backgroundImage:
    "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2074&auto=format&fit=crop",
};

export default function page() {
  return (
    <div className="flex flex-col gap-2 p-4">
      <TopBgComp content={socialSection} />
      <SocialPageFeed />
    </div>
  );
}
