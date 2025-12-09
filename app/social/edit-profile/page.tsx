import ContentCreatorTopComp from "@/components/screens/social/components/ContentCreatorTopComp";
import EditProfile from "@/components/screens/social/components/EditProfile";

export default function page() {
  return (
    <div className="flex flex-col gap-2 p-[1.2vw] sm:p-[1vw]">
      <ContentCreatorTopComp handleRefresh={null} />
      <EditProfile />
    </div>
  );
}
