/**
 * 3D Scene configuration for the astronaut animation
 */
export const SCENE_CONFIG = {
  astronaut: {
    modelPath: '/astronaut.gltf',
    scale: 0.5,
    startPosition: { x: 2.5, y: 1.5 },
    endPosition: { x: -2.5, y: -2 },
    rotation: {
      ySpeed: 0.005,
      xAmplitude: 0.2,
      xFrequency: 0.0003,
      zAmplitude: 0.2,
      zFrequency: 0.0004,
    },
  },
  camera: {
    position: [0, 0, 10] as [number, number, number],
  },
  lighting: {
    ambient: { intensity: 0.8 },
    directional: [
      { position: [10, 10, 5] as [number, number, number], intensity: 1.5 },
      { position: [-10, -10, -5] as [number, number, number], intensity: 0.5 },
    ],
    point: { position: [0, 5, 5] as [number, number, number], intensity: 1 },
  },
} as const;

