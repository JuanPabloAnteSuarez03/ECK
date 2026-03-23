import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { translations, DEFAULT_LOCALE } from "i18n/eckTranslations.js";

const STORAGE_KEY = "eck-locale";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [locale, setLocaleState] = useState(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "en" || stored === "fr") return stored;
    } catch {
      /* ignore */
    }
    return DEFAULT_LOCALE;
  });

  const setLocale = useCallback((next) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const toggleLocale = useCallback(() => {
    setLocaleState((prev) => {
      const next = prev === "en" ? "fr" : "en";
      try {
        window.localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const t = useCallback(
    (key) => {
      const table = translations[locale];
      if (table && Object.prototype.hasOwnProperty.call(table, key)) {
        return table[key];
      }
      const fallback = translations[DEFAULT_LOCALE];
      return fallback[key] ?? key;
    },
    [locale]
  );

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale === "fr" ? "fr" : "en";
    }
  }, [locale]);

  const value = useMemo(
    () => ({ locale, setLocale, toggleLocale, t }),
    [locale, setLocale, toggleLocale, t]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useI18n must be used within a LanguageProvider");
  }
  return ctx;
}
