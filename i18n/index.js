import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        brand: "IMM Play",
        games: "Games",
        teams: "Teams",
        tournaments: "Tournaments",
        rankings: "Rankings",
        social: "Social",
        assets: "Assets",
        login: "Login",
        register: "Register",
      },
    },
    es: {
      translation: {
        brand: "IMM Play",
        games: "Juegos",
        teams: "Equipos",
        tournaments: "Torneos",
        rankings: "Clasificación",
        social: "Social",
        assets: "Recursos",
        login: "Iniciar Sesión",
        register: "Registrarse",
      },
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
