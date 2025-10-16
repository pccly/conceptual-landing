'use client';

import { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import Stars from './components/Stars';
import LoadingScreen from './components/LoadingScreen';
import { SECTIONS } from './constants';
import { useScrollProgress, useColorTransition, useScrollToTop, useGsapAnimations } from './hooks';

const AstronautScene = dynamic(() => import('./components/AstronautScene'), {
  ssr: false,
});

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  // Custom hooks for better separation of concerns
  useScrollToTop();
  const scrollProgress = useScrollProgress();
  const { backgroundColor, textColor } = useColorTransition(SECTIONS, scrollProgress);
  useGsapAnimations(SECTIONS, !isLoading);

  return (
    <>
      {isLoading && <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />}

      <div ref={containerRef} className="relative">
        {/* Fixed background with smooth color transitions */}
        <div className="fixed inset-0" style={{ backgroundColor }} />

        {/* Animated starfield */}
        <Stars currentBgColor={backgroundColor} sectionCount={SECTIONS.length} />

        {/* 3D astronaut scene */}
        <AstronautScene scrollProgress={scrollProgress} />

        {/* Main content sections */}
        <div className="relative z-20">
          {SECTIONS.map((section, index) => (
            <section
              key={section.id}
              id={section.id}
              ref={(el) => (sectionRefs.current[index] = el)}
              className="section-initial flex items-center justify-center"
              style={{
                height: '100vh',
                transform: 'translateZ(0)',
                willChange: 'transform',
              }}
            >
              <div className="max-w-4xl mx-auto text-center px-8 md:px-16">
                <h2
                  className="title-initial text-5xl md:text-7xl font-bold mb-6"
                  style={{ color: textColor }}
                >
                  {section.title}
                </h2>
                <p
                  className="description description-initial text-xl md:text-2xl leading-relaxed"
                  style={{ color: textColor }}
                >
                  {section.description}
                </p>
                <div
                  className="section-counter counter-initial mt-8 text-sm font-mono"
                  style={{ color: textColor, opacity: 0.6 }}
                >
                  Section {index + 1} of {SECTIONS.length}
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
