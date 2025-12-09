import { TimeAgoText } from "@/hooks/useTimeAgo";
import { AnimatePresence, motion } from "framer-motion";
import { Bell } from "lucide-react";
import { useRef, useState } from "react";

function mysqlTimeAgo(minutesAgo) {
  const d = new Date(Date.now() - minutesAgo * 60 * 1000);
  return d.toISOString().slice(0, 19).replace("T", " ");
}

export const dummyNotifications = [
  {
    message: "You’ve completed the quest: First Stream!",
    type: "quest",
    data: { quest_id: "enc_qid_123", reward: 50 },
    created_at: mysqlTimeAgo(2), // 2 min ago
  },
  {
    message: "New quest available: Reach 5 Followers",
    type: "quest",
    data: { quest_id: "enc_qid_789", followers_required: 5 },
    created_at: mysqlTimeAgo(10), // 10 min ago
  },
  {
    message: "You unlocked a new badge!",
    type: "system",
    data: { badge: "Early Streamer" },
    created_at: mysqlTimeAgo(30), // 30 min ago
  },
  {
    message: "Your friend Alex just went live!",
    type: "stream",
    data: { stream_id: "enc_sid_556" },
    created_at: mysqlTimeAgo(45), // 45 min ago
  },
  {
    message: "New follower joined your profile.",
    type: "social",
    data: { user_id: "enc_uid_912" },
    created_at: mysqlTimeAgo(60), // 1 hour ago
  },

  // EXTRA
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

export function NotificationBell() {
  const [open, setOpen] = useState(false);

  const hasUnread = true; // replace later

  return (
    <div className="relative">
      {/* Bell Icon */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="cursor-pointer flex items-center gap-2 px-3 py-3 border-2 rounded-[100px] border-[var(--borderOne)] bg-[var(--bgOne)] text-[var(--textOne)] hover:bg-[var(--bgTwo)] hover:border-[var(--borderTwo)] transition-colors"
      >
        {/* Bell wrapper so dot positions correctly */}
        <div className="relative">
          <Bell size={20} className="text-[var(--textOne)]" />

          {/* 🔴 Small Red Dot */}
          {hasUnread && (
            <span className="absolute -top-[6px] right-[0px] h-2 w-2 rounded-full bg-red-500"></span>
          )}
        </div>
      </button>

      {/* Drawer */}
      <NotificationDrawer
        open={open}
        onClose={() => setOpen(false)}
        notifications={dummyNotifications}
      />
    </div>
  );
}

export default function NotificationDrawer({ open, onClose, notifications }) {
  const drawerRef = useRef(null);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={drawerRef}
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden  fixed top-18 right-4 w-72 bg-[var(--bgThree)] border border-[var(--borderTwo)]
             rounded-xl shadow-xl z-50"
        >
          <div className="p-4 flex items-center justify-between mb-3">
            <h3 className="text-[var(--textOne)] font-semibold">
              Notifications
            </h3>
            <button
              onClick={onClose}
              className="cursor-pointer text-[var(--textTwo)] hover:text-[var(--textOne)]"
            >
              ✕
            </button>
          </div>

          {/* Scrollable list */}
          <div className="h-80 overflow-y-auto space-y-2  scrollbar-hide">
            {notifications.length === 0 && (
              <p className="text-[var(--textTwo)] text-sm text-center">
                No notifications
              </p>
            )}

            {notifications.map((n, i) => (
              <div
                key={i}
                className="px-3 py-2 cursor-pointer hover:bg-[var(--borderTwo)] transition"
              >
                <p className="text-[var(--textOne)] text-sm font-medium">
                  {n.message}
                </p>
                <TimeAgoText date={n?.created_at} />
                {/* <p className="text-[var(--textTwo)] text-xs mt-1 capitalize">
                  {n.type}
                </p> */}
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
