import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageToggle = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex items-center space-x-2 text-sm font-medium">
      <button onClick={() => changeLanguage('en')} className={`p-1 rounded-full transition ${i18n.language.startsWith('en') ? 'ring-2 ring-lifewood-saffron' : 'opacity-60 hover:opacity-100'}`}>
        🇬🇧
      </button>
      <button onClick={() => changeLanguage('zh')} className={`p-1 rounded-full transition ${i18n.language.startsWith('zh') ? 'ring-2 ring-lifewood-saffron' : 'opacity-60 hover:opacity-100'}`}>
        🇨🇳
      </button>
    </div>
  );
};
export default LanguageToggle;