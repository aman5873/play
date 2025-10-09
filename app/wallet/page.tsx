import WalletTopComp from "@/components/screens/wallet/WalletTopComp";
import WalletPage from "@/components/screens/wallet/WalletPage";

export default function page() {
  return (
    <div className="flex flex-col gap-2 p-4">
      <WalletTopComp />
      <WalletPage />
    </div>
  );
}
