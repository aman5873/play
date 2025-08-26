export default function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--background)",
        color: "var(--text)",
      }}
    >
      <h2 style={{ color: "var(--title)", fontSize: "1.5rem" }}>
        Welcome to IMM Play 🎮
      </h2>
      <p style={{ color: "var(--subtitle)", marginTop: "0.5rem" }}>
        Join tournaments, track your rank, and connect with teams.
      </p>
    </div>
  );
}
