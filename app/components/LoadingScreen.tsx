"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

// Configuration constants
const LOADING_CONFIG = {
  backgroundColor: "rgb(85, 70, 140)",
  starCount: 150,
  progressInterval: 30, // milliseconds
  progressIncrement: 2, // percent per interval
  fadeOutDelay: 500, // milliseconds after completion
};

const RING_ANIMATIONS = [
  {
    duration: "1.2s",
    easing: "cubic-bezier(0.4, 0, 0.6, 1)",
    direction: "normal",
    size: 180, // Outer ring - largest
    strokeWidth: 1.5,
    opacity: 0.15,
    dashArray: "50 150",
  },
  {
    duration: "2s",
    easing: "ease-in-out",
    direction: "normal",
    size: 150, // Middle ring
    strokeWidth: 2,
    opacity: 0.2,
    dashArray: "70 200",
  },
  {
    duration: "3s",
    easing: "ease-out",
    direction: "reverse",
    size: 165, // Between outer and middle
    strokeWidth: 1,
    opacity: 0.1,
    dashArray: "30 100",
  },
] as const;

interface StarStyle {
  left: string;
  top: string;
  width: string;
  height: string;
  opacity: number;
  boxShadow: string;
}

export default function LoadingScreen({
  onLoadingComplete,
}: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [stars, setStars] = useState<StarStyle[]>([]);

  // Generate stars on client side only (avoid hydration issues)
  useEffect(() => {
    const generatedStars = generateStars(LOADING_CONFIG.starCount);
    setStars(generatedStars);
  }, []);

  // Prevent scrolling while loading
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // Simulate loading progress
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsComplete(true);
          setTimeout(() => {
            onLoadingComplete();
          }, LOADING_CONFIG.fadeOutDelay);
          return 100;
        }
        return prev + LOADING_CONFIG.progressIncrement;
      });
    }, LOADING_CONFIG.progressInterval);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-opacity duration-500 overflow-hidden ${
        isComplete ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{
        backgroundColor: LOADING_CONFIG.backgroundColor,
        touchAction: "none",
      }}
    >
      {/* Background Stars */}
      <BackgroundStars stars={stars} />

      {/* Animated Logo with Rotating Rings */}
      <LogoWithRings />

      {/* Loading Text */}
      <div className="text-white text-xl font-light mb-4 tracking-wider">
        INITIALIZING VOYAGE
      </div>

      {/* Progress Bar */}
      <ProgressBar progress={progress} />

      {/* Progress Percentage */}
      <div className="text-white text-sm font-mono mt-3 opacity-60">
        {progress}%
      </div>
    </div>
  );
}

/**
 * Generates random star styles for the loading screen
 */
function generateStars(count: number): StarStyle[] {
  return Array.from({ length: count }).map(() => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    width: `${Math.random() * 2.5 + 0.5}px`,
    height: `${Math.random() * 2.5 + 0.5}px`,
    opacity: Math.random() * 0.6 + 0.2,
    boxShadow:
      Math.random() > 0.7
        ? `0 0 ${Math.random() * 4 + 2}px rgba(255, 255, 255, 0.5)`
        : "none",
  }));
}

/**
 * Background stars component
 */
function BackgroundStars({ stars }: { stars: StarStyle[] }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {stars.map((star, i) => (
        <div key={i} className="absolute rounded-full bg-white" style={star} />
      ))}
    </div>
  );
}

/**
 * Logo with rotating rings component
 */
function LogoWithRings() {
  return (
    <div className="relative mb-8">
      <Logo size={120} className="text-white animate-pulse" />

      {RING_ANIMATIONS.map((ring, index) => (
        <RotatingRing key={index} {...ring} />
      ))}
    </div>
  );
}

/**
 * Individual rotating ring component
 */
function RotatingRing({
  duration,
  easing,
  direction,
  size,
  strokeWidth,
  opacity,
  dashArray,
}: (typeof RING_ANIMATIONS)[number]) {
  return (
    <div
      className="absolute top-1/2 left-1/2"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        marginLeft: `-${size / 2}px`,
        marginTop: `-${size / 2}px`,
      }}
    >
      <svg
        className="w-full h-full"
        style={{
          animation: `spin ${duration} ${easing} infinite ${direction === "reverse" ? "reverse" : ""}`,
        }}
        viewBox="0 0 100 100"
      >
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke={`rgba(255, 255, 255, ${opacity})`}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={dashArray}
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

/**
 * Progress bar component
 */
function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
      <div
        className="h-full bg-white transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
