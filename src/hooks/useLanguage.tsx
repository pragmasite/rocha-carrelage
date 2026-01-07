import { createContext, useContext, ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { translations, Language } from "@/lib/translations";

interface LanguageContextType {
  lang: Language;
  t: typeof translations.fr;
  otherLanguages: Array<{ code: Language; label: string; path: string }>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const location = useLocation();

  // Determine language from URL path
  let lang: Language = "fr"; // Default to French

  if (location.pathname.startsWith("/de")) {
    lang = "de";
  } else if (location.pathname.startsWith("/en")) {
    lang = "en";
  }

  const t = translations[lang];

  // Get other language options
  const allLanguages: Array<{ code: Language; label: string }> = [
    { code: "fr", label: "Français" },
    { code: "de", label: "Deutsch" },
    { code: "en", label: "English" },
  ];

  const otherLanguages = allLanguages
    .filter((l) => l.code !== lang)
    .map((l) => ({
      code: l.code,
      label: l.label,
      path: l.code === "fr" ? "/" : `/${l.code}`,
    }));

  return (
    <LanguageContext.Provider value={{ lang, t, otherLanguages }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};
