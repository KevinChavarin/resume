import { useEffect, useState } from 'react';

export default function ThemeSwitcher() {
  const [isDark, setIsDark] = useState(false);

  // SVGs
  const sunSVG = (
    <svg className="w-5 h-5" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <circle fill="currentColor" cx="32.003" cy="32.005" r="16.001"></circle>
      <path fill="currentColor" d="M12.001,31.997c0-2.211-1.789-4-4-4H4c-2.211,0-4,1.789-4,4 s1.789,4,4,4h4C10.212,35.997,12.001,34.208,12.001,31.997z"></path>
      <path fill="currentColor" d="M12.204,46.139l-2.832,2.833c-1.563,1.562-1.563,4.094,0,5.656 c1.562,1.562,4.094,1.562,5.657,0l2.833-2.832c1.562-1.562,1.562-4.095,0-5.657C16.298,44.576,13.767,44.576,12.204,46.139z"></path>
      <path fill="currentColor" d="M32.003,51.999c-2.211,0-4,1.789-4,4V60c0,2.211,1.789,4,4,4 s4-1.789,4-4l-0.004-4.001C36.003,53.788,34.21,51.999,32.003,51.999z"></path>
      <path fill="currentColor" d="M51.798,46.143c-1.559-1.566-4.091-1.566-5.653-0.004 s-1.562,4.095,0,5.657l2.829,2.828c1.562,1.57,4.094,1.562,5.656,0s1.566-4.09,0-5.656L51.798,46.143z"></path>
      <path fill="currentColor" d="M60.006,27.997l-4.009,0.008 c-2.203-0.008-3.992,1.781-3.992,3.992c-0.008,2.211,1.789,4,3.992,4h4.001c2.219,0.008,4-1.789,4-4 C64.002,29.79,62.217,27.997,60.006,27.997z"></path>
      <path fill="currentColor" d="M51.798,17.859l2.828-2.829c1.574-1.566,1.562-4.094,0-5.657 c-1.559-1.567-4.09-1.567-5.652-0.004l-2.829,2.836c-1.562,1.555-1.562,4.086,0,5.649C47.699,19.426,50.239,19.418,51.798,17.859z"></path>
      <path fill="currentColor" d="M32.003,11.995c2.207,0.016,4-1.789,4-3.992v-4 c0-2.219-1.789-4-4-4c-2.211-0.008-4,1.781-4,3.993l0.008,4.008C28.003,10.206,29.792,11.995,32.003,11.995z"></path>
      <path fill="currentColor" d="M12.212,17.855c1.555,1.562,4.079,1.562,5.646-0.004 c1.574-1.551,1.566-4.09,0.008-5.649l-2.829-2.828c-1.57-1.571-4.094-1.559-5.657,0c-1.575,1.559-1.575,4.09-0.012,5.653 L12.212,17.855z"></path>
    </svg>
  );

  const moonSVG = (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (!savedTheme) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        setIsDark(true);
      } else {
        const isDarkMode = savedTheme === 'dark';
        document.documentElement.classList.toggle('dark', isDarkMode);
        setIsDark(isDarkMode);
      }
    }
  }, []);


  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    
    if (typeof window !== 'undefined') {
      document.documentElement.classList.toggle('dark', newIsDark);
      localStorage.setItem('theme', newIsDark ? 'dark' : 'light');
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="px-3 py-2 rounded bg-neutral-200 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-colors ml-auto"
      aria-label="Toggle theme"
    >
      {isDark ? sunSVG : moonSVG}
    </button>
  );
}