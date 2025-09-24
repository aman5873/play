import NewsPageFeed from "@/components/screens/news/NewsPageFeed";
import NewsScreenTopComp from "@/components/screens/news/NewsScreenTopComp";
import NewsFeaturedFeed from "@/components/screens/news/NewsFeaturedFeed";

import React from "react";

export default function page() {
  return (
    <div className="flex flex-col gap-2 p-4">
      <NewsScreenTopComp />
      <NewsFeaturedFeed />

      <NewsPageFeed />
    </div>
  );
}
