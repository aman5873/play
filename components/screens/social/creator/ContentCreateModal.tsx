import AppModal from "@/components/AppModal";
import React from "react";
import { useTranslation } from "react-i18next";

export default function ContentCreateModal({ show, onClose }) {
  const { t: tScreen } = useTranslation("screen");
  return (
    <AppModal
      open={show}
      onClose={onClose}
      titleClass="font-rajdhani"
      contClass="w-[95%] sm:w-md max-w-md"
      closeIconClass="top-7 right-4"
    >
      <h2
        className={`text-[var(--textOne)] font-bold text-lg sm:text-xl md:text-2xl lg:text-[24px]`}
      >
        Content Create
      </h2>
    </AppModal>
  );
}
