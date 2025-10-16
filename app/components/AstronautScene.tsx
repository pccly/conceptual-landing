"use client";

import { useRef, useEffect, Suspense, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { SCENE_CONFIG } from "../constants/scene";
import { detectWebGLSupport } from "../utils/webgl";
import AstronautFallback from "./AstronautFallback";

// Preload the model for better performance
useGLTF.preload(SCENE_CONFIG.astronaut.modelPath);

interface AstronautProps {
  scrollProgress: number;
}

function Astronaut({ scrollProgress }: AstronautProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(SCENE_CONFIG.astronaut.modelPath);

  // Ensure materials render correctly and set initial position
  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          if (mesh.material) {
            // Handle both single material and array of materials
            if (Array.isArray(mesh.material)) {
              mesh.material.forEach((mat) => {
                mat.needsUpdate = true;
              });
            } else {
              mesh.material.needsUpdate = true;
            }
          }
        }
      });
    }
    
    // Set initial position immediately when model loads
    if (groupRef.current) {
      const { startPosition } = SCENE_CONFIG.astronaut;
      groupRef.current.position.x = startPosition.x;
      groupRef.current.position.y = startPosition.y;
      groupRef.current.position.z = 0;
    }
  }, [scene]);

  // Animate based on scroll and time
  useFrame((state) => {
    if (!groupRef.current) return;

    const { startPosition, endPosition, rotation } = SCENE_CONFIG.astronaut;

    // Smooth scroll-based position with easing to prevent flickering
    const targetX = startPosition.x + (endPosition.x - startPosition.x) * scrollProgress;
    const targetY = startPosition.y + (endPosition.y - startPosition.y) * scrollProgress;
    
    // Smooth interpolation to prevent flickering at boundaries
    const lerpFactor = 0.2; // Increased for better responsiveness while maintaining smoothness
    groupRef.current.position.x += (targetX - groupRef.current.position.x) * lerpFactor;
    groupRef.current.position.y += (targetY - groupRef.current.position.y) * lerpFactor;

    // Time-based rotation for floating effect using frame clock
    const time = state.clock.getElapsedTime() * 1000; // Convert to milliseconds
    groupRef.current.rotation.y += rotation.ySpeed;
    groupRef.current.rotation.x =
      Math.sin(time * rotation.xFrequency) * rotation.xAmplitude;
    groupRef.current.rotation.z =
      Math.cos(time * rotation.zFrequency) * rotation.zAmplitude;
  });

  return (
    <group 
      ref={groupRef}
      position={[SCENE_CONFIG.astronaut.startPosition.x, SCENE_CONFIG.astronaut.startPosition.y, 0]}
    >
      <primitive object={scene} scale={SCENE_CONFIG.astronaut.scale} />
    </group>
  );
}

function LoadingFallback() {
  return (
    <mesh>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color="#ffffff" metalness={0.8} roughness={0.2} />
    </mesh>
  );
}

export default function AstronautScene({ scrollProgress }: AstronautProps) {
  const [webglSupported, setWebglSupported] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    // Detect WebGL support on mount
    const { supported, reason } = detectWebGLSupport();
    setWebglSupported(supported);
    if (!supported && reason) {
      setErrorMessage(reason);
      console.info(`WebGL not available (${reason}). Using optimized CSS animation instead.`);
    } else if (supported) {
      console.info("WebGL detected. 3D scene enabled.");
    }
  }, []);

  // Always render the CSS fallback initially to prevent hydration mismatch
  // The WebGL scene will be rendered once WebGL support is confirmed
  if (webglSupported === null || !webglSupported) {
    return <AstronautFallback scrollProgress={scrollProgress} />;
  }

  // Render WebGL scene
  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      <Canvas
        onCreated={({ gl }) => {
          // Additional runtime check for context loss
          gl.domElement.addEventListener("webglcontextlost", (event) => {
            event.preventDefault();
            console.warn("WebGL context lost. Gracefully falling back to CSS animation.");
            setWebglSupported(false);
          });
          
          // Handle context restoration
          gl.domElement.addEventListener("webglcontextrestored", () => {
            console.info("WebGL context restored. Re-enabling 3D scene.");
            setWebglSupported(true);
          });
        }}
      >
        <PerspectiveCamera
          makeDefault
          position={SCENE_CONFIG.camera.position}
        />

        {/* Lighting setup */}
        <ambientLight intensity={SCENE_CONFIG.lighting.ambient.intensity} />
        {SCENE_CONFIG.lighting.directional.map((light, index) => (
          <directionalLight
            key={`directional-${index}`}
            position={light.position}
            intensity={light.intensity}
          />
        ))}
        <pointLight
          position={SCENE_CONFIG.lighting.point.position}
          intensity={SCENE_CONFIG.lighting.point.intensity}
        />

        {/* Astronaut model with fallback */}
        <Suspense fallback={<LoadingFallback />}>
          <Astronaut scrollProgress={scrollProgress} />
        </Suspense>
      </Canvas>
    </div>
  );
}
