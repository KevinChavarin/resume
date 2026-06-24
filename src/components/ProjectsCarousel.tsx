import { useState, useRef } from 'react';
import { useTranslation } from '../hooks/useTranslation';

type Project = {
  title: string;
  description: string;
  link?: string;
  technologies: string[];
  github?: string;
};

type Props = {
  projects: Project[];
};

function getNestedValue(obj: any, path: string): string {
  return path.split('.').reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : '';
  }, obj) as string;
}

export default function ProjectsCarousel({ projects }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { t } = useTranslation();

  const next = () => setCurrentIndex((prev) => (prev + 1) % projects.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next();
      else prev();
    }
  };

  return (
    <section class="max-w-4xl w-full mb-8">
      <div class="relative">
        <div class="absolute -top-12 -left-4 w-36 h-36 rounded-full bg-gradient-to-br from-blue-400/30 to-purple-400/30 dark:from-blue-500/20 dark:to-purple-500/20 blur-3xl pointer-events-none" />
        <div class="absolute -bottom-12 -right-4 w-44 h-44 rounded-full bg-gradient-to-br from-cyan-400/30 to-blue-400/30 dark:from-cyan-500/20 dark:to-blue-500/20 blur-3xl pointer-events-none" />
        <div class="absolute top-1/3 right-8 w-28 h-28 rounded-full bg-gradient-to-br from-pink-400/20 to-orange-400/20 dark:from-pink-500/15 dark:to-orange-500/15 blur-3xl pointer-events-none" />

        <div class="flex items-center gap-2 sm:gap-4">
          <button
            onClick={prev}
            class="max-sm:hidden shrink-0 p-3 rounded-full bg-white/70 dark:bg-white/10 backdrop-blur-md text-neutral-700 dark:text-neutral-300 hover:bg-white/90 dark:hover:bg-white/20 transition-colors shadow-lg border border-white/30 dark:border-white/10"
            aria-label="Previous project"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <div
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            class="flex-1 overflow-hidden"
          >
            <div
              class="flex items-stretch transition-all duration-300 ease-in-out relative"
              style={{ left: `${-(currentIndex * 80) + 10}%` }}
            >
              {projects.map((project, i) => {
                const title = getNestedValue(t, project.title);
                const description = getNestedValue(t, project.description);
                const isCenter = i === currentIndex;
                return (
                  <div
                    key={i}
                    class={`shrink-0 w-4/5 transition-all duration-300 ${isCenter ? 'opacity-100 scale-100' : 'opacity-40 scale-95'} p-8 sm:p-12 bg-white/40 dark:bg-white/5 backdrop-blur-xl rounded-3xl border border-white/30 dark:border-white/10 shadow-xl select-none`}
                  >
                    <div class="flex items-start justify-between gap-4 mb-6">
                      <div class="min-w-0 flex-1">
                        <div class="flex items-center gap-3 flex-wrap">
                          {project.link ? (
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              class="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors break-words"
                            >
                              {title}
                            </a>
                          ) : (
                            <h3 class="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white break-words">{title}</h3>
                          )}
                        </div>
                      </div>
                      <div class="flex items-center gap-2 shrink-0">
                        {project.link === '/choizfood/' && (
                          <span class="mt-1.5 px-2.5 py-0.5 text-[11px] font-semibold rounded-full bg-yellow-300/80 dark:bg-yellow-400/20 text-yellow-800 dark:text-yellow-300 border border-yellow-400/40 dark:border-yellow-400/30">
                            {getNestedValue(t, 'inDevelopment')}
                          </span>
                        )}
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub repository"
                            class="shrink-0 p-2.5 rounded-full hover:bg-white/50 dark:hover:bg-white/10 transition-colors"
                          >
                            <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" class="text-neutral-700 dark:text-neutral-300">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>

                    <p class="text-neutral-700 dark:text-neutral-200 text-base sm:text-lg mb-6 leading-relaxed">
                      {description}
                    </p>

                    <div class="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech) => (
                        <span class="px-3 py-1.5 text-xs font-medium rounded-full bg-white/60 dark:bg-white/10 text-neutral-700 dark:text-neutral-300 border border-white/40 dark:border-white/10 backdrop-blur-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            onClick={next}
            class="max-sm:hidden shrink-0 p-3 rounded-full bg-white/70 dark:bg-white/10 backdrop-blur-md text-neutral-700 dark:text-neutral-300 hover:bg-white/90 dark:hover:bg-white/20 transition-colors shadow-lg border border-white/30 dark:border-white/10"
            aria-label="Next project"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        <div class="flex justify-center gap-2 mt-6">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              class={`w-3 h-3 rounded-full transition-all duration-300 ${
                i === currentIndex
                  ? 'bg-neutral-800 dark:bg-white w-7'
                  : 'bg-neutral-400/60 dark:bg-neutral-500/60 hover:bg-neutral-500 dark:hover:bg-neutral-400'
              }`}
              aria-label={`Go to project ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
