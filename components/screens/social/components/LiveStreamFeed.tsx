import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { BadgeIcon, Play } from "lucide-react";
import Link from "next/link";

import { useTimeAgo } from "@/hooks/useTimeAgo";
import { getStreamList } from "@/lib/content_creator";
import { useStreamEvents } from "@/hooks/useStreamEvents";
import { useAuth } from "@/context/AuthContext";
import Avatar from "@/components/auth/Avatar";
import { useLanguage } from "@/context/LanguageContext";
import { PostMedia, StreamMenu } from "../creator/PostComponents";

import { encodeUUID } from "@/lib/system";
// import { CardChip } from "@/components/common/CardComp";

export function LiveStreamSkeleton({
  contClass = "h-64 sm:h-72 md:h-80 lg:h-96",
}) {
  return (
    <div className="border border-[var(--borderThree)] rounded-xl p-4 gradient-one animate-pulse">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <div className="h-5 w-10 bg-[var(--borderThree)] rounded-full" />
          <div className="h-4 w-24 bg-[var(--borderThree)] rounded-md" />
        </div>

        <div className="h-4 w-4 rounded-full bg-[var(--borderThree)] rounded-md" />
      </div>

      {/* Twitch Player Placeholder */}
      <div
        className={`w-full bg-[var(--borderThree)] rounded-xl  ${contClass}`}
      />

      {/* Footer */}
      <div className="text-sm mt-3 flex gap-4 flex justify-between">
        <div className="h-4 w-14 bg-[var(--borderThree)] rounded-md" />
        <div className="h-6 w-20 rounded-full bg-[var(--borderThree)] rounded-md" />
      </div>
    </div>
  );
}

export function LiveStreamCardWrapper({ item, children, style = {} }: any) {
  const timeAgo = useTimeAgo(item?.started_at);
  const { lang } = useLanguage();

  // Build URLs (SSR safe)
  const encryptedUserId = encodeUUID(item?.user?.id);
  const profileUrl = `/social/profile/${encryptedUserId}?lang=${lang}`;

  return (
    <div
      className="relative border border-[var(--borderThree)] rounded-xl p-4 gradient-one"
      style={style}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <Link href={profileUrl} className="cursor-pointer">
            <Avatar user={{ avatar_url: item?.user?.avatar_url }} size={45} />
          </Link>

          <div className="text-sm flex flex-col font-medium text-[var(--textOne)]">
            <div className="flex gap-2">
              <Link href={profileUrl} className="cursor-pointer">
                <h1 className="text-lg lg:text-lg font-semibold text-[var(--textOne)]">
                  {item?.user.name}
                </h1>
              </Link>

              {Boolean(item?.is_verified) && (
                <BadgeIcon className="text-[var(--primary)]" size={20} />
              )}

              {/* <CardChip
                label={item?.user?.level}
                style={{
                  background: "var(--textFive)",
                  fontWeight: 600,
                  padding: "1px 8px",
                  fontSize: 14,
                  height: "fit-content",
                }}
              /> */}
            </div>

            <div className="flex gap-2">
              {item?.user.username && (
                <p className="text-[14px] text-[var(--textTwo)] flex items-center">
                  {item?.user?.username}
                  <span className="w-[3px] h-[3px] ml-2 bg-[var(--textTwo)]"></span>
                </p>
              )}

              {timeAgo && (
                <p className="text-[14px] text-[var(--textTwo)]">{timeAgo}</p>
              )}

              <p className="text-[14px] font-semibold text-[var(--primary)]">
                {item?.user?.achievement}
              </p>
            </div>
          </div>
        </div>

        <StreamMenu obj={item} />
      </div>

      {children && children}
    </div>
  );
}

