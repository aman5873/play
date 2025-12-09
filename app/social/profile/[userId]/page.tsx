import initServerI18n from "@/i18n/server";
import UserContentProfileFeed from "./UserContentProfileFeed";
import { fetchSSRUserProfile } from "@/lib/content_creator";
import { decodeUUID } from "@/lib/system";

export async function generateMetadata({ params, searchParams }) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const lang = resolvedSearchParams?.lang || "en";
  const { userId: encryptedId } = resolvedParams;
  const decryptedUserId = decodeUUID(encryptedId);

  try {
    const i18n = await initServerI18n(lang);
    const t = i18n.getFixedT(lang, "screen");

    const res = await fetchSSRUserProfile(decryptedUserId);
    const user = res?.data?.user;

    // name is guaranteed
    const name = user?.name;

    // friendly default bio
    const bio = user?.bio?.trim()
      ? user.bio
      : t("contentCreator.profile.defaultDescription"); // now "Checkout this profile and explore."

    const avatar = user?.avatar_url?.trim()
      ? user.avatar_url
      : "/images/defaultUserAvatar.png";

    const cover = user?.cover_url?.trim() ? user.cover_url : null;

    const ogImage = cover || avatar;

    return {
      title: name,
      description: bio,

      openGraph: {
        title: name,
        description: bio,
        type: "profile",
        images: [
          {
            url: ogImage,
            width: 600,
            height: 600,
            alt: `${name} profile`,
          },
        ],
      },

      twitter: {
        card: "summary_large_image",
        title: name,
        description: bio,
        images: [ogImage],
      },
    };
  } catch (err) {
    console.error("❌ Metadata generation failed:", err);

    return {
      title: "",
      description: "",
    };
  }
}

export default function page() {
  return (
    <div className="flex flex-col gap-2 p-[1.2vw] sm:p-[1vw]">
      <UserContentProfileFeed initialUser={null} />
    </div>
  );
}
