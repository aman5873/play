import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enCommon from "./locales/en/common.json";
import enAuth from "./locales/en/auth.json";
import esCommon from "./locales/es/common.json";
import esAuth from "./locales/es/auth.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      common: enCommon,
      auth: enAuth,
    },
    es: {
      common: esCommon,
      auth: esAuth,
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
