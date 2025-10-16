"use client";

import { useEffect, useRef } from "react";
import { SCENE_CONFIG } from "../constants/scene";

interface AstronautFallbackProps {
  scrollProgress: number;
}

/**
 * CSS-based fallback for the 3D astronaut scene
 * Used when WebGL/GPU acceleration is not available
 */
export default function AstronautFallback({
  scrollProgress,
}: AstronautFallbackProps) {
  const astronautRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!astronautRef.current) return;

    const { startPosition, endPosition } = SCENE_CONFIG.astronaut;

    // Calculate positions (convert from 3D space to 2D screen space)
    // The 3D positions are in units, we'll scale them to percentages
    const xStart = 50 + startPosition.x * 10; // Center + offset
    const yStart = 50 - startPosition.y * 10; // Invert Y for screen space
    const xEnd = 50 + endPosition.x * 10;
    const yEnd = 50 - endPosition.y * 10;

    const x = xStart + (xEnd - xStart) * scrollProgress;
    const y = yStart + (yEnd - yStart) * scrollProgress;

    // Apply transform with smooth animation
    astronautRef.current.style.transform = `translate(-50%, -50%) translate(${x}vw, ${y}vh)`;
  }, [scrollProgress]);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      <div
        ref={astronautRef}
        className="absolute top-0 left-0 transition-transform duration-100 ease-out"
        style={{
          transform: "translate(-50%, -50%)",
        }}
      >
        {/* CSS-based astronaut illustration */}
        <div className="relative astronaut-fallback">
          {/* Helmet */}
          <div className="absolute w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-300 rounded-full border-4 border-white shadow-2xl">
            {/* Visor */}
            <div className="absolute top-6 left-4 w-16 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full opacity-80" />
            {/* Visor reflection */}
            <div className="absolute top-7 left-6 w-8 h-4 bg-white rounded-full opacity-40" />
          </div>

          {/* Body */}
          <div className="absolute top-20 left-1 w-22 h-28 bg-gradient-to-br from-gray-200 to-gray-400 rounded-2xl border-4 border-white shadow-xl">
            {/* Chest panel */}
            <div className="absolute top-4 left-3 w-16 h-12 bg-gradient-to-br from-gray-300 to-gray-500 rounded-lg" />
            {/* Control buttons */}
            <div className="absolute top-6 left-5 flex gap-1">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
            </div>
          </div>

          {/* Left Arm */}
          <div className="absolute top-24 -left-6 w-6 h-20 bg-gradient-to-br from-gray-200 to-gray-400 rounded-full border-2 border-white shadow-lg rotate-12" />

          {/* Right Arm */}
          <div className="absolute top-24 left-22 w-6 h-20 bg-gradient-to-br from-gray-200 to-gray-400 rounded-full border-2 border-white shadow-lg -rotate-12" />

          {/* Left Leg */}
          <div className="absolute top-44 left-4 w-8 h-16 bg-gradient-to-br from-gray-200 to-gray-400 rounded-full border-2 border-white shadow-lg" />

          {/* Right Leg */}
          <div className="absolute top-44 left-14 w-8 h-16 bg-gradient-to-br from-gray-200 to-gray-400 rounded-full border-2 border-white shadow-lg" />

          {/* Floating animation */}
          <style jsx>{`
            .astronaut-fallback {
              animation: float 6s ease-in-out infinite;
            }

            @keyframes float {
              0%,
              100% {
                transform: translateY(0) rotate(0deg);
              }
              25% {
                transform: translateY(-10px) rotate(2deg);
              }
              50% {
                transform: translateY(0) rotate(0deg);
              }
              75% {
                transform: translateY(-10px) rotate(-2deg);
              }
            }
          `}</style>
        </div>
      </div>
    </div>
  );
}

