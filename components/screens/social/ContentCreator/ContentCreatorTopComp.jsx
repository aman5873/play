"use client";
import React, { useState } from "react";
import { TopBgComp } from "@/components/TopComp";
import { useTranslation } from "react-i18next";
import ContentCreateModal from "./ContentCreateModal";

export default function ContentCreatorTopComp() {
  const { t: tScreen } = useTranslation("screen");
  const [showCreateContent, setShowCreateContent] = useState(false);
  return (
    <>
      <ContentCreateModal
        show={showCreateContent}
        onClose={() => setShowCreateContent(false)}
      />
      <TopBgComp
        content={{
          chip: [
            {
              label: tScreen("contentCreator.chip"),
              icon: "trend",
              type: "primary",
            },
          ],
          title: tScreen("contentCreator.title"),
          highlightTitle: tScreen("contentCreator.highlightTitle"),
          description: tScreen("contentCreator.description"),
          button: [
            {
              icon: "add",
              label: tScreen("contentCreator.buttonPrimary"),
              onClick: () => {
                setShowCreateContent(true);
              },
              type: "primary",
            },
            {
              icon: "user",
              label: tScreen("contentCreator.buttonSecondary"),
              redirect: "/social/content-creator/profile",
              type: "secondary",
            },
          ],
          backgroundImage: "/images/screens/contentBg.png",
        }}
      />
    </>
  );
}
