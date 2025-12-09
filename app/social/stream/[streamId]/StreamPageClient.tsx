"use client";

import {
  LiveStreamCardWrapper,
  LiveStreamSkeleton,
} from "@/components/screens/social/components/LiveStreamFeed";

import { getStreamById } from "@/lib/content_creator";
import { useParams } from "next/navigation";
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useStreamEvents } from "@/hooks/useStreamEvents";
import { useTranslation } from "react-i18next";
import {
  emojisList,
  FloatingReactions,
  LiveChatBox,
  LiveChatBoxSkeleton,
} from "@/components/screens/social/components/LiveInteractions";

// import { PostMedia } from "@/components/screens/social/creator/PostComponents";
import { useLiveStreamChannel } from "@/hooks/useLiveStreamChannel";
import { FullCenterDimensionDiv } from "@/components/FullCenterDimensionDiv";
import { useAuth } from "@/context/AuthContext";
import { decodeUUID } from "@/lib/system";

const MAX_COMMENTS = 500;
const MAX_REACTIONS = 200;

function SkeletonLoadingComp() {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <FullCenterDimensionDiv style={{ width: "100%", height: "100%" }}>
        {(propsFromCenter) => (
          <div className="w-full max-w-10xl flex justify-center gap-4 sm:gap-6 mx-auto h-full overflow-hidden">
            <div className="flex-1 max-w-full h-full">
              <LiveStreamSkeleton
                contClass="
    h-64
    sm:h-72
    md:h-80
    lg:h-96
    xl:h-[42vh]
    2xl:h-[60vh]
    min-[1800px]:h-[70vh]
    min-[2300px]:h-[95vh]
  "
              />
            </div>

            <div className="hidden min-[900px]:flex w-[300px] lg:w-[350px] xl:w-[420px] 2xl:w-[500px] h-full">
              <LiveChatBoxSkeleton
                // contClass="h-64 min-h-[90vh] sm:h-77 md:h-87 lg:h-[35vh] xl:h-[47vh] 2xl:h-[77vh] "
                height={
                  propsFromCenter.height
                    ? `${propsFromCenter.height * 0.99}px`
                    : "100%"
                }
              />
            </div>
          </div>
        )}
      </FullCenterDimensionDiv>

      <div className="flex justify-center items-center mt-2 w-full">
        <div className="block min-[900px]:hidden flex-1 max-w-full">
          <LiveChatBoxSkeleton />
        </div>
      </div>
    </div>
  );
}

