"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";
import i18n from "@/i18n";

interface LanguageContextType {
  lang: string;
  switchLang: (lng: string) => void;
  headerSearchValue: string;
  setHeaderSearchValue: (value: string) => void;
}

// ⚡ Use type assertion to avoid TS warning about default functions
const LanguageContext = createContext<LanguageContextType>(
  {} as LanguageContextType
);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [lang, setLang] = useState<string>(i18n.language || "en");
  const [headerSearchValue, setHeaderSearchValue] = useState<string>("");

  // Restore saved language from localStorage
  useEffect(() => {
    const savedLang = localStorage.getItem("lang");
    if (savedLang && savedLang !== lang) {
      i18n.changeLanguage(savedLang);
      setLang(savedLang);
    }
  }, [lang]);

  const switchLang = useCallback(
    (lng: string) => {
      if (lng !== lang) {
        i18n.changeLanguage(lng);
        setLang(lng);
        localStorage.setItem("lang", lng);
      }
    },
    [lang]
  );

  return (
    <LanguageContext.Provider
      value={{ lang, switchLang, headerSearchValue, setHeaderSearchValue }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

// ⚡ Now useLanguage will always return typed context
export const useLanguage = (): LanguageContextType =>
  useContext(LanguageContext);
