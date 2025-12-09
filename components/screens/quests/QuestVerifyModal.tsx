import React, { useEffect, useState } from "react";

import { useAlert } from "@/context/AlertContext";
import { handleApiMessage } from "@/lib/auth_ops";
import { claimQuest } from "@/lib/quest_ops";
import AppModal from "@/components/AppModal";
import Loading from "@/components/common/Loading";
import InputComp from "@/components/Form/InputComp";
import { useTranslation } from "react-i18next";

export default function QuestVerifyModal({
  show,
  onClose,
  questInfo,
  handleRefresh,
}) {
  const { t: tScreen } = useTranslation("screen");
  const { showAlert } = useAlert();
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  function handleClose() {
    setImage(null);
    setUrl("");
    onClose();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      return;
    }

    const formData = new FormData();
    if (image) formData.append("proof_screenshot", image);
    if (url) formData.append("proof_url", url);
    handleRequest({ id: questInfo?.id, data: formData });
  };

  async function handleRequest({ id, data }) {
    try {
      setLoading(true);
      const res = await claimQuest({ id, data });

      if (res?.message) {
        handleApiMessage(
          res?.message,
          showAlert,
          res?.success ? "success" : "error"
        );
      }
      if (res?.success) {
        handleClose();
        handleRefresh();
      }
    } catch (error) {
      console.error(error);
      handleApiMessage("Internal server error", showAlert, "error");
    } finally {
      setLoading(false);
    }
    //
  }

  useEffect(() => {
    if (questInfo?.category === "Daily Challenge") {
      handleRequest({ id: questInfo?.id, data: undefined });
      onClose();
    }
  }, [questInfo?.category, show]);

  return (
    <>
      <Loading loading={loading} />
      <AppModal
        open={show}
        onClose={handleClose}
        titleClass="font-rajdhani"
        contClass="w-[95%] max-w-lg"
      >
        <h2 className="text-[var(--textOne)] text-center font-semibold mb-4">
          <span className="text-lg sm:text-xl">
            {tScreen("quests.labels.submitProofFor")}:{" "}
          </span>
          <span className="sm:text-md text-[var(--primary)] capitalize">
            {questInfo?.title}
          </span>
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Image Input */}
          <div className="flex flex-col gap-2">
            <label className="font-medium text-[var(--textOne)]">
              {tScreen("quests.labels.uploadScreenshot")}{" "}
              <span className="text-[var(--primary)]">*</span>
            </label>

            <div
              className="relative w-full border-2 border-dashed border-[var(--borderThree)] rounded-xl  transition-colors duration-200 
               bg-[var(--bgSecondary)] p-4 cursor-pointer text-center"
            >
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              {image ? (
                <div className="flex flex-col items-center gap-2">
                  <img
                    src={URL.createObjectURL(image)}
                    alt="preview"
                    className="w-20 h-20 object-cover rounded-md shadow-sm"
                  />
                  <span className="text-sm text-[var(--textTwo)] truncate max-w-[200px]">
                    {image.name}
                  </span>
                </div>
              ) : (
                <div className="text-[var(--textTwo)] text-sm">
                  <span className="block">
                    {tScreen("quests.labels.ClickDragImage")}
                  </span>
                  <span className="text-xs text-[var(--textThree)]">
                    {tScreen("quests.labels.supported")} : JPG, PNG
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* URL Input  */}
          <InputComp
            variant="secondaryTwo"
            label={tScreen("quests.labels.enterUrl")}
            name="url"
            placeholder={""}
            type="text"
            radius="10px"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          <button
            disabled={loading}
            type="submit"
            className={`cursor-pointer w-full px-6 py-2 mt-4 rounded-[100px]  font-bold font-rajdhani transition duration-200 ${
              loading
                ? "bg-[var(--bgThree)] text-[var(--textTwo)]"
                : "bg-[var(--primary)] text-[var(--secondary)]"
            }`}
          >
            {loading
              ? tScreen("quests.labels.submitting")
              : tScreen("quests.labels.submitProof")}
          </button>
        </form>
      </AppModal>
    </>
  );
}