// useStreamData (fetch + start/stop events)
function useStreamData(decryptedStreamId, initialStream) {
  const [streamList, setStreamList] = React.useState([]);
  const [streamInfo, setStreamInfo] = React.useState(null);
  const [loading, setLoading] = React.useState(!initialStream);
  const didFetch = React.useRef(false);
  const { user } = useAuth();

  const host = React.useMemo(
    () =>
      typeof window !== "undefined" ? window.location.hostname : "localhost",
    []
  );

  const formatStreams = React.useCallback(
    (streams) =>
      streams.map((s) => {
        let embedUrl = s.embed_url.replace(/&parent=[^&]+/g, "");
        embedUrl += `&parent=${host}`;
        return {
          ...s,
          comments: [...(s.comments ?? [])],
          media: [
            {
              type: "live_stream",
              id: s.provider_id,
              embed_url: embedUrl,
              thumbnail: s.thumbnail_url,
            },
          ],
        };
      }),
    [host]
  );

  const fetchStreamDetails = React.useCallback(
    async (id) => {
      if (!id) return;
      setLoading(true);
      try {
        const storedAuthUser = JSON.parse(localStorage.getItem("user"));
        const authUserId = user?.id || storedAuthUser?.id || null;

        const res = await getStreamById(id, authUserId);
        if (res?.success && res?.data?.streams?.length) {
          const formatted = formatStreams(res.data.streams);
          setStreamList(formatted);
          setStreamInfo(formatted[0]);
        } else {
          setStreamList([]);
          setStreamInfo(null);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    },
    [formatStreams]
  );

  const handleStreamStarted = React.useCallback(
    async (payload) => {
      if (!payload?.user_id) return;
      const res = await getStreamById(decryptedStreamId);
      if (res?.success && res.data?.streams?.length) {
        const formatted = formatStreams(res.data.streams);
        setStreamInfo(formatted[0]);
        setStreamList(formatted);
      }
    },
    [formatStreams, decryptedStreamId]
  );

  React.useEffect(() => {
    if (didFetch.current) return;
    didFetch.current = true;
    if (!initialStream && decryptedStreamId)
      fetchStreamDetails(decryptedStreamId);
  }, [initialStream, decryptedStreamId, fetchStreamDetails]);

  useStreamEvents(
    React.useCallback(
      (event) => {
        if (event.type === "started") {
          const userId = event.payload?.user_id;
          if (userId && streamList?.length) {
            handleStreamStarted(event.payload);
          } else {
            fetchStreamDetails(decryptedStreamId);
          }
        }

        if (event.type === "stopped") {
          const stoppedUserId = String(event.payload?.user_id);
          setStreamInfo((prev) => {
            if (!prev) return prev;
            return String(prev.user_id) === stoppedUserId
              ? { ...prev, is_live: false }
              : prev;
          });
          setStreamList((prev) =>
            prev.filter((s) => s.user_id !== event.payload?.user_id)
          );
        }
      },
      [streamList, handleStreamStarted, fetchStreamDetails, decryptedStreamId]
    )
  );

  return {
    streamList,
    streamInfo,
    loading,
    fetchStreamDetails,
    handleStreamStarted,
  };
}

// useRealtimeComments (buffered)
function useRealtimeComments(
  channelId,
  {
    flushMs = 180,
    max = MAX_COMMENTS,
    initialComments = null, // <-- NEW
  } = {}
) {
  const [comments, setComments] = React.useState([]);
  const buffer = React.useRef([]);
  const hydrated = React.useRef(false); // <-- prevents double hydration

  // 1) INITIAL HYDRATION (once per stream)
  React.useEffect(() => {
    if (!initialComments || hydrated.current) return;

    hydrated.current = true;

    const initial = [...initialComments].reverse();

    setComments(initial.length > max ? initial.slice(-max) : initial);
  }, [initialComments, max]);

  // 2) REALTIME COMMENT HANDLER
  const handleComment = React.useCallback((data) => {
    buffer.current.push(data.comment);
  }, []);

  useLiveStreamChannel(channelId, { onComment: handleComment });

  // 3) FLUSH BUFFER → STATE
  React.useEffect(() => {
    const interval = setInterval(() => {
      if (buffer.current.length === 0) return;

      setComments((prev) => {
        const next = [...prev, ...buffer.current];
        buffer.current = [];
        return next.length > max ? next.slice(next.length - max) : next;
      });
    }, flushMs);

    return () => clearInterval(interval);
  }, [flushMs, max]);

  return comments;
}

// useRealtimeReactions (buffered + instant-first + TTL)
function useRealtimeReactions(
  channelId,
  { flushMs = 120, ttl = 3000, cleanupMs = 400, max = MAX_REACTIONS } = {}
) {
  const [reactions, setReactions] = React.useState([]);
  const buffer = React.useRef([]);

  const handleReaction = React.useCallback(
    (data) => {
      const emojiObj = emojisList.find(
        (e) => e.reaction_type === data?.reaction?.reaction_type
      );
      if (!emojiObj) return;

      const reaction = {
        ...data.reaction,
        emoji: emojiObj.emoji,
        _ts: Date.now(),
      };
      const wasEmpty = buffer.current.length === 0;
      buffer.current.push(reaction);

      if (wasEmpty) {
        setReactions((prev) => {
          const next = [...prev, reaction];
          return next.length > max ? next.slice(next.length - max) : next;
        });
        buffer.current = [];
      }
    },
    [max]
  );

  useLiveStreamChannel(channelId, { onReaction: handleReaction });

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (!buffer.current.length) return;
      setReactions((prev) => {
        const next = [...prev, ...buffer.current];
        buffer.current = [];
        return next.length > max ? next.slice(next.length - max) : next;
      });
    }, flushMs);
    return () => clearInterval(interval);
  }, [flushMs, max]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setReactions((prev) => {
        if (!prev.length) return prev;
        const next = prev.filter((r) => now - r._ts < ttl);
        return next.length === prev.length ? prev : next;
      });
    }, cleanupMs);
    return () => clearInterval(interval);
  }, [ttl, cleanupMs]);

  return reactions;
}

