import { useContext } from 'react';
import { Translation } from './Translation';
import { I18nContext, I18nContextType } from './I18nProvider';

export default function useWording(): { wording: Translation } {
  const i18n: I18nContextType = useContext(I18nContext);
  return { wording: i18n.wording };
}
