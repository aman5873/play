import SocialPageFeed from "@/components/screens/social/SocialPageFeed";
import SocialScreenTopComp from "@/components/screens/social/SocialScreenTopComp";
import SocialAnalyticsComp from "@/components/screens/social/SocialAnalyticsComp";

export default function page() {
  return (
    <div className="flex flex-col gap-2 p-4">
      <SocialScreenTopComp />
      <SocialPageFeed />
      <SocialAnalyticsComp />
    </div>
  );
}
