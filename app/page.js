"use client";

export default function Home() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{ background: "var(--background)", color: "var(--text)" }}
    >
      <h2 style={{ color: "var(--title)" }} className="text-2xl">
        Welcome to IMM Play 🎮
      </h2>
      <p style={{ color: "var(--subtitle)" }} className="mt-2">
        Join tournaments, track your rank, and connect with teams.
      </p>
    </div>
  );
}
