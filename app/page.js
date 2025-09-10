import TopComp from "@/components/TopComp";
import { EpicChallengeFeedComp } from "@/components/screens/EpicChallengeFeed";
import { GameFeedComp } from "@/components/screens/GameFeed";
import { NewsFeedComp } from "@/components/screens/News&UpdatesFeed";
import { SocialFeedComp } from "@/components/screens/SocialHubFeed";
import { TournamentFeedComp } from "@/components/screens/TournamentFeed";

import homeThumbnail from "@/public/images/home/homePlay.png";

const sectionOne = {
  chip: [
    {
      label: "🚀 The Next Generation of Sports",
      type: "primary-gradient",
    },
  ],
  title: "The Ultimate",
  highlightTitle: "Gaming Arena",
  description:
    "Participate in prestigious tournaments, climb the competitive ladder, and establish your reputation as a true gaming legend. Showcase your skills against the best players, earn accolades, and make your mark in the gaming world. With dedication and strategy, you can transform from a newcomer to a celebrated champion.",
  details: [
    { icon: "users", label: "50K+", description: "Active Players" },
    { icon: "trophy", label: "$2.5M+", description: "Prize Pool" },
    { icon: "medal", label: "150+", description: "Tournaments" },
  ],

  thumbnail: homeThumbnail,
  button: [
    { icon: "play", label: "Start Playing", redirect: "/", type: "primary" },
    {
      icon: "trophy",
      label: "View Tournaments",
      redirect: "/tournaments",
      type: "secondary",
    },
  ],
};

export default function Home() {
  return (
    <div className="flex flex-col gap-2 p-4">
      <TopComp content={sectionOne} />
      <EpicChallengeFeedComp />
      <TournamentFeedComp />
      <GameFeedComp />
      <NewsFeedComp />
      <SocialFeedComp />
    </div>
  );
}
