import { createContext, useContext, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useAlert } from "@/context/AlertContext";
import { handleApiMessage } from "@/lib/auth_ops";
import { postLiveMessage } from "@/lib/content_creator";

const LiveChatContext = createContext(null);

export function LiveChatProvider({ streamInfo, children }) {
  const { isAuthenticated } = useAuth();
  const { showAlert } = useAlert();

  // STATE
  const [message, setMessage] = useState("");
  const [reactions, setReactions] = useState([]);

  // REACTION PUSHER
  const pushReaction = (emoji) => {
    const id = Date.now() + Math.random();

    setReactions((prev) => [...prev, { emoji, id }]);

    setTimeout(() => {
      setReactions((prev) => prev.filter((r) => r.id !== id));
    }, 10000);
  };

  // COMMENT SUBMITTER
  const handleSubmitComment = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) return;

    const data = {
      streamId: streamInfo?.id,
      message,
    };

    try {
      const res = await postLiveMessage(data);

      if (res.success) {
        setMessage("");
      } else {
        handleApiMessage(res?.message, showAlert, "error");
      }
    } catch (err) {
      handleApiMessage("comment failed", showAlert, "error");
    }
  };

  return (
    <LiveChatContext.Provider
      value={{
        message,
        setMessage,

        reactions,
        pushReaction,

        handleSubmitComment,
      }}
    >
      {children}
    </LiveChatContext.Provider>
  );
}

export function useLiveChat() {
  return useContext(LiveChatContext);
}
