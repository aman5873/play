import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enCommon from "./locales/en/common.json";
import enAuth from "./locales/en/auth.json";
import enNavigation from "./locales/en/navigation.json";
import enFooter from "./locales/en/footer.json";

import esCommon from "./locales/es/common.json";
import esAuth from "./locales/es/auth.json";
import esNavigation from "./locales/es/navigation.json";
import esFooter from "./locales/es/footer.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      common: enCommon,
      auth: enAuth,
      navigation: enNavigation,
      footer: enFooter,
    },
    es: {
      common: esCommon,
      auth: esAuth,
      navigation: esNavigation,
      footer: esFooter,
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
