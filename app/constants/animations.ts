export const ANIMATION_CONFIG = {
  // First section animations (on load)
  firstSection: {
    container: {
      duration: 0.6,
      delay: 0,
      ease: "power2.out",
    },
    title: {
      duration: 0.8,
      delay: 0,
      ease: "power3.out",
    },
    description: {
      duration: 0.8,
      delay: 0,
      ease: "power2.out",
    },
    counter: {
      duration: 0.6,
      delay: 0,
      ease: "back.out(1.7)",
    },
  },
  // Scroll-triggered sections
  scrollSection: {
    container: {
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        start: "top 80%",
        end: "top 20%",
        toggleActions: "play none none reverse",
      },
    },
    title: {
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        start: "top 75%",
        end: "top 25%",
        toggleActions: "play none none reverse",
      },
    },
    description: {
      duration: 1,
      delay: 0.3,
      ease: "power2.out",
      scrollTrigger: {
        start: "top 70%",
        end: "top 30%",
        toggleActions: "play none none reverse",
      },
    },
    counter: {
      duration: 0.8,
      delay: 0.5,
      ease: "back.out(1.7)",
      scrollTrigger: {
        start: "top 70%",
        end: "top 30%",
        toggleActions: "play none none reverse",
      },
    },
  },
};

export const ANIMATION_FROM = {
  container: {
    opacity: 0,
    y: 100,
  },
  title: {
    opacity: 0,
    y: 50,
    scale: 0.8,
  },
  description: {
    opacity: 0,
    y: 30,
  },
  counter: {
    opacity: 0,
    scale: 0,
  },
};

export const ANIMATION_TO = {
  container: {
    opacity: 1,
    y: 0,
  },
  title: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
  description: {
    opacity: 1,
    y: 0,
  },
  counter: {
    opacity: 1,
    scale: 1,
  },
};
