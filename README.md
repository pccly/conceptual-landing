# Conceptual Landing

A modern, interactive landing page featuring a 3D astronaut scene with scroll-based animations and dynamic color transitions.

## Features

- **3D Astronaut Scene** - Interactive 3D astronaut model rendered with Three.js and React Three Fiber
- **GPU Fallback Support** - Automatic detection of WebGL/GPU availability with graceful CSS-based fallback
- **Scroll-Based Animations** - Smooth GSAP animations triggered by scroll progress
- **Dynamic Color Transitions** - Background colors transition smoothly as you scroll through sections
- **Twinkling Stars** - Animated starfield background with periodic light effects
- **Responsive Design** - Optimized for all screen sizes with Tailwind CSS
- **Performance Optimized** - Built with Next.js 15 and React 19 for optimal performance

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org) with App Router and Turbopack
- **UI**: [React 19](https://react.dev) with TypeScript
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com)
- **3D Graphics**: [Three.js](https://threejs.org), [React Three Fiber](https://docs.pmnd.rs/react-three-fiber), [@react-three/drei](https://github.com/pmndrs/drei)
- **Animations**: [GSAP](https://gsap.com)
- **Code Quality**: [Biome](https://biomejs.dev) for linting and formatting

## Getting Started

### Prerequisites

- Node.js 20 or higher
- pnpm (install with `npm install -g pnpm` or `brew install pnpm`)

### Installation

```bash
# Install dependencies
pnpm install
```

### Development

```bash
# Start the development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

### Build

```bash
# Create a production build
pnpm build

# Start the production server
pnpm start
```

### Code Quality

```bash
# Check code with Biome
pnpm lint

# Format code with Biome
pnpm format
```

## Project Structure

```
conceptual-landing/
├── app/
│   ├── components/        # React components
│   │   ├── AstronautScene.tsx
│   │   ├── ErrorBoundary.tsx
│   │   ├── LoadingScreen.tsx
│   │   ├── Logo.tsx
│   │   └── Stars.tsx
│   ├── constants/         # Configuration constants
│   │   ├── animations.ts
│   │   ├── scene.ts
│   │   └── sections.ts
│   ├── hooks/            # Custom React hooks
│   │   ├── useColorTransition.ts
│   │   ├── useGsapAnimations.ts
│   │   ├── useScrollProgress.ts
│   │   └── useScrollToTop.ts
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Utility functions
│   │   ├── colors.ts
│   │   ├── scroll.ts
│   │   └── stars.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── public/               # Static assets
│   ├── astronaut.gltf   # 3D astronaut model
│   └── scene.bin        # Binary data for 3D model
└── ...config files
```

## Key Components

- **AstronautScene**: Renders the 3D astronaut with lighting and camera controls, includes WebGL detection
- **AstronautFallback**: CSS-based fallback astronaut for browsers without GPU acceleration
- **Stars**: Creates an animated starfield background with twinkling light effects
- **LoadingScreen**: Displays while 3D assets are loading
- **ErrorBoundary**: Gracefully handles rendering errors

## Browser Compatibility

The application automatically detects WebGL and GPU acceleration support:

- **WebGL Available**: Full 3D astronaut scene with Three.js rendering
- **No GPU Acceleration**: Graceful fallback to CSS-based animated astronaut
- **Context Loss Handling**: Automatic fallback if GPU context is lost during runtime

The detection checks for:
- WebGL availability
- Hardware vs. software rendering
- GPU context loss events

## Custom Hooks

- **useScrollProgress**: Tracks scroll position and progress through sections
- **useGsapAnimations**: Manages GSAP-based scroll animations
- **useColorTransition**: Handles smooth background color transitions
- **useScrollToTop**: Provides smooth scroll to top functionality

## License

This project is private and not licensed for public use.
