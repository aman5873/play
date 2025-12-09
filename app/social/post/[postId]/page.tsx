import { extractThumbnailFromVideo, getPostById } from "@/lib/content_creator";
import PostPageClient from "./PostPageClient";
import initServerI18n from "@/i18n/server";
import { decodeUUID } from "@/lib/system";

// ✅ Generate SSR Metadata for SEO + Social Previews
export async function generateMetadata({ params, searchParams }) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const lang = resolvedSearchParams?.lang || "en";
  const { postId: encryptedId } = resolvedParams;
  const decryptedId = decodeUUID(encryptedId);

  const i18n = await initServerI18n(lang);
  const t = i18n.getFixedT(lang, "screen");

  try {
    const res = await getPostById(decryptedId);
    const post = res?.data;

    if (!post) {
      return {
        title: t("contentCreator.post.sharePostNotFoundTitle"),
        description: t("contentCreator.post.sharePostNotFoundDesc"),
      };
    }

    const title =
      post?.title?.trim() ||
      post?.content?.trim()?.slice(0, 60) ||
      t("contentCreator.post.sharePostTitle");
    const description =
      post?.description?.trim() ||
      post?.content?.trim()?.slice(0, 120) ||
      t("contentCreator.post.sharePostDesc");

    const media = post?.media?.[0];
    let image = "/default-post-preview.png";

    if (media?.type === "image" && media?.url) {
      image = media.url;
    } else if (media?.type === "video" && media?.url) {
      try {
        const videoThumb = await extractThumbnailFromVideo(media.url);
        if (videoThumb) image = videoThumb;
        else image = "/default-video-preview.png";
      } catch {
        image = "/default-video-preview.png";
      }
    }

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        images: [
          {
            url: image,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [image],
      },
    };
  } catch (err) {
    console.error("❌ Metadata generation failed:", err);
    return {
      title: t("contentCreator.post.sharePostTitle"),
      description: t("contentCreator.post.sharePostDesc"),
    };
  }
}

// ✅ Actual Page Server Component (SSR)
export default async function Page() {
  return (
    <div className="p-4">
      <PostPageClient />
    </div>
  );
}
