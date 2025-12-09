import { EpicChallengeFeedComp } from "@/components/screens/EpicChallengeFeed";
import { GameFeedComp } from "@/components/screens/games/GameFeed";
import { LeaderboardAchievementFeedComp } from "@/components/screens/leaderboard/LeaderboardAchievementFeedComp";
import { NewsFeedComp } from "@/components/screens/news/News&UpdatesFeed";
import { TournamentFeedComp } from "@/components/screens/tournaments/TournamentFeed";

import HomeScreenTopComp from "@/components/HomeScreenTopComp";
// import { SocialFeedComp } from "@/components/screens/social/SocialHubFeed";

export default function Home() {
  return (
    <div className="flex flex-col gap-2 p-[1.2vw] sm:p-[1vw]">
      <HomeScreenTopComp />
      <EpicChallengeFeedComp />
      <TournamentFeedComp />
      <GameFeedComp />
      <LeaderboardAchievementFeedComp />
      <NewsFeedComp />
      {/* <SocialFeedComp /> */}
    </div>
  );
}
