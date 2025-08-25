"use client";
import { createContext, useState, useContext, useEffect } from "react";
import i18n from "@/i18n";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const savedLang = localStorage.getItem("lang");
    if (savedLang) {
      i18n.changeLanguage(savedLang);
      setLang(savedLang);
    }
  }, []);

  const switchLang = (lng) => {
    i18n.changeLanguage(lng);
    setLang(lng);
    localStorage.setItem("lang", lng);
  };

  return (
    <LanguageContext.Provider value={{ lang, switchLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
