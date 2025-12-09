"use client";

import { useEffect } from "react";
import Pusher from "pusher-js";

// Global singleton
let pusherInstance = null;

export function useLiveStreamChannel(streamId, handlers: any = {}) {
  useEffect(() => {
    if (!streamId) return;

    const key = process.env.NEXT_PUBLIC_PUSHER_KEY;
    const cluster = process.env.NEXT_PUBLIC_PUSHER_CLUSTER;

    if (!key || !cluster) {
      console.warn("⚠️ Missing pusher env");
      return;
    }

    // create global instance
    if (!pusherInstance) {
      pusherInstance = new Pusher(key, {
        cluster,
        forceTLS: true,
        enabledTransports: ["ws", "wss"],
      });
      console.log("🔌 Pusher initialized (live-stream)");
    }

    // subscribe per stream
    const channelName = `stream.${streamId}`;
    const channel = pusherInstance.subscribe(channelName);

    console.log(`📡 Subscribed → ${channelName}`);

    // bind events
    channel.bind("comment.created", (data) => handlers.onComment?.(data));
    channel.bind("reaction.created", (data) => handlers.onReaction?.(data));
    channel.bind("poll.created", (data) => handlers.onPollCreated?.(data));
    channel.bind("poll.vote", (data) => handlers.onPollVote?.(data));

    return () => {
      console.log(`❌ Unsubscribe → ${channelName}`);
      pusherInstance?.unsubscribe(channelName);
    };
  }, [streamId]);
}
