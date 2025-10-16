export interface Section {
  id: string;
  title: string;
  description: string;
  color: string;
  textColor: string;
}

export interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
}

export interface ScrollTriggerConfig {
  start: string;
  end: string;
  toggleActions: string;
}

export interface AnimationConfig {
  duration: number;
  delay?: number;
  ease: string;
  scrollTrigger?: ScrollTriggerConfig;
}