export function useRealtimePoll(initialPoll, channelId) {
  const [poll, setPoll] = useState(initialPoll);
  const { isAuthenticated } = useAuth();
  const hydrated = useRef(false);

  // INITIAL SETUP (ONLY once)
  useEffect(() => {
    if (!initialPoll || hydrated.current) return;
    hydrated.current = true;
    setPoll(initialPoll);
  }, [initialPoll]);

  // HANDLERS
  const handlePollCreated = useCallback((data) => {
    // backend sends data.poll
    setPoll({
      ...data.poll,
      total_votes: 0,
      already_voted: false,
      selected_option_id: null,
    });
  }, []);

  const handlePollVote = useCallback(async (data) => {
    setPoll((prev) => {
      if (!prev) return data.vote; // no vote existed before
      if (prev.id !== data.vote.id) return prev; // wrong vote

      return {
        ...prev,
        total_votes: data.vote.total_votes,
        options: prev.options.map((opt) => {
          const updated = data.vote.options.find((o) => o.id === opt.id);
          return updated ? updated : opt;
        }),
      };
    });
  }, []);

  // SUBSCRIBE REALTIME EVENTS
  useLiveStreamChannel(channelId, {
    onPollCreated: handlePollCreated,
    onPollVote: handlePollVote,
  });

  return { poll, setPoll };
}

function LiveStreamPreviewCard({ item, screenType = "large" }) {
  if (!item) return null;

  if (screenType === "small")
    return (
      <div className="relative border border-[var(--borderThree)] rounded-xl p-2 md:p-3 gradient-one">
        <StreamMedia media={item.media} />
      </div>
    );
  else
    return (
      <LiveStreamCardWrapper
        item={item}
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <StreamMedia media={item.media} />
      </LiveStreamCardWrapper>
    );
}

