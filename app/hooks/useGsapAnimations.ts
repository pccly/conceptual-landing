import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Section } from '../types';
import { ANIMATION_CONFIG, ANIMATION_FROM, ANIMATION_TO } from '../constants/animations';

gsap.registerPlugin(ScrollTrigger);

/**
 * Custom hook to set up GSAP animations for all sections
 */
export function useGsapAnimations(sections: Section[], isLoadingComplete: boolean): void {
  useEffect(() => {
    if (!isLoadingComplete) return;

    sections.forEach((section, index) => {
      const sectionSelector = `#${section.id}`;

      if (index === 0) {
        // First section - animate immediately after loading screen
        animateFirstSection(sectionSelector);
      } else {
        // Other sections - animate on scroll
        animateScrollSection(sectionSelector);
      }
    });

    // Cleanup ScrollTrigger instances
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [sections, isLoadingComplete]);
}

/**
 * Animates the first section with initial load animations
 */
function animateFirstSection(selector: string): void {
  const { firstSection } = ANIMATION_CONFIG;

  // Animate container
  gsap.fromTo(selector, ANIMATION_FROM.container, {
    ...ANIMATION_TO.container,
    ...firstSection.container,
  });

  // Animate title
  gsap.fromTo(`${selector} h2`, ANIMATION_FROM.title, {
    ...ANIMATION_TO.title,
    ...firstSection.title,
  });

  // Animate description
  gsap.fromTo(`${selector} .description`, ANIMATION_FROM.description, {
    ...ANIMATION_TO.description,
    ...firstSection.description,
  });

  // Animate counter
  gsap.fromTo(`${selector} .section-counter`, ANIMATION_FROM.counter, {
    ...ANIMATION_TO.counter,
    ...firstSection.counter,
  });
}

/**
 * Animates sections on scroll with ScrollTrigger
 */
function animateScrollSection(selector: string): void {
  const { scrollSection } = ANIMATION_CONFIG;

  // Animate container
  gsap.fromTo(selector, ANIMATION_FROM.container, {
    ...ANIMATION_TO.container,
    ...scrollSection.container,
    scrollTrigger: {
      trigger: selector,
      ...scrollSection.container.scrollTrigger,
    },
  });

  // Animate title
  gsap.fromTo(`${selector} h2`, ANIMATION_FROM.title, {
    ...ANIMATION_TO.title,
    ...scrollSection.title,
    scrollTrigger: {
      trigger: selector,
      ...scrollSection.title.scrollTrigger,
    },
  });

  // Animate description
  gsap.fromTo(`${selector} .description`, ANIMATION_FROM.description, {
    ...ANIMATION_TO.description,
    ...scrollSection.description,
    scrollTrigger: {
      trigger: selector,
      ...scrollSection.description.scrollTrigger,
    },
  });

  // Animate counter
  gsap.fromTo(`${selector} .section-counter`, ANIMATION_FROM.counter, {
    ...ANIMATION_TO.counter,
    ...scrollSection.counter,
    scrollTrigger: {
      trigger: selector,
      ...scrollSection.counter.scrollTrigger,
    },
  });
}

