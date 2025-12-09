import { useUserNotificationChannel } from "@/hooks/useUserNotificationChannel";
import { useAuth } from "@/context/AuthContext";

export default function GlobalNotificationListener({ addToast }) {
  const { user } = useAuth();

  useUserNotificationChannel(user?.id, {
    onQuestReady: (data) => {
      if (data?.user_id === user?.id && data.message) {
        addToast({
          message: data?.message,
          type: data.type || "quest",
          data: data.data || {},
        });
      }
    },
    onStreamStarted: (data) => {
      if (data?.message) {
        addToast({
          message: data?.message,
          type: data.type || "stream",
          data: data.data || {},
        });
      }
    },

    onNotification: (data) => {
      addToast({
        message: data.message || "New notification",
        type: data.type || "system",
        data: data.data || {},
      });
    },
  });

  return null;
}
