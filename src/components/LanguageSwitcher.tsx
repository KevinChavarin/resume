import { useEffect, useState } from 'react';

export default function LanguageSwitcher() {
  const [language, setLanguage] = useState('en');

  // Inicializar idioma
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('language');
      if (!savedLanguage) {
        localStorage.setItem('language', 'en');
        setLanguage('en');
      } else {
        setLanguage(savedLanguage);
      }
    }
  }, []);

  // Toggle language
  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'es' : 'en';
    setLanguage(newLanguage);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', newLanguage);
      // Emitir evento personalizado para que otros componentes se actualicen
      window.dispatchEvent(new CustomEvent('languageChange', { detail: newLanguage }));
    }
  };

  return (
    <button
      onClick={toggleLanguage}
      className="px-3 py-2 rounded bg-neutral-200 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-colors"
      aria-label="Toggle language"
      title={`Switch to ${language === 'en' ? 'Español' : 'English'}`}
    >
      <span className="text-sm font-medium">
        {language === 'en' ? '🇺🇸 EN' : '🇪🇸 ES'}
      </span>
    </button>
  );
}