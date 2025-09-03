import GameFeed from "@/components/screens/GameFeed";
import TournamentFeed from "@/components/screens/TournamentFeed";
import TopComp from "@/components/TopComp";

const content = {
  backgroundImage:
    "https://images.unsplash.com/photo-1622979135240-caa6648190b6?q=80&w=2070&auto=format&fit=crop",
  chip: "The new generation of sports",
  title: " Dominate the world of",
  highlightTitle: "IMM Play",
  description:
    "Compete in virtual reality sports, earn points, and win exclusive prizes. Join the sports community of the future.",
  button: [
    { label: "Join Now", redirect: "/join", type: "primary" },
    {
      label: "Explore tournaments",
      redirect: "/tournaments",
      type: "secondary",
    },
  ],
};

export default function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        // alignItems: "center",
        // justifyContent: "center",
        // background: "var(--background)",
        // color: "var(--text)",
      }}
    >
      <TopComp content={content} contClass={"md:h-[55vh] lg:h-[70vh]"} />
      <GameFeed />
      <TournamentFeed />
    </div>
  );
}
