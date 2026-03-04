'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Lang = 'es' | 'en';

interface LanguageContextType {
  lang: Lang;
  toggleLang: () => void;
  t: (obj: { es: string; en: string }) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('es');

  const toggleLang = () => {
    setLang((prev) => (prev === 'es' ? 'en' : 'es'));
  };

  const t = (obj: { es: string; en: string }) => obj[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    document.body.className = document.body.className
      .replace(/lang--\w+/, '')
      .trim();
    document.body.classList.add(`lang--${lang}`);
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
