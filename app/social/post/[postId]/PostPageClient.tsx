"use client";

import {
  PostCard,
  PostCardSkeleton,
  PostDetailCard,
} from "@/components/screens/social/creator/ContentCreatorFeed";
import { useAuth } from "@/context/AuthContext";
import { getPostById } from "@/lib/content_creator";
import { decodeUUID } from "@/lib/system";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function PostPageClient({ initialPost = null }) {
  const { postId: encryptedId } = useParams();
  const decryptedPostId = decodeUUID(encryptedId);

  const router = useRouter();
  const { user } = useAuth();

  const [isMounted, setIsMounted] = useState(false);
  const [currentPost, setCurrentPost] = useState(initialPost);
  const [loading, setLoading] = useState(!initialPost);
  const [showComments, setShowComments] = useState(null);

  function handleRefreshUpdatePost(updatedPost) {
    if (!updatedPost?.id) return;
    setCurrentPost(updatedPost);
  }

  // Prevent hydration mismatch (layout flicker)
  useEffect(() => {
    setIsMounted(true);
  }, []);

  async function fetchPostDetails(decryptedPostId) {
    if (!decryptedPostId) return;
    setLoading(true);
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const userId = user?.id || storedUser?.id || null;
      const res = await getPostById(decryptedPostId, userId);

      if (res?.success && res?.data) {
        setCurrentPost(res.data);
      }
    } catch (err) {
      console.error("❌ Fetch post failed:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!initialPost && decryptedPostId && isMounted) {
      fetchPostDetails(decryptedPostId);
    }
  }, [decryptedPostId, isMounted]);

  function handleViewComments(obj) {
    setShowComments(obj);
  }

  function afterDelete() {
    if (window.history.length > 2) {
      router.back();
    } else {
      router.push("/social");
    }
  }

  // ✅ Wait until mount to avoid hydration flicker
  if (!isMounted || loading)
    return (
      <div className="flex-1 max-w-full sm:max-w-[650px] flex flex-col gap-5 mx-auto mt-4">
        <PostCardSkeleton />
      </div>
    );

  return (
    <div
      key={`${decryptedPostId}-${user?.id || "nouser"}`} // ✅ ensures proper re-render if user changes
      className="flex flex-col gap-4 max-w-[95%] sm:max-w-[650px] mx-auto"
    >
      <PostDetailCard
        show={Boolean(showComments)}
        onClose={() => setShowComments(null)}
        postInfo={currentPost}
        onDelete={afterDelete}
        handleRefresh={() => fetchPostDetails(decryptedPostId)}
        handleRefreshUpdatePost={handleRefreshUpdatePost}
      />

      {currentPost && (
        <PostCard
          key={currentPost?.id}
          obj={currentPost}
          handleViewComments={handleViewComments}
          onDelete={afterDelete}
          handleRefresh={() => fetchPostDetails(decryptedPostId)}
          handleRefreshUpdatePost={handleRefreshUpdatePost}
        />
      )}
    </div>
  );
}
