import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'zh', name: '中文' }
];

const LanguageSelector = () => {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    return languages.find(lang => lang.code === i18n.language) || languages[0];
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.language-selector')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const changeLanguage = (language: { code: string; name: string }) => {
    i18n.changeLanguage(language.code);
    setSelectedLanguage(language);
    localStorage.setItem('language', language.code);
    setIsOpen(false);
  };

  return (
    <div className="language-selector relative z-10">
      <button
        className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors duration-300"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <Globe size={18} />
        <span className="text-sm font-medium">{selectedLanguage.name}</span>
      </button>
      
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute top-full left-0 mt-1 w-48 rounded-lg bg-white shadow-xl ring-1 ring-black ring-opacity-5"
        >
          <div className="py-1 max-h-60 overflow-auto" role="listbox">
            <div className="px-3 py-2 text-xs font-semibold text-gray-500">
              {t('language.select')}
            </div>
            {languages.map((language) => (
              <button
                key={language.code}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                  selectedLanguage.code === language.code ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'
                }`}
                onClick={() => changeLanguage(language)}
                role="option"
                aria-selected={selectedLanguage.code === language.code}
              >
                {language.name}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default LanguageSelector;