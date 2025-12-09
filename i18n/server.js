import i18next from "i18next";

import enCommon from "./locales/en/common.json";
import enScreensContent from "./locales/en/screensContent.json";

import esCommon from "./locales/es/common.json";
import esScreensContent from "./locales/es/screensContent.json";

const initServerI18n = async (lng = "en") => {
  if (!i18next.isInitialized) {
    await i18next.init({
      lng,
      fallbackLng: "en",
      resources: {
        en: {
          common: enCommon,
          screen: enScreensContent,
        },
        es: {
          common: esCommon,
          screen: esScreensContent,
        },
      },
    });
  } else {
    i18next.changeLanguage(lng);
  }

  return i18next;
};

export default initServerI18n;
