import initServerI18n from "@/i18n/server";
import { getStreamById } from "@/lib/content_creator";
import StreamPageClient from "./StreamPageClient";
import { decodeUUID } from "@/lib/system";

// ✅ Generate SSR Metadata for SEO + Social Previews
export async function generateMetadata({ params, searchParams }) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const lang = resolvedSearchParams?.lang || "en";
  const { streamId: encryptedId } = resolvedParams;
  const decryptedId = decodeUUID(encryptedId);

  const i18n = await initServerI18n(lang);
  const t = i18n.getFixedT(lang, "screen");

  try {
    const res = await getStreamById(decryptedId);
    const stream = res?.data?.streams?.[0];

    if (!stream) {
      return {
        title: t("contentCreator.stream.shareStreamNotFoundTitle"),
        description: t("contentCreator.stream.shareStreamNotFoundDesc"),
      };
    }

    const title =
      stream?.title?.trim() || t("contentCreator.stream.shareStreamTitle");

    const description =
      stream?.game_name?.trim() || t("contentCreator.stream.shareStreamDesc");

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        images: [
          {
            url: stream?.thumbnail_url || "/default-stream-preview.png",
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [stream?.thumbnail_url || "/default-stream-preview.png"],
      },
    };
  } catch (err) {
    console.error("❌ Metadata generation failed:", err);

    return {
      title: t("contentCreator.stream.shareStreamTitle"),
      description: t("contentCreator.stream.shareStreamDesc"),
    };
  }
}

// ✅ Actual Page Server Component (SSR)
export default async function Page() {
  return (
    <div className="p-3 lg:p-4">
      <StreamPageClient />
    </div>
  );
}
