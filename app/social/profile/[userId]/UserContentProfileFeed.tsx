"use client";
import ContentCreatorTopComp from "@/components/screens/social/components/ContentCreatorTopComp";
import {
  ProfileCard,
  ProfileTabFeed,
} from "@/components/screens/social/creator/ContentProfileFeed";
import { useAuth } from "@/context/AuthContext";

//
import { fetchUserProfile } from "@/lib/content_creator";
import { decodeUUID } from "@/lib/system";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function UserContentProfileFeed({ initialUser }) {
  const { userId: encryptedUserId } = useParams();
  const decryptedUserId = decodeUUID(encryptedUserId);

  const { isAuthenticated } = useAuth();
  const [refreshPosts, setRefreshPosts] = useState(false);
  const [userInfo, setUserInfo] = useState(initialUser);

  const didFetch = useRef(false);

  async function getUserProfile(decryptedUserId) {
    try {
      const res = await fetchUserProfile(decryptedUserId);
      if (res?.data?.user) {
        setUserInfo(res.data);
      } else {
        setUserInfo(null);
      }
    } catch (err) {
      console.error("fetch profile failed", err);
    }
  }

  useEffect(() => {
    if (didFetch.current) return; // 🔥 stop duplicates
    if (!decryptedUserId) return; // no id
    if (initialUser) return; // SSR already provided

    didFetch.current = true; // lock
    getUserProfile(decryptedUserId);
  }, [decryptedUserId]);

  return (
    <div>
      <ContentCreatorTopComp handleRefresh={() => setRefreshPosts(true)} />
      <div
        className={`gradient-one border border-[var(--borderThree)] p-4 w-full overflow-hidden rounded-xl flex flex-col gap-3 ${
          isAuthenticated ? "" : "mt-4"
        }`}
      >
        <ProfileCard
          profileInfo={userInfo?.user}
          is_self={userInfo?.is_self}
          is_followed={userInfo?.is_followed}
          setRefreshPosts={setRefreshPosts}
        />

        <ProfileTabFeed
          refreshPosts={refreshPosts}
          setRefreshPosts={setRefreshPosts}
          userId={decryptedUserId}
          handleRefreshOnFollow={(data) => {
            setUserInfo((prev) => ({
              ...prev,
              is_followed: data?.is_followed,
            }));
          }}
        />
      </div>
    </div>
  );
}
