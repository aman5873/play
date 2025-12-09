import WalletTopComp from "@/components/screens/wallet/WalletTopComp";
import WalletPage from "@/components/screens/wallet/WalletPage";

export default function page() {
  return (
    <div className="flex flex-col gap-2 p-[1.2vw] sm:p-[1vw]">
      <WalletTopComp />
      <WalletPage />
    </div>
  );
}
