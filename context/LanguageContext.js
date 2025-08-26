"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import i18n from "@/i18n";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(i18n.language || "en");

  // restore saved language
  useEffect(() => {
    const savedLang = localStorage.getItem("lang");
    if (savedLang && savedLang !== lang) {
      i18n.changeLanguage(savedLang);
      setLang(savedLang);
    }
  }, []);

  const switchLang = useCallback(
    (lng) => {
      if (lng !== lang) {
        i18n.changeLanguage(lng);
        setLang(lng);
        localStorage.setItem("lang", lng);
      }
    },
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, switchLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
