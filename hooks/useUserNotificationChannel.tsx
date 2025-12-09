"use client";

import { useEffect } from "react";
import Pusher from "pusher-js";

// global singleton instance
let pusherInstance: Pusher | null = null;

export function useUserNotificationChannel(userId: string, handlers: any = {}) {
  useEffect(() => {
    if (!userId) return;

    const key = process.env.NEXT_PUBLIC_PUSHER_KEY;
    const cluster = process.env.NEXT_PUBLIC_PUSHER_CLUSTER;

    if (!key || !cluster) {
      console.warn("⚠️ Missing Pusher env");
      return;
    }

    // create global pusher instance once
    if (!pusherInstance) {
      pusherInstance = new Pusher(key, {
        cluster,
        forceTLS: true,
        enabledTransports: ["ws", "wss"],
      });
      console.log("🔌 Pusher initialized (user-notification)");
    }

    const channelName = `user_notify.${userId}`;
    const channel = pusherInstance.subscribe(channelName);

    console.log(`📡 Subscribed → ${channelName}`);

    // ----------- Bind Events --------------

    // 1. Quest ready to claim
    channel.bind("user.ready_to_claim", (data: any) => {
      handlers.onQuestReady?.(data);
    });
    channel.bind("user.stream.started", (data: any) => {
      handlers.onStreamStarted?.(data);
    });

    // 2. Generic notification event (future use)
    channel.bind("notification.created", (data: any) => {
      handlers.onNotification?.(data);
    });

    // You can bind more events here:
    // channel.bind("friend.request", ...)
    // channel.bind("post.liked", ...)

    // cleanup
    return () => {
      console.log(`❌ Unsubscribe → ${channelName}`);
      pusherInstance?.unsubscribe(channelName);
    };
  }, [userId]);
}
