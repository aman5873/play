import QuestsTopComp from "@/components/screens/quests/QuestsTopComp";
import QuestFeed from "@/components/screens/quests/QuestFeed";

export default function page() {
  return (
    <div className="flex flex-col gap-2 p-[2vw] sm:p-[1vw]">
      <QuestsTopComp />
      <QuestFeed />
    </div>
  );
}
