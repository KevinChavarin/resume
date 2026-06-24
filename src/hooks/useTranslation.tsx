import { useEffect, useState } from 'react';

const translations = {
  en: {
    name: "Kevin Chavarin",
    role: `Fullstack developer with a passion for creating innovative and efficient web applications. I specialize in building scalable and maintainable software solutions using modern technologies and best practices.`,
    aboutMe: "About me",
    aboutMeText: `I'm a developer with a programming degree passionate about technology and innovation I love to make things happen, from an idea to something we can see and experience.
                I have 3 years of developing experience with personal, school and internship projects focusing on creating accesible, clean and SEO-optimized interfaces with a strong focus on performance optimization which is essential for mantaining high quality score for websites.
                I strongly believe in the sustainable software engineering so I prioritize clean code practices to optimize infraestructure costs.`,
    experience: "Experience",
    cognizantExperienceTitle: "Backoffice Helpdesk - Software Quality",
    cognizantExperienceType: "On-site",
    cognizantDescription: `Providing backoffice support and software quality assurance, ensuring application reliability through systematic testing and issue tracking. Collaborating with development teams to identify and resolve software defects.`,
    ibmExperienceTitle: "Frontend Developer",
    ibmExperienceType: "Hybrid",
    ibmDescription: `Developed a unified application for managing work schedules and production metrics using React, Carbon Design System, Sass, and Next.js.
                     Implemented CI/CD strategies to improve deployment efficiency and reduce production errors. I received an award for active learning in 2022.`,
    education: {
      label: "Education",
      degree: "Bachelor's degree in Information Technologies",
      institution: "University of Guadalajara",
      duration: "January 2020 - June 2025",
      specialization: "Cybersecurity specialization",
    },
    projects: {
      label: "Projects",
      project1: {
        title: "Choiz",
        description: "SaaS platform that connects users with local restaurants, allowing them to browse menus, read reviews and order food seamlessly. Features real-time order tracking and personalized recommendations.",
      },
      project2: {
        title: "Personal Blog",
        description: "Here you can find articles about web development, programming, new technologies, gaming, anime and more about me.",
      },
      project3: {
        title: "Tutoring Platform",
        description: "This project is a tutoring platform where students can find tutors for various subjects, contact them, schedule sessions and manage their learning progress.",
      },
      project4: {
        title: "Access control web application",
        description: "Web application for managing access control in a company, allowing administrators to manage employee access levels and monitor their activities as well as generate reports, analytics and more.",
      },
    },
    certifications: "Certifications",
    viewCertificate: "View Certificate",
    inDevelopment: "In development",
    skills: "Skills",
    softSkills: {
      label: "Soft Skills",
      problemSolving: "Problem solving",
      teamwork: "Teamwork",
      communication: "Communication",
      metaCommunication: "Meta-communication",
      adaptability: "Adaptability",
      timeManagement: "Time management",
      criticalThinking: "Critical thinking",
      creativity: "Creativity",
      growthMindset: "Growth mindset",
      attentionToDetail: "Attention to detail",
    },
  },
  es: {
    name: "Kevin Chavarin",
    role: "Desarrollador Fullstack con pasión por crear aplicaciones web innovadoras y eficientes. Me especializo en construir soluciones de software escalables y mantenibles utilizando tecnologías modernas y mejores prácticas.",
    aboutMe: "Sobre mí",
    aboutMeText: `Soy un desarrollador con un título en programación apasionado por la tecnología y la innovación. Me encanta hacer que las cosas sucedan, desde una idea hasta algo que podamos ver y experimentar.
                Tengo 3 años de experiencia en desarrollo con proyectos personales, escolares y de prácticas profesionales, enfocándome en crear interfaces accesibles, limpias y optimizadas para SEO con un fuerte enfoque en la optimización del rendimiento, lo cual es esencial para mantener una puntuación de alta calidad en sitios web.
                Creo firmemente en la ingeniería de software sostenible, por lo que priorizo las prácticas de código limpio para optimizar los costos de infraestructura.`,
    experience: "Experiencia",
    cognizantExperienceTitle: "Backoffice Helpdesk - Calidad de Software",
    cognizantExperienceType: "Presencial",
    cognizantDescription: `Brindando soporte de backoffice y aseguramiento de calidad de software, garantizando la confiabilidad de las aplicaciones mediante pruebas sistemáticas y seguimiento de incidencias. Colaborando con equipos de desarrollo para identificar y resolver defectos de software.`,
    ibmExperienceTitle: "Desarrollador Frontend",
    ibmExperienceType: "Híbrido",
    ibmDescription: `Desarrollé una aplicación unificada para gestionar horarios de trabajo y métricas de producción utilizando React, Carbon Design System, Sass y Next.js.
                     Implementé estrategias de CI/CD para mejorar la eficiencia de despliegue y reducir errores en producción. Recibí un premio por aprendizaje activo en 2022.`,
    education: {
      label: "Educación",
      degree: "Licenciatura en Tecnologías de la Información",
      institution: "Universidad de Guadalajara",
      duration: "Enero 2020 - Junio 2025",
      specialization: "Especialización en ciberseguridad",
    },
    projects: {
      label: "Proyectos",
      project1: {
        title: "Choiz",
        description: "Plataforma SaaS que conecta usuarios con restaurantes locales, permitiendo explorar menús, leer reseñas y ordenar comida de forma sencilla. Incluye seguimiento de pedidos en tiempo real y recomendaciones personalizadas.",
      },
      project2: {
        title: "Blog personal",
        description: "Aquí puedes encontrar artículos sobre desarrollo web, programación, nuevas tecnologías, videojuegos, anime y más sobre mí.",
      },
      project3: {
        title: "Plataforma de tutoría",
        description: "Este proyecto es una plataforma de tutoría donde los estudiantes pueden encontrar tutores para diversas materias, contactarlos, programar sesiones y gestionar su progreso de aprendizaje.",
      },
      project4: {
        title: "Aplicación web de control de acceso",
        description: "Aplicación web para gestionar el control de acceso en una empresa, permitiendo a los administradores gestionar los niveles de acceso de los empleados y monitorear sus actividades, así como generar informes, análisis y más.",
      },
    },
    certifications: "Certificaciones",
    skills: "Habilidades",
    softSkills: {
      label : "Habilidades Blandas",
      problemSolving: "Resolución de problemas",
      teamwork: "Trabajo en equipo",
      communication: "Comunicación",
      metaCommunication: "Meta-comunicación",
      adaptability: "Adaptabilidad",
      timeManagement: "Gestión del tiempo",
      criticalThinking: "Pensamiento crítico",
      creativity: "Creatividad",
      growthMindset: "Mentalidad de crecimiento",
      attentionToDetail: "Atención al detalle",
    },
    viewCertificate: "Ver Certificado",
    inDevelopment: "En desarrollo",
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