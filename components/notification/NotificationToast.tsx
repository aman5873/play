"use client";
import { encodeUUID } from "@/lib/system";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

// helper to convert "minutes ago" → MySQL timestamp
function mysqlTimeAgo(minutesAgo) {
  const d = new Date(Date.now() - minutesAgo * 60 * 1000);
  return d.toISOString().slice(0, 19).replace("T", " ");
}

export const dummyNotifications = [
  {
    message: "You’ve completed the quest: First Stream!",
    type: "quest",
    data: { quest_id: "enc_qid_123", reward: 50 },
    created_at: mysqlTimeAgo(2), // 2 minutes ago
  },
  {
    message: "New quest available: Reach 5 Followers",
    type: "quest",
    data: { quest_id: "enc_qid_789", followers_required: 5 },
    created_at: mysqlTimeAgo(10), // 10 minutes ago
  },
  {
    message: "You unlocked a new badge!",
    type: "system",
    data: { badge: "Early Streamer" },
    created_at: mysqlTimeAgo(30), // 30 minutes ago
  },
  {
    message: "Your friend Alex just went live!",
    type: "stream",
    data: { stream_id: "enc_sid_556" },
    created_at: mysqlTimeAgo(45), // 45 minutes ago
  },
  {
    message: "New follower joined your profile.",
    type: "social",
    data: { user_id: "enc_uid_912" },
    created_at: mysqlTimeAgo(60), // 1 hour ago
  },

  // ⭐ Additional Notifications Below
  {
    message: "Daily Challenge Completed! +20 XP earned.",
    type: "challenge",
    data: { challenge_id: "enc_ch_001", reward_xp: 20 },
    created_at: mysqlTimeAgo(90), // 1.5 hours ago
  },
  {
    message: "Someone commented on your post.",
    type: "comment",
    data: {
      post_id: "enc_pid_244",
      comment_id: "enc_cid_78",
      user: "John Doe",
    },
    created_at: mysqlTimeAgo(120), // 2 hours ago
  },
  {
    message: "Your post received a new like!",
    type: "like",
    data: { post_id: "enc_pid_351", user: "Emily Fox" },
    created_at: mysqlTimeAgo(150), // 2.5 hours ago
  },
  {
    message: "You earned 10 Stream Points while watching.",
    type: "reward",
    data: { stream_id: "enc_sid_704", points: 10 },
    created_at: mysqlTimeAgo(200), // 3h 20m ago
  },
  {
    message: "New friend request from Daniel.",
    type: "friend",
    data: { user_id: "enc_uid_333", name: "Daniel" },
    created_at: mysqlTimeAgo(240), // 4 hours ago
  },
];

export function useToasts() {
  const [toasts, setToasts] = useState([]);

  const addToast = (toast) => {
    setToasts((prev) => {
      const newToast = { id: Date.now(), ...toast };

      // Determine device limit
      const isMobile = window.innerWidth < 640; // sm breakpoint
      const limit = isMobile ? 2 : 4;

      // Add & trim older toasts if exceed limit
      const updated = [...prev, newToast];
      if (updated.length > limit) {
        return updated.slice(updated.length - limit); // keep newest
      }

      return updated;
    });
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return { toasts, addToast, removeToast };
}

export function ToastItem({ toast, removeToast }) {
  const router = useRouter();

  const handleClick = (toast) => {
    if (toast.type === "quest" && toast?.data?.id) {
      const encryptedQuestId = encodeUUID(toast.data.id);
      router.push(`/quests?claim=${encryptedQuestId}`);
      removeToast(toast.id);
    } else if (toast.type === "stream" && toast?.data?.user_id) {
      const encryptedStreamId = encodeUUID(toast?.data?.user_id);
      router.push(`/social/stream/${encryptedStreamId}`);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => removeToast(toast.id), 10000);
    return () => clearTimeout(timer);
  }, [toast.id]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 25 }}
      transition={{ duration: 1 }}
      className="
        bg-[var(--bgTwo)]
        border border-[var(--borderTwo)]
        shadow-xl rounded-lg p-4 w-72
      "
    >
      <div
        onClick={() => handleClick(toast)}
        className="flex justify-between items-start gap-3"
      >
        <p className="text-[var(--textOne)] text-sm">{toast.message}</p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            removeToast(toast.id);
          }}
          className="text-[var(--textTwo)]"
        >
          <X size={16} />
        </button>
      </div>
    </motion.div>
  );
}

export function NotificationToasts({ toasts, removeToast }) {
  return (
    <div
      className="
        fixed bottom-6 right-6 
        flex flex-col gap-3 z-50
        sm:bottom-6 sm:right-6
        w-auto
      "
    >
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} removeToast={removeToast} />
        ))}
      </AnimatePresence>
    </div>
  );
}

export default function TestToasterDemo() {
  const { toasts, addToast, removeToast } = useToasts();

  const triggerTest = () => {
    addToast(dummyNotifications[0]);
  };

  return (
    <div className="p-4">
      <button
        onClick={triggerTest}
        className="px-4 py-2 bg-blue-600 text-white rounded-md"
      >
        Test Toast
      </button>

      <NotificationToasts toasts={toasts} removeToast={removeToast} />
    </div>
  );
}
