import QuestsTopComp from "@/components/screens/quests/QuestsTopComp";
import QuestAnalyticsComp from "@/components/screens/quests/QuestAnalyticsComp";
import QuestFeed from "@/components/screens/quests/QuestFeed";

export default function page() {
  return (
    <div className="flex flex-col gap-2 p-4">
      <QuestsTopComp />
      <QuestAnalyticsComp />
      <QuestFeed />
    </div>
  );
}
