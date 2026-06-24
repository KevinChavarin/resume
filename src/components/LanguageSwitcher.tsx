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
      className="ml-2 px-3 py-2 rounded bg-white/70 dark:bg-white/10 backdrop-blur-md border border-white/30 dark:border-white/10 text-neutral-700 dark:text-neutral-200 hover:bg-white/90 dark:hover:bg-white/20 transition-colors"
      aria-label="Toggle language"
      title={`Switch to ${language === 'en' ? 'Español' : 'English'}`}
    >
      <svg 
        width="20" 
        height="20" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className="w-5 h-5"
      >
        <path d="m5 8 6 6"/>
        <path d="m4 14 6-6 2-3"/>
        <path d="M2 5h12"/>
        <path d="M7 2h1"/>
        <path d="m22 22-5-10-5 10"/>
        <path d="M14 18h6"/>
      </svg>
    </button>
  );
}