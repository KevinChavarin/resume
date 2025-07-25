import { useEffect, useState } from 'react';

const translations = {
  en: {
    name: "Kevin Chavarin",
    role: `Fullstack developer with a passion for creating innovative and efficient web applications. I specialize in building scalable and maintainable software solutions using modern technologies and best practices.`,
    aboutMe: "About Me",
    aboutMeText: `I'm a developer with a programming degree passionate about technology and innovation I love to make things happen, from an idea to something we can see and experience.
                I have 3 years of developing experience with personal, school and internship projects focusing on creating accesible, clean and SEO-optimized interfaces with a strong focus on performance optimization which is essential for mantaining high quality score for websites.
                I strongly believe in the sustainable software engineering so I prioritize clean code practices to optimize infraestructure costs.`,
    experience: "Experience",
    education: "Education",
    projects: "Projects",
    certifications: "Certifications",
    skills: "Skills",
    viewCertificate: "View Certificate",
    
  },
  es: {
    name: "Kevin Chavarin",
    role: "Desarrollador Fullstack con pasión por crear aplicaciones web innovadoras y eficientes. Me especializo en construir soluciones de software escalables y mantenibles utilizando tecnologías modernas y mejores prácticas.",
    aboutMe: "Sobre mí",
    aboutMeText: `Soy un desarrollador con un título en programación apasionado por la tecnología y la innovación. Me encanta hacer que las cosas sucedan, desde una idea hasta algo que podamos ver y experimentar.
                Tengo 3 años de experiencia en desarrollo con proyectos personales, escolares y de prácticas profesionales, enfocándome en crear interfaces accesibles, limpias y optimizadas para SEO con un fuerte enfoque en la optimización del rendimiento, lo cual es esencial para mantener una puntuación de alta calidad en sitios web.
                Creo firmemente en la ingeniería de software sostenible, por lo que priorizo las prácticas de código limpio para optimizar los costos de infraestructura.`,
    experience: "Experiencia",
    education: "Educación",
    projects: "Proyectos",
    certifications: "Certificaciones",
    skills: "Habilidades",
    viewCertificate: "Ver Certificado",
  }
};

export function useTranslation() {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    // Obtener idioma inicial
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('language') || 'en';
      setLanguage(savedLanguage);

      // Escuchar cambios de idioma
      const handleLanguageChange = (event: CustomEvent) => {
        setLanguage(event.detail);
      };

      window.addEventListener('languageChange', handleLanguageChange as EventListener);
      
      return () => {
        window.removeEventListener('languageChange', handleLanguageChange as EventListener);
      };
    }
  }, []);

  return {
    t: translations[language as keyof typeof translations],
    language
  };
}