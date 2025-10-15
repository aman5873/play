import ContentCreatorTopComp from "@/components/screens/social/contentCreator/ContentCreatorTopComp";
import ContentProfileFeed from "@/components/screens/social/contentCreator/ContentProfileFeed";

export default function page() {
  return (
    <div className="flex flex-col gap-2 p-4">
      <ContentCreatorTopComp />
      <ContentProfileFeed />
    </div>
  );
}
