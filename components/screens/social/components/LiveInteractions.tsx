import Avatar from "@/components/auth/Avatar";
import InputComp from "@/components/Form/InputComp";
import { AppButton } from "@/components/TopComp";
import { useAlert } from "@/context/AlertContext";
import { useAuth } from "@/context/AuthContext";

import { TimeAgoText } from "@/hooks/useTimeAgo";
import { handleApiMessage } from "@/lib/auth_ops";
import {
  postLiveMessage,
  postLiveReaction,
  submitPollResponse,
} from "@/lib/content_creator";

import { ArrowDown, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

export const emojisList = [
  { emoji: "👍", reaction_type: "like" },
  { emoji: "❤️", reaction_type: "love" },
  { emoji: "😄", reaction_type: "laugh" },
  { emoji: "😡", reaction_type: "angry" },
  { emoji: "😢", reaction_type: "sad" },
];

export const VoteRes = {
  success: true,
  message: "Success",
  data: {
    vote: {
      poll_option_id: "33db3628-9ac1-42b5-90ec-70569ad3a6f4",
      user_id: "e917de31-b845-4f8a-8dd8-0b1b9b45635a",
      id: "e90eae97-8a96-48d2-85cc-04c7a8e120b2",
      updated_at: "2025-11-27T12:17:02.000000Z",
      created_at: "2025-11-27T12:17:02.000000Z",
    },
  },
};

export function LiveChatBoxSkeleton({ contClass = "", height = "" }) {
  return (
    <div
      className={`flex flex-col w-full gradient-one border border-[var(--borderThree)] rounded-xl overflow-hidden relative ${contClass}`}
      style={{ height }}
    >
      {/* HEADER */}
      <div className="px-4 py-2 border-b border-[var(--borderTwo)] font-semibold text-lg">
        <div className="w-20 h-4 bg-[var(--borderTwo)] rounded" />
      </div>

      {/* FEED */}
      <div className="flex-1 overflow-y-auto   scrollbar-hide px-4 py-3 space-y-1 sm:space-y-4">
        <div className="space-y-4">
          {[...Array(8)].map((_, i) => (
            <div
              key={`chat-comment-skeleton-${i}`}
              className="flex gap-3 animate-pulse"
            >
              {/* Avatar */}
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[var(--borderTwo)] rounded-full" />

              <div className="flex flex-col gap-2 flex-1">
                {/* Username + Time */}
                <div className="flex gap-3 items-center">
                  <div className="w-24 h-3 bg-[var(--borderTwo)] rounded" />
                  <div className="w-12 h-3 bg-[var(--borderTwo)] rounded" />
                </div>

                {/* Comment line */}
                <div className="w-full h-3 bg-[var(--borderTwo)] rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
function PollCollapsed({ poll, streamInfo, onExpand }) {
  const { t: tScreen } = useTranslation("screen");

  return (
    <div
      className="
        flex items-center gap-2 px-3 py-2
        border border-[var(--borderTwo)]
        rounded-lg bg-[var(--bgThree)]
        cursor-pointer hover:bg-[var(--bgTwo)] transition
      "
      onClick={onExpand}
    >
      <div>
        <Avatar size={28} user={streamInfo?.user} />
      </div>
      <div className="flex flex-col">
        <div className="text-xs font-medium text-[var(--textOne)]">
          {tScreen("contentCreator.stream.poll")} • {poll?.total_votes}{" "}
          {tScreen("contentCreator.stream.votes")}
        </div>
        <div className="text-sm font-semibold line-clamp-1">
          {poll?.question}
        </div>
      </div>
    </div>
  );
}

function PollCard({ poll, setPoll, onClose, streamInfo }) {
  const { showAlert } = useAlert();
  const { t: tScreen } = useTranslation("screen");
  const { isAuthenticated, setLoginOpen } = useAuth();

  const handleSubmitPoll = async ({ option_id, poll_id }) => {
    if (!isAuthenticated) {
      setLoginOpen(true);
      return;
    }

    if (poll?.already_voted) {
      return;
    } // block further voting

    try {
      const res = await submitPollResponse({
        streamId: streamInfo?.id,
        option_id,
        poll_id,
      });

      if (res?.success) {
        setPoll((prev) => {
          return {
            ...prev,
            already_voted: true,
            selected_option_id: option_id,
          };
        });
        onClose();
      } else {
        handleApiMessage(res?.message, showAlert, "error");
      }
    } catch (err) {
      handleApiMessage("Stream Poll failed", showAlert, "error");
    }
  };

  return (
    <div className="p-2 rounded-xl border border-[var(--borderTwo)] bg-[var(--bgThree)]/45 backdrop-blur-md">
      {/* HEADER (compact) */}
      <div className="flex justify-between items-center mb-1">
        <div className="flex items-center gap-2 text-[11px] text-[var(--textTwo)]">
          <div>
            <Avatar size={26} user={streamInfo?.user} />
          </div>
          <div className="flex flex-col">
            <span className="font-medium">{streamInfo?.user?.name}</span>
            <div className="flex items-center gap-2 ">
              <TimeAgoText
                contClass="text-[var(--textTwo)]"
                date={poll?.created_at}
              />
              <span className="w-[2px] h-[2px] bg-[var(--textOne)] rounded-full" />
              <span>
                {poll?.total_votes} {tScreen("contentCreator.stream.votes")}
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="cursor-pointer text-[var(--textTwo)] hover:text-[var(--textOne)] transition"
        >
          <X size={18} />
        </button>
      </div>

      {/* QUESTION */}
      <div className="font-semibold text-[14px] text-[var(--textOne)] mb-1 line-clamp-2">
        {poll?.question}
      </div>

      {/* OPTIONS */}
      <div className="flex flex-col gap-2">
        {poll?.options.map((opt) => {
          const disabled = poll?.already_voted;
          const selected = opt?.id === poll?.selected_option_id;
          const pct = opt?.percentage;

          return (
            <button
              key={opt?.id}
              disabled={disabled}
              onClick={() =>
                handleSubmitPoll({
                  option_id: opt?.id,
                  poll_id: poll?.poll_id || poll?.id,
                })
              }
              className={`
                relative w-full px-2 py-1 rounded-lg border text-left
                overflow-hidden transition-all
                border-[var(--borderTwo)]
                ${
                  disabled
                    ? "cursor-default"
                    : "hover:border-[var(--primary)] hover:bg-[var(--bgThree)] cursor-pointer"
                }
              `}
            >
              {/* FILLED BG AS PROGRESS BAR (only after vote) */}
              {disabled && (
                <div
                  className={`
                    absolute inset-y-0 left-0 rounded-lg
                    ${selected ? "bg-[var(--bgOne)]" : "bg-[var(--bgTwo)]"}
                    transition-all
                  `}
                  style={{ width: `${pct}%` }}
                />
              )}

              {/* Content */}
              <div className="relative z-10 flex items-center justify-between">
                {/* TEXT */}
                <span
                  className={`text-[13px] font-medium text-[var(--textOne)] `}
                >
                  {opt?.option_text}
                </span>
                {/* Right side */}
                {disabled ? (
                  <span className="text-[12px] text-[var(--textTwo)]">
                    {pct}%
                  </span>
                ) : (
                  <div
                    className={`
                      w-4 h-4 rounded-full border flex items-center justify-center
                      ${
                        selected
                          ? "border-[var(--primary)]"
                          : "border-[var(--textThree)] group-hover:border-[var(--primary)]"
                      }
                    `}
                  >
                    {selected && (
                      <div className="w-2 h-2 bg-[var(--primary)] rounded-full" />
                    )}
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function ExpandableText({ text = "", lineClamp = 2 }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="
        text-[12px] 
        sm:text-sm 
        lg:text-base      /* bigger text for large screens */
        2xl:text-lg       /* super large screens */
        opacity-90

        leading-[14px]    /* mobile */
        sm:leading-[18px] /* sm screens */
        lg:leading-[20px] /* large screens */
        2xl:leading-[22px]/* ultrawide monitors */
      "
    >
      <div className={expanded ? "" : `line-clamp-${lineClamp}`}>{text}</div>

      {text?.length > 50 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="
            cursor-pointer 
            text-[var(--textTwo)]  
            text-[10px] sm:text-xs lg:text-sm 
            font-medium mt-1
          "
        >
          {expanded ? "See less" : "See more"}
        </button>
      )}
    </div>
  );
}

export function LiveChatBox({
  streamInfo,
  allComments = [],
  reactions = [],
  poll = null,
  setPoll,
  showCommentDates = true,
  contClass = "",
  parentContClass = "",
  parentContStyle = {},
}) {
  const { user } = useAuth();
  const { t: tScreen } = useTranslation("screen");

  const scrollRef = useRef(null);
  const [showScrollDown, setShowScrollDown] = useState(false);
  const [showChatBox, setShowChatBox] = useState(true);

  const { isAuthenticated, setLoginOpen } = useAuth();
  const { showAlert } = useAlert();

  // STATE
  const [message, setMessage] = useState("");
  const [pollExpanded, setPollExpanded] = useState(false);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  // SUBMITTER
  const handleSubmitComment = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      setLoginOpen(true);
      return;
    }

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
  const handleSubmitReaction = async (emojiObj) => {
    if (!isAuthenticated) {
      setLoginOpen(true);
      return;
    }

    const data = {
      streamId: streamInfo?.id,
      reaction_type: emojiObj?.reaction_type,
    };

    try {
      const res = await postLiveReaction(data);
      if (res?.success) {
        setMessage("");
      } else {
        handleApiMessage(res?.message, showAlert, "error");
      }
    } catch (err) {
      handleApiMessage("comment failed", showAlert, "error");
    }
  };

  useEffect(() => {
    if (!scrollRef.current) return;

    requestAnimationFrame(() => {
      setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      }, 0);
    });
  }, [allComments]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 20;
      setShowScrollDown(!atBottom);
    };

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  if (showChatBox)
    return (
      <div
        className={`flex flex-col w-full gradient-one border border-[var(--borderThree)] rounded-xl overflow-hidden relative ${parentContClass}`}
        style={{ ...parentContStyle }}
      >
        {/* HEADER */}
        <div className="px-2 py-2 border-b border-[var(--borderTwo)] flex items-center justify-between">
          <div className="font-semibold text-lg">
            {tScreen("contentCreator.stream.liveChat")}
          </div>
          <button
            onClick={() => setShowChatBox(false)}
            className="cursor-pointer hover:bg-[var(--bgTwo)] hover:border border-[var(--borderTwo)] rounded-full text-xl hover:scale-110 transition w-10 h-10 flex items-center justify-center"
          >
            <X className="w-5 h-5 cursor-pointer" />
          </button>
        </div>

        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto   scrollbar-hide px-2 md:px-4 pt-3 pb-1 space-y-1 sm:space-y-4"
        >
          {/* POLL inside feed (sticky always) */}
          <div
            className={`
    sticky top-0 z-20 bg-[var(--bgThree)]/45 backdrop-blur-md 
    transition-all duration-300 ease-in-out
    ${pollExpanded ? "opacity-100 scale-[1]" : "opacity-100 scale-[0.99]"}
  `}
          >
            {pollExpanded ? (
              <PollCard
                streamInfo={streamInfo}
                poll={poll}
                onClose={() => setPollExpanded(false)}
                setPoll={setPoll}
              />
            ) : (
              poll && (
                <PollCollapsed
                  poll={poll}
                  streamInfo={streamInfo}
                  onExpand={() => setPollExpanded(true)}
                />
              )
            )}
          </div>

          {allComments.map((c) => {
            return (
              <div key={c.id} className={`flex gap-2 md:gap-3 ${contClass}`}>
                <div>
                  <Avatar size={35} user={c.user} />
                </div>
                <div className="flex flex-col">
                  <div
                    className="
    text-[12px]
    md:text-[13px]
    lg:text-base
    xl:text-lg
    2xl:text-xl
    font-medium
    min-w-[70px]
    max-w-[80px]
    line-clamp-1
  "
                  >
                    {c?.user?.name || "User"}
                  </div>
                  {showCommentDates && (
                    <TimeAgoText
                      date={c.created_at}
                      contClass="opacity-50 text-[12px] md:text-[13px] g:text-base"
                    />
                  )}
                </div>
                {/* <div className="text-[10px] sm:text-sm opacity-90 h-[35px] leading-[14px] sm:leading-[18px] line-clamp-2">
                {c?.comment}
              </div> */}
                <ExpandableText text={c?.comment} lineClamp={2} />
              </div>
            );
          })}
          {/* Scroll Down Button */}
          {showScrollDown && (
            <button
              onClick={scrollToBottom}
              className="
      cursor-pointer 
      absolute bottom-16 left-1/2 -translate-x-1/2
      shadow-lg backdrop-blur-md 
      bg-[var(--bgTwo)] border border-[var(--borderTwo)]
      rounded-full text-xl 
      hover:scale-110 transition
      w-8 h-8 flex items-center justify-center"
            >
              <ArrowDown className="text-sm" />
            </button>
          )}
        </div>

        {/* Floating reactions (context-based) */}
        <FloatingReactions reactions={reactions} />

        {/* INPUT BOX (context) */}
        <div className="flex gap-4 px-4 py-3">
          <div>
            <Avatar
              size={40}
              user={user}
              contClass="border-1 border-[var(--primary)]"
            />
          </div>
          <InputComp
            name="comment"
            placeholder={tScreen("contentCreator.post.dropComment")}
            type="text"
            radius="50px"
            variant="secondaryTwo"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          {message ? (
            <button
              onClick={handleSubmitComment}
              className="cursor-pointer w-fit text-[var(--primary)] flex items-center justify-center transition-all hover:scale-[1.10] hover:opacity-95 duration-300 shadow-md"
            >
              <Send className="w-6 h-6" />
            </button>
          ) : (
            <div className="w-12 relative">
              <ReactionTray handleSubmitReaction={handleSubmitReaction} />
            </div>
          )}
        </div>
      </div>
    );
  else
    return (
      <div className="w-full">
        <AppButton
          type="secondaryTwo"
          label={tScreen("contentCreator.stream.showLiveChats")}
          contClass="w-full font-semibold text-lg"
          style={{ fontSize: 16, fontWeight: "medium" }}
          onClick={() => setShowChatBox(true)}
        />
      </div>
    );
}

export function FloatingReactions({ reactions }) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {reactions.map((emojiReaction) => (
        <span
          key={emojiReaction?.id}
          style={{ left: `${15 + Math.random() * 20}px` }}
          className="absolute bottom-20 text-3xl animate-floatReaction select-none"
        >
          {emojiReaction?.emoji}
        </span>
      ))}
    </div>
  );
}

export function ReactionTray({ handleSubmitReaction }) {
  const [open, setOpen] = useState(false);

  const trayRef = useRef(null);

  /** ➤ Close on outside click */ useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e) => {
      if (trayRef.current && !trayRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div
      ref={trayRef}
      className="absolute bottom-0 right-0 flex flex-col items-center justify-center gap-2 pointer-events-auto"
    >
      {open &&
        emojisList.map((emojiObj) => (
          <button
            key={emojiObj?.reaction_type}
            onClick={() => handleSubmitReaction(emojiObj)}
            className="w-10 h-10 rounded-full bg-[var(--bgTwo)] border border-[var(--borderTwo)] flex items-center justify-center"
          >
            <span className="w-5 h-5 cursor-pointer text-md sm:text-xl">
              {emojiObj?.emoji}
            </span>
          </button>
        ))}

      <button
        onClick={() => setOpen((prev) => !prev)}
        className="bg-[var(--bgTwo)] border border-[var(--borderTwo)] rounded-full text-xl hover:scale-110 transition w-10 h-10 flex items-center justify-center"
      >
        {open ? (
          <X className="w-5 h-5 cursor-pointer" />
        ) : (
          <span className="w-5 h-5 cursor-pointer text-base sm:text-lg">
            ❤️
          </span>
        )}
      </button>
    </div>
  );
}
