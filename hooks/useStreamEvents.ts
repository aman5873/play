"use client";

import { useEffect, useRef } from "react";
import Pusher from "pusher-js";

// Global singleton Pusher instance
let pusherInstance: Pusher | null = null;

export function useStreamEvents(
  onEvent: (event: { type: "started" | "stopped"; payload: any }) => void
) {
  const subscribed = useRef(false);

  useEffect(() => {
    // Create  Pusher client once (global)
    if (!pusherInstance) {
      const key = process?.env?.NEXT_PUBLIC_PUSHER_KEY;
      const cluster = process?.env?.NEXT_PUBLIC_PUSHER_CLUSTER;

      if (!key || !cluster) {
        console.warn("⚠️ Pusher not initialized — missing env variables.");
        return null; // gracefully exit
      }

      pusherInstance = new Pusher(key, {
        cluster,
        forceTLS: true,
        enabledTransports: ["ws", "wss"], // stable across browsers & sleep
      });

      console.log("🔌 Pusher initialized");
    }

    const channel = pusherInstance.subscribe("streams");

    if (!subscribed.current) {
      subscribed.current = true;

      // Connection state events
      pusherInstance.connection.bind("connected", () => {
        console.log(
          "🟢 Pusher connected:",
          pusherInstance?.connection.socket_id
        );
      });

      pusherInstance.connection.bind("disconnected", () => {
        console.log("🔴 Pusher disconnected");
      });

      pusherInstance.connection.bind("unavailable", () => {
        console.log("⚠️ Pusher temporarily unavailable (network offline?)");
      });

      pusherInstance.connection.bind("failed", () => {
        console.log("❌ Pusher failed — retrying…");
        pusherInstance?.connect();
      });

      // Reconnect when tab becomes active again
      document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "visible") {
          console.log("👀 Tab active → ensuring connection");
          pusherInstance?.connect();
        }
      });

      // Bind Events
      channel.bind("stream.started", (data: any) => {
        try {
          const payload =
            typeof data === "string" ? JSON.parse(data).payload : data.payload;
          console.log("📡 Stream Started:", payload);
          onEvent({ type: "started", payload });
        } catch (e) {
          console.error("stream.started parse error", e);
        }
      });

      channel.bind("stream.stopped", (data: any) => {
        try {
          const payload =
            typeof data === "string" ? JSON.parse(data).payload : data.payload;
          console.log("⛔ Stream Stopped:", payload);
          onEvent({ type: "stopped", payload });
        } catch (e) {
          console.error("stream.stopped parse error", e);
        }
      });
    }

    // Cleanup (but keep global connection persistent)
    return () => {
      console.log("⚠️ useStreamEvents unmounted — keeping connection alive");
    };
  }, [onEvent]);
}
