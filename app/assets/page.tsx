import AssetsTopComp from "@/components/screens/assets/AssetsTopComp";
import AssetsFeed from "@/components/screens/assets/AssetsFeed";

export default function page() {
  return (
    <div className="flex flex-col gap-2 p-4">
      <AssetsTopComp />
      <AssetsFeed />
    </div>
  );
}
