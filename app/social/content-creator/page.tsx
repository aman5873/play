import ContentCreatorTopComp from "@/components/screens/social/ContentCreator/ContentCreatorTopComp";
import ContentCreatorFeed from "@/components/screens/social/ContentCreator/ContentCreatorFeed";

export default function page() {
  return (
    <div className="flex flex-col gap-2 p-4">
      <ContentCreatorTopComp />
      <ContentCreatorFeed />
    </div>
  );
}
