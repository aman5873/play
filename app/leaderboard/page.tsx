import LeaderboardPageFeed from "@/components/screens/leaderboard/LeaderboardPageFeed";
import LeaderboardScreenTopComp from "@/components/screens/leaderboard/LeaderboardScreenTopComp";

export default function page() {
  return (
    <div className="flex flex-col gap-2 p-2 sm:p-4">
      <LeaderboardScreenTopComp />
      <LeaderboardPageFeed />
    </div>
  );
}