export function LiveStreamCard({ item }) {
  const { lang } = useLanguage();

  // Build URLs (SSR safe)
  const encryptedId = encodeUUID(item?.user_id);
  const streamUrl = `/social/stream/${encryptedId}?lang=${lang}`;

  return (
    <LiveStreamCardWrapper item={item}>
      {/* Thumbnail + Play Overlay */}
      <div className="relative group">
        <PostMedia
          media={item?.media}
          height="h-64 sm:h-72 md:h-80 lg:h-96"
          aspect="aspect-[16/9]"
        />

        {/* PLAY BUTTON */}
        <Link
          href={streamUrl}
          className="
      absolute inset-0 
      bg-black/30 
      flex items-center justify-center 
      rounded-xl
    "
        >
          <div
            className="
        bg-[var(--borderTwo)] backdrop-blur-xl 
        p-4 rounded-full 
        flex items-center justify-center
        border border-[var(--textTwo)]
        hover:scale-110 transition-transform
      "
          >
            <Play className="w-10 h-10 text-[var(--textOne)]" />
          </div>
        </Link>
        {/* LIVE BADGE - bottom right */}
        <div
          className="
    absolute bottom-3 right-3 
    flex items-center gap-2 
    bg-[#e1002de6] text-white 
    px-3 py-1.5 rounded-md 
    text-sm font-semibold 
    shadow-lg
  "
        >
          {/* Pulsing Dot */}
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
          </span>
          LIVE
        </div>
      </div>
    </LiveStreamCardWrapper>
  );
}

export function StreamFeedComp({ streamList = [], loading = false }) {
  const { t: tScreen } = useTranslation("screen");

  // 🔥 Display skeletons while loading
  if (loading) {
    return (
      <div className="flex-1 max-w-full sm:max-w-[650px] flex flex-col gap-5 mx-auto mt-4">
        <LiveStreamSkeleton />
        <LiveStreamSkeleton />
      </div>
    );
  }

  if (!loading && !streamList.length)
    return (
      <div className="text-center py-10 text-[var(--textTwo)]">
        {tScreen("contentCreator.stream.noStreamsLive")}
      </div>
    );

  return (
    <div className="flex-1 max-w-full sm:max-w-[650px] flex flex-col gap-5 mx-auto">
      {streamList.map((item) => (
        <LiveStreamCard key={item.id} item={item} />
      ))}
    </div>
  );
}

export default function LiveStreamFeed({ activeTab }) {
  const [streamList, setStreamList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, userLoading } = useAuth();

  const didFetchTab = useRef(false);
  const prevLive = useRef(user?.is_live);

  const host = useMemo(
    () =>
      typeof window !== "undefined" ? window.location.hostname : "localhost",
    []
  );

  // FORMAT STREAM LIST MEMOIZED
  const formatStreamData = useCallback(
    (streams) =>
      streams.map((s) => {
        let embedUrl = s.embed_url.replace(/&parent=[^&]+/g, "");
        embedUrl += `&parent=${host}`;

        return {
          ...s,
          comments: [...(s.comments ?? [])],
          media: [
            {
              type: "image",
              url: s.thumbnail_url,
              // type: "live_stream",
              id: s.provider_id,
              embed_url: embedUrl,
              thumbnail: s.thumbnail_url,
            },
          ],
        };
      }),
    [host]
  );

  // FETCH STREAM LIST MEMOIZED
  const fetchStreamList = useCallback(async () => {
    setLoading(true);
    const storedAuthUser = JSON.parse(localStorage.getItem("user"));
    const authUserId = user?.id || storedAuthUser?.id || null;

    const res = await getStreamList({ auth_user_id: authUserId });
    setLoading(false);

    if (res?.success && res?.data?.streams) {
      const formatted = formatStreamData(res.data.streams);
      setStreamList(formatted);
    }
  }, [formatStreamData]);

  // APPEND STREAM WHEN “started”

  const handleStreamStarted = useCallback(
    async (data) => {
      if (!data?.user_id) return;
      const storedAuthUser = JSON.parse(localStorage.getItem("user"));
      const authUserId = user?.id || storedAuthUser?.id || null;
      const res = await getStreamList({
        user_id: data.user_id,
        auth_user_id: authUserId,
      });
      const rawStream = res?.data?.streams?.[0];
      // If no stream returned → fetch full list
      if (!rawStream) {
        fetchStreamList();
        return;
      }

      // ---- FORMAT DIRECTLY HERE ----
      const [formatted] = formatStreamData([rawStream]);

      // --------------------------------

      setStreamList((prev) => {
        const exists = prev.some((x) => x.user_id === formatted.user_id);
        if (exists) return prev;

        return [formatted, ...prev];
      });
    },
    [fetchStreamList, formatStreamData]
  );

  useEffect(() => {
    const isLiveTab = activeTab === "live_stream";

    // ---- CASE 1: TAB CHANGE ----
    if (isLiveTab && !didFetchTab.current) {
      didFetchTab.current = true;
      prevLive.current = user?.is_live; // mark current live state
      fetchStreamList();
      return;
    }

    // reset when leaving tab
    if (!isLiveTab) {
      didFetchTab.current = false;
      prevLive.current = user?.is_live;
      return;
    }

    // ---- CASE 2: USER LIVE STATE TOGGLED ----
    const liveChanged = prevLive.current !== user?.is_live;
    if (isLiveTab && liveChanged) {
      prevLive.current = user?.is_live;
      fetchStreamList();
    }
  }, [activeTab, user?.is_live]);

  // REAL-TIME EVENT LISTENER
  useStreamEvents(
    useCallback((event) => {
      if (event.type === "started") {
        console.log("🔥 LIVE STARTED", event.payload);
        handleStreamStarted(event.payload);
      }
      if (event.type === "stopped") {
        console.log("🛑 LIVE STOPPED", event.payload);
        setStreamList((prev) =>
          prev.filter(
            (streamObj) => streamObj.user_id !== event?.payload?.user_id
          )
        );
      }
    }, [])
  );

  return (
    <StreamFeedComp streamList={streamList} loading={loading || userLoading} />
  );
}
