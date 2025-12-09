import GameForm, {
  CreateGameTopComp,
} from "@/components/screens/games/GameForm";

export default function page() {
  return (
    <>
      <div className="flex flex-col gap-2 p-[1.2vw] sm:p-[1vw]">
        <CreateGameTopComp />
        <GameForm type={"create"} />
      </div>
    </>
  );
}
