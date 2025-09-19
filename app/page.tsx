import { EpicChallengeFeedComp } from "@/components/screens/EpicChallengeFeed";
import { GameFeedComp } from "@/components/games/GameFeed";
import { LeaderboardAchievementFeedComp } from "@/components/screens/LeaderboardAchievementFeedComp";
import { NewsFeedComp } from "@/components/screens/News&UpdatesFeed";
import { SocialFeedComp } from "@/components/social/SocialHubFeed";
import { TournamentFeedComp } from "@/components/tournaments/TournamentFeed";

import HomeScreenTopComp from "@/components/HomeScreenTopComp";

export default function Home() {
  return (
    <div className="flex flex-col gap-2 p-4">
      <HomeScreenTopComp />
      <EpicChallengeFeedComp />
      <TournamentFeedComp />
      <GameFeedComp />
      <LeaderboardAchievementFeedComp />
      <NewsFeedComp />
      <SocialFeedComp />
    </div>
  );
}
