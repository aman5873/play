import ContentCreatorTopComp from "@/components/screens/social/creator/ContentCreatorTopComp";
import ContentCreatorFeed from "@/components/screens/social/creator/ContentCreatorFeed";

export default function page() {
  return (
    <div className="flex flex-col gap-2 p-4">
      <ContentCreatorTopComp />
      <ContentCreatorFeed />
    </div>
  );
}