function SmallScreenStreamScreen({
  streamInfo,
  poll,
  setPoll,
  reactions,
  allComments,
}) {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [chatHeight, setChatHeight] = useState(340);
  const [vh, setVh] = useState(0);

  // REAL viewport height fix
  useEffect(() => {
    const updateVh = () => setVh(window.innerHeight);
    updateVh();
    window.addEventListener("resize", updateVh);
    window.addEventListener("orientationchange", updateVh);
    return () => {
      window.removeEventListener("resize", updateVh);
      window.removeEventListener("orientationchange", updateVh);
    };
  }, []);

  // CHAT HEIGHT CALC
  useEffect(() => {
    const computeHeights = () => {
      if (!containerRef.current || !videoRef.current) return;

      const containerH = containerRef.current.clientHeight;
      const containerW = containerRef.current.clientWidth;
      const videoH = videoRef.current.clientHeight;
      const gap = containerW > 500 ? 12 : 20;
      const remaining = containerH - videoH - gap;

      setChatHeight(Math.max(remaining, 340));
    };

    computeHeights();
    window.addEventListener("resize", computeHeights);
    return () => window.removeEventListener("resize", computeHeights);
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex min-[900px]:hidden flex-col h-full w-full gap-3"
      style={{ minHeight: vh ? vh * 0.9 : "90vh" }}
    >
      {/* VIDEO */}
      <div ref={videoRef} className="w-full max-w-full">
        <div className="relative border border-[var(--borderThree)] rounded-xl p-2 md:p-3 gradient-one">
          <StreamMedia media={streamInfo.media} />
        </div>
        <div className="relative">
          <FloatingReactions reactions={reactions} />
        </div>
      </div>
      {/* CHAT */}
      <div className="w-full">
        <LiveChatBox
          contClass="items-center"
          reactions={[]}
          poll={poll}
          setPoll={setPoll}
          allComments={allComments}
          streamInfo={streamInfo}
          showCommentDates={false}
          parentContStyle={{ height: chatHeight }}
        />
      </div>
      {/* relative border border-[var(--borderThree)] rounded-xl p-4 gradient-one */}
      <LiveStreamCardWrapper
        item={streamInfo}
        style={{ padding: 4, border: "none", background: "transparent" }}
      />
    </div>
  );
}

export function StreamMedia({ media = [], style = {} }) {
  const LiveStreamCard = memo(({ obj, index }: any) => {
    const autoplayUrl = `${obj.embed_url}&autoplay=true&muted=true&controls=true`;

    return (
      <iframe
        id={`player-${index}`}
        src={autoplayUrl}
        allow="autoplay; encrypted-media; fullscreen"
        allowFullScreen
        loading="lazy"
        className="
          w-full
          aspect-video  
          // h-[10%]
          // h-75              /* maintains 16:9 */
    //       max-h-[75vh]                /* base limit */
    //       sm:max-h-[75vh]
    //       md:max-h-[80vh]
    //       lg:max-h-[82vh]
    //       xl:max-h-[85vh]
    //       2xl:max-h-[88vh]            /* perfect on 2579px */
    //       3xl:max-h-[90vh]            /* perfect on 2579px */
    // min-[2300px]:h-[95vh]
          rounded-xl
        "
        style={style}
      />
    );
  });

  LiveStreamCard.displayName = "LiveStreamCard";

  const memoizedMedia = useMemo(
    () =>
      media.map((obj, i) => (
        <LiveStreamCard key={obj.id} obj={obj} index={i} />
      )),
    [media]
  );

  if (!media?.length) return null;
  if (media.length === 1) return memoizedMedia[0];
  return memoizedMedia;
}

export default function StreamPageClient({ initialStream = null }) {
  const { streamId: encryptedId } = useParams();
  const decryptedStreamId = decodeUUID(encryptedId);
  const { t: tScreen } = useTranslation("screen");
  const { user } = useAuth();

  // hook-based logic
  const { streamList, streamInfo, loading } = useStreamData(
    decryptedStreamId,
    initialStream
  );
  const allComments = useRealtimeComments(streamInfo?.id, {
    initialComments: streamInfo?.comments,
  });

  const reactions = useRealtimeReactions(streamInfo?.id);
  const { poll, setPoll } = useRealtimePoll(streamInfo?.poll, streamInfo?.id);

  // Avoid hydration mismatch
  const [isMounted, setIsMounted] = React.useState(false);
  React.useEffect(() => setIsMounted(true), []);

  // render guards unchanged
  if (!isMounted || loading) {
    return <SkeletonLoadingComp />;
  }

  if (!loading && !streamList.length) {
    return (
      <div className="text-center py-10 text-[var(--textTwo)]">
        {tScreen("contentCreator.stream.noStreamsLive")}
      </div>
    );
  }

  return (
    <div key={`${decryptedStreamId}-${user?.id || "nouser"}`}>
      <FullCenterDimensionDiv style={{ width: "100%", height: "100%" }}>
        {(propsFromCenter) => (
          <div className="w-full max-w-10xl flex justify-center gap-4 sm:gap-6 mx-auto h-full min-[900px]:min-h-[88dvh]">
            <div className="hidden min-[900px]:block flex-1 max-w-full h-full">
              <LiveStreamPreviewCard item={streamInfo} {...propsFromCenter} />
              <div className="block min-[900px]:hidden relative">
                <FloatingReactions reactions={reactions} />
              </div>
            </div>

            <div className="hidden min-[900px]:flex w-[300px] lg:w-[350px] xl:w-[400px] 2xl:w-[420px]     min-[1800px]:h-[500px] h-full">
              <LiveChatBox
                poll={poll}
                setPoll={setPoll}
                reactions={reactions}
                allComments={allComments}
                streamInfo={streamInfo}
                parentContStyle={{
                  maxHeight: "95dvh",
                  minHeight: "88dvh",
                  height: propsFromCenter.height * 0.99,
                }}
                // height={propsFromCenter.height * 0.99}
              />
            </div>
          </div>
        )}
      </FullCenterDimensionDiv>
      <SmallScreenStreamScreen
        poll={poll}
        setPoll={setPoll}
        streamInfo={streamInfo}
        reactions={reactions}
        allComments={allComments}
      />
    </div>
  );
}
