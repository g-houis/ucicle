import React, { createContext, ReactNode, useState } from 'react';
import { Translation } from './Translation';
import fr from './fr';
import en from './en';

type Props = {
  children: ReactNode | ReactNode[]
};

export type Language = 'fr' | 'en';

export type LanguageReferential = {
  language: Language,
  label: string,
  tag: string
};

export const languageReferentials: LanguageReferential[] = [
  { language: 'fr', tag: 'FR', label: 'Français' },
  { language: 'en', tag: 'EN', label: 'English' },
];

export type I18nContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  wording: Translation
};

export const I18nContext: React.Context<I18nContextType> = createContext<I18nContextType>({
  language: 'en',
  setLanguage: () => {},
  wording: en,
});

export default function I18nProvider({ children }: Props) {
  const [language, setLanguage] = useState<Language>(
    (navigator.language.slice(0, 2) as Language) || 'en',
  );

  const wordingList: {
    [key in Language]: Translation
  } = { en, fr };

  const wording: Translation = wordingList[language];

  return (
    <I18nContext.Provider value={{
      language,
      setLanguage,
      wording,
    }}>
      {children}
    </I18nContext.Provider>
  );
}
