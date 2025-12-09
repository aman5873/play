import AppModal from "@/components/AppModal";
import React, { useEffect, useState } from "react";

import { PostMedia, UserInfo } from "../creator/PostComponents";
import InputComp from "@/components/Form/InputComp";
import { handleApiMessage } from "@/lib/auth_ops";
import { useAlert } from "@/context/AlertContext";
import { updatePost } from "@/lib/content_creator";
import Loading from "@/components/common/Loading";

import { useTranslation } from "react-i18next";

export const parseTagsToList = (tagsText = "") => {
  if (typeof tagsText !== "string") return [];
  return tagsText
    .split(/[,\s]+/) // split by comma or space
    .map((tag) => tag.replace(/^#/, "").trim().toLowerCase()) // remove #
    .filter((tag) => tag.length > 0) // remove empty
    .filter((tag, i, arr) => arr.indexOf(tag) === i); // unique
};

export const getTagsDesc = (tagsList = []) => {
  if (!Array.isArray(tagsList)) return "";
  return tagsList.map((t) => `#${t.name}`).join(" ");
};

export default function ContentEditModal({
  show,
  onClose,
  postInfo,
  mediaAspect = "aspect-[2.5/1]",
  handleRefresh,
}) {
  const { t: tScreen } = useTranslation("screen");
  const { showAlert } = useAlert();
  const [media, setMedia] = useState([]);
  const [removedMedia, setRemovedMedia] = useState([]);
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const formData = new FormData();
    const tagList = parseTagsToList(tags);
    formData.append("description", description);
    tagList.forEach((tag, i) => formData.append(`tags[${i}]`, tag));
    if (postInfo?.type === "image") {
      formData.append("type", "image");
    } else if (postInfo?.type === "video") {
      formData.append("type", "video");
    } else {
      formData.append("type", "text");
    }
    if (removedMedia?.length > 0) {
      removedMedia.forEach((id, i) =>
        formData.append(`remove_media[${i}]`, id)
      );
    }

    try {
      setLoading(true);
      const res = await updatePost({ id: postInfo?.id, data: formData });
      if (res?.success) {
        handleApiMessage(res?.message, showAlert, "success");
        onClose();
        if (handleRefresh) {
          handleRefresh();
        }
      } else {
        handleApiMessage(res?.message, showAlert, "error");
      }
    } catch (err) {
      const errMessage = tScreen("contentCreator.post.createPostFailed");
      console.error(errMessage, err);
      handleApiMessage(errMessage, showAlert, "error");
    } finally {
      setLoading(false); // always reset
    }
  };

  function handleRemove(data) {
    const updatedList = media.filter((obj) => obj?.id !== data?.id);
    setRemovedMedia((prev) => [...prev, data?.id]);
    setMedia(updatedList);
  }

  useEffect(() => {
    if (postInfo) {
      setMedia(postInfo?.media);
      const tagsDesc = getTagsDesc(postInfo?.tags);
      setTags(tagsDesc);
      setDescription(postInfo?.description);
    }
  }, [show, postInfo]);

  return (
    <>
      <Loading loading={loading} />
      <AppModal
        open={show}
        onClose={onClose}
        showCloseIcon={false}
        contClass={`w-[95%] sm:w-[90%] md:w-[80%] ${
          postInfo?.media?.length > 0 ? "lg:max-w-2xl" : "lg:max-w-md"
        }`}
        closeIconClass="top-5 right-5 z-[20]"
        header={
          <div className="flex justify-between items-center mb-2">
            <div
              onClick={onClose}
              className="cursor-pointer text-base font-medium text-[var(--textOne)]"
            >
              {tScreen("contentCreator.profile.cancel")}
            </div>
            <div className="text-lg font-semibold text-[var(--textOne)]">
              {tScreen("contentCreator.post.editInfo")}
            </div>
            <div
              onClick={handleSubmit}
              className="cursor-pointer text-base font-medium text-[var(--primary)]"
            >
              {tScreen("contentCreator.post.done")}
            </div>
          </div>
        }
      >
        {/* Content */}
        <div
          className={`flex flex-col ${
            postInfo?.media?.length > 0 ? "md:flex-row" : "md:flex-col"
          } gap-4 w-full`}
        >
          <UserInfo postInfo={postInfo} contClass="flex md:hidden" />

          {/* Media Section */}
          {media?.length > 0 && (
            <div className="w-full md:w-1/2">
              <PostMedia
                media={media}
                aspect={mediaAspect}
                height="h-70"
                onRemove={handleRemove}
              />
            </div>
          )}

          {/* Info Section */}
          <div className="flex flex-1 flex-col gap-4 w-full">
            <UserInfo postInfo={postInfo} contClass="hidden md:flex" />
            <InputComp
              name="description"
              type="textarea"
              rows={4}
              radius="10px"
              placeholder={tScreen(
                "contentCreator.post.descriptionPlaceholder"
              )}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              variant="secondary"
            />
            <InputComp
              name="tags"
              type="textarea"
              rows={2}
              radius="10px"
              placeholder={tScreen("contentCreator.post.hashtagsPlaceholder")}
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              variant="secondary"
            />
          </div>
        </div>
      </AppModal>
    </>
  );
}
