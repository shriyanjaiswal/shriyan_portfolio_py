import { useEffect, useRef, useMemo, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial, Sphere, Box, Octahedron, Torus, Cone, Icosahedron } from "@react-three/drei";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import * as THREE from "three";

// Enhanced Particle System with Multiple Types
const EnhancedParticleSystem = ({ count = 4000 }) => {
  const mesh = useRef<THREE.Points>(null);
  const { viewport } = useThree();

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const velocities = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Create layered particle distribution
      const layer = Math.floor(i / (count / 3));
      const radius = (layer + 1) * 15 + Math.random() * 20;

      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      // Enhanced color system with gradients
      const colorVariant = Math.random();
      if (colorVariant < 0.3) {
        // Purple particles
        colors[i * 3] = 0.5 + Math.random() * 0.4;     // R
        colors[i * 3 + 1] = 0.2 + Math.random() * 0.3; // G
        colors[i * 3 + 2] = 0.8 + Math.random() * 0.2; // B
      } else if (colorVariant < 0.6) {
        // Pink particles
        colors[i * 3] = 0.8 + Math.random() * 0.2;     // R
        colors[i * 3 + 1] = 0.2 + Math.random() * 0.4; // G
        colors[i * 3 + 2] = 0.6 + Math.random() * 0.3; // B
      } else if (colorVariant < 0.8) {
        // Blue particles
        colors[i * 3] = 0.2 + Math.random() * 0.3;     // R
        colors[i * 3 + 1] = 0.4 + Math.random() * 0.4; // G
        colors[i * 3 + 2] = 0.9 + Math.random() * 0.1; // B
      } else {
        // Cyan particles
        colors[i * 3] = 0.1 + Math.random() * 0.2;     // R
        colors[i * 3 + 1] = 0.8 + Math.random() * 0.2; // G
        colors[i * 3 + 2] = 0.9 + Math.random() * 0.1; // B
      }

      sizes[i] = Math.random() * 0.8 + 0.3;

      // Individual particle velocities
      velocities[i * 3] = (Math.random() - 0.5) * 0.001;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.001;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.001;
    }

    return { positions, colors, sizes, velocities };
  }, [count]);

  useFrame((state) => {
    if (mesh.current) {
      const time = state.clock.elapsedTime;

      // Complex rotation system
      mesh.current.rotation.x = Math.sin(time * 0.08) * 0.03;
      mesh.current.rotation.y = time * 0.015;
      mesh.current.rotation.z = Math.sin(time * 0.06) * 0.02;

      // Dynamic particle movement
      const positions = mesh.current.geometry.attributes.position.array as Float32Array;
      const sizes = mesh.current.geometry.attributes.size.array as Float32Array;

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;

        // Floating motion with individual characteristics
        positions[i3] += Math.sin(time * 0.5 + i * 0.01) * 0.002;
        positions[i3 + 1] += Math.cos(time * 0.3 + i * 0.015) * 0.003;
        positions[i3 + 2] += Math.sin(time * 0.4 + i * 0.008) * 0.0015;

        // Pulsing size effect
        sizes[i] = (0.5 + Math.sin(time * 2 + i * 0.1) * 0.3) * particles.sizes[i];
      }

      mesh.current.geometry.attributes.position.needsUpdate = true;
      mesh.current.geometry.attributes.size.needsUpdate = true;
    }
  });

  return (
      <points ref={mesh}>
        <bufferGeometry>
          <bufferAttribute
              attach="attributes-position"
              count={count}
              array={particles.positions}
              itemSize={3}
          />
          <bufferAttribute
              attach="attributes-color"
              count={count}
              array={particles.colors}
              itemSize={3}
          />
          <bufferAttribute
              attach="attributes-size"
              count={count}
              array={particles.sizes}
              itemSize={1}
          />
        </bufferGeometry>
        <pointsMaterial
            size={0.012}
            vertexColors
            transparent
            opacity={0.7}
            sizeAttenuation
            blending={THREE.AdditiveBlending}
            depthWrite={false}
        />
      </points>
  );
};

// Enhanced 3D Floating Objects with Scale Animations
const Enhanced3DObjects = () => {
  const groupRef = useRef<THREE.Group>(null);

  const objects = useMemo(() => [
    { type: 'octahedron', position: [18, 8, -25], color: '#8b5cf6', baseScale: 1.2 },
    { type: 'box', position: [-15, -10, -20], color: '#ec4899', baseScale: 0.8 },
    { type: 'sphere', position: [12, -15, -30], color: '#3b82f6', baseScale: 1.0 },
    { type: 'torus', position: [-20, 12, -35], color: '#06b6d4', baseScale: 1.5 },
    { type: 'cone', position: [25, -8, -22], color: '#8b5cf6', baseScale: 1.1 },
    { type: 'icosahedron', position: [-12, 18, -28], color: '#ec4899', baseScale: 0.9 },
    { type: 'octahedron', position: [8, 12, -40], color: '#3b82f6', baseScale: 0.7 },
    { type: 'sphere', position: [-25, -5, -18], color: '#06b6d4', baseScale: 1.3 },
    { type: 'box', position: [15, 20, -32], color: '#8b5cf6', baseScale: 0.6 },
    { type: 'torus', position: [-8, -20, -15], color: '#ec4899', baseScale: 1.0 },
    { type: 'cone', position: [30, 5, -45], color: '#3b82f6', baseScale: 0.8 },
    { type: 'icosahedron', position: [-18, 8, -25], color: '#06b6d4', baseScale: 1.1 },
  ], []);

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime;

      // Group rotation and movement
      groupRef.current.rotation.y = time * 0.03;
      groupRef.current.rotation.x = Math.sin(time * 0.02) * 0.1;
      groupRef.current.position.y = Math.sin(time * 0.25) * 3;
      groupRef.current.position.z = Math.cos(time * 0.15) * 2;

      // Individual object animations
      groupRef.current.children.forEach((child, index) => {
        const mesh = child as THREE.Mesh;
        const obj = objects[index];
        const offset = index * 0.3;

        // Complex scale animation
        const scaleBase = obj.baseScale;
        const scalePrimary = 1 + Math.sin(time * 0.8 + offset) * 0.4;
        const scaleSecondary = 1 + Math.cos(time * 1.2 + offset * 1.5) * 0.2;
        const finalScale = scaleBase * scalePrimary * scaleSecondary;
        mesh.scale.setScalar(finalScale);

        // Multi-axis rotation
        mesh.rotation.x = time * (0.4 + index * 0.05);
        mesh.rotation.y = time * (0.3 + index * 0.08);
        mesh.rotation.z = time * (0.2 + index * 0.06);

        // Advanced floating motion
        const originalPos = obj.position;
        mesh.position.set(
            originalPos[0] + Math.sin(time * 0.5 + offset) * 2,
            originalPos[1] + Math.cos(time * 0.7 + offset * 1.2) * 3,
            originalPos[2] + Math.sin(time * 0.3 + offset * 0.8) * 1.5
        );

        // Opacity pulsing
        if (mesh.material instanceof THREE.MeshBasicMaterial) {
          mesh.material.opacity = 0.2 + Math.sin(time * 1.5 + offset) * 0.15;
        }
      });
    }
  });

  return (
      <group ref={groupRef}>
        {objects.map((obj, index) => {
          let GeometryComponent;
          let args: any = [1];

          switch (obj.type) {
            case 'octahedron':
              GeometryComponent = Octahedron;
              break;
            case 'box':
              GeometryComponent = Box;
              args = [1, 1, 1];
              break;
            case 'sphere':
              GeometryComponent = Sphere;
              args = [1, 32, 32];
              break;
            case 'torus':
              GeometryComponent = Torus;
              args = [1, 0.4, 16, 32];
              break;
            case 'cone':
              GeometryComponent = Cone;
              args = [1, 2, 8];
              break;
            case 'icosahedron':
              GeometryComponent = Icosahedron;
              break;
            default:
              GeometryComponent = Octahedron;
          }

          return (
              <GeometryComponent
                  key={index}
                  position={obj.position as [number, number, number]}
                  args={args}
              >
                <meshBasicMaterial
                    color={obj.color}
                    wireframe
                    transparent
                    opacity={0.3}
                />
              </GeometryComponent>
          );
        })}
      </group>
  );
};

// Particle Constellation System
const ParticleConstellations = () => {
  const meshRef = useRef<THREE.Points>(null);

  const constellation = useMemo(() => {
    const positions = new Float32Array(200 * 3);
    const colors = new Float32Array(200 * 3);

    for (let i = 0; i < 200; i++) {
      // Create constellation patterns
      const angle = (i / 200) * Math.PI * 4;
      const radius = 20 + Math.sin(i * 0.1) * 10;

      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = Math.sin(angle) * radius + Math.sin(i * 0.2) * 5;
      positions[i * 3 + 2] = Math.sin(i * 0.15) * 15 - 20;

      // Bright constellation colors
      colors[i * 3] = 0.9 + Math.random() * 0.1;
      colors[i * 3 + 1] = 0.8 + Math.random() * 0.2;
      colors[i * 3 + 2] = 1.0;
    }

    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      meshRef.current.rotation.z = time * 0.05;

      // Pulsing effect
      const material = meshRef.current.material as THREE.PointsMaterial;
      material.opacity = 0.4 + Math.sin(time * 2) * 0.2;
    }
  });

  return (
      <points ref={meshRef}>
        <bufferGeometry>
          <bufferAttribute
              attach="attributes-position"
              count={200}
              array={constellation.positions}
              itemSize={3}
          />
          <bufferAttribute
              attach="attributes-color"
              count={200}
              array={constellation.colors}
              itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
            size={0.02}
            vertexColors
            transparent
            opacity={0.6}
            sizeAttenuation
            blending={THREE.AdditiveBlending}
        />
      </points>
  );
};

// CSS Floating Particles Overlay
const FloatingCSSParticles = () => {
  const particles = useMemo(() => {
    return Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 2,
      duration: Math.random() * 25 + 15,
      delay: Math.random() * 8,
      color: i % 4 === 0 ? 'from-purple-400/40 to-pink-400/40' :
          i % 4 === 1 ? 'from-blue-400/40 to-cyan-400/40' :
              i % 4 === 2 ? 'from-pink-400/40 to-purple-400/40' :
                  'from-cyan-400/40 to-blue-400/40',
    }));
  }, []);

  return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
            <motion.div
                key={particle.id}
                className={`absolute rounded-full bg-gradient-to-r ${particle.color} blur-sm`}
                style={{
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                }}
                animate={{
                  y: [-30, -120],
                  x: [0, Math.sin(particle.id) * 50],
                  opacity: [0, 1, 1, 0],
                  scale: [0.3, 1, 1.2, 0.3],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: particle.duration,
                  repeat: Infinity,
                  delay: particle.delay,
                  ease: "linear",
                }}
            />
        ))}
      </div>
  );
};

const ParallaxBackground = () => {
  const { scrollYProgress } = useScroll();
  const [canvasLoaded, setCanvasLoaded] = useState(false);

  // Enhanced parallax transforms with spring animations
  const y1 = useSpring(useTransform(scrollYProgress, [0, 1], [0, -80]), {
    stiffness: 100,
    damping: 30,
  });
  const y2 = useSpring(useTransform(scrollYProgress, [0, 1], [0, -120]), {
    stiffness: 100,
    damping: 30,
  });
  const y3 = useSpring(useTransform(scrollYProgress, [0, 1], [0, -160]), {
    stiffness: 100,
    damping: 30,
  });
  const y4 = useSpring(useTransform(scrollYProgress, [0, 1], [0, -200]), {
    stiffness: 100,
    damping: 30,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setCanvasLoaded(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
      <div className="fixed inset-0 z-0">
        {/* Primary Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900" />

        {/* Enhanced Animated Gradient Layers */}
        <motion.div
            style={{ y: y1 }}
            className="absolute inset-0 bg-gradient-to-t from-transparent via-purple-500/8 to-pink-500/8"
        />

        <motion.div
            style={{ y: y2 }}
            className="absolute inset-0 bg-gradient-to-br from-blue-500/4 via-transparent to-purple-500/4"
        />

        <motion.div
            style={{ y: y3 }}
            className="absolute inset-0 bg-gradient-to-tl from-pink-500/3 via-transparent to-cyan-500/3"
        />

        {/* Enhanced Parallax Shapes with Scale Animations */}
        <motion.div
            style={{ y: y4 }}
            className="absolute inset-0 opacity-25"
        >
          <motion.div
              animate={{
                scale: [1, 1.3, 1],
                rotate: [0, 8, 0],
                x: [0, 20, 0],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-r from-purple-400/35 to-pink-400/35 rounded-full blur-2xl"
          />

          <motion.div
              animate={{
                scale: [1.2, 1, 1.2],
                rotate: [0, -5, 0],
                y: [0, 30, 0],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-60 right-32 w-56 h-56 bg-gradient-to-r from-blue-400/25 to-purple-400/25 rounded-full blur-3xl"
          />

          <motion.div
              animate={{
                scale: [1, 1.4, 1],
                rotate: [0, 3, 0],
                x: [0, -25, 0],
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute bottom-32 left-1/3 w-72 h-72 bg-gradient-to-r from-pink-400/20 to-purple-400/20 rounded-full blur-3xl"
          />

          <motion.div
              animate={{
                scale: [1.1, 1, 1.1],
                rotate: [0, -6, 0],
                y: [0, -40, 0],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-1/2 right-16 w-48 h-48 bg-gradient-to-r from-cyan-400/30 to-blue-400/30 rounded-full blur-2xl"
          />

          <motion.div
              animate={{
                scale: [1, 1.25, 1],
                rotate: [0, 4, 0],
                x: [0, 35, 0],
              }}
              transition={{
                duration: 14,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute bottom-20 right-1/4 w-60 h-60 bg-gradient-to-r from-purple-400/25 to-cyan-400/25 rounded-full blur-3xl"
          />
        </motion.div>

        {/* CSS Floating Particles */}
        <FloatingCSSParticles />

        {/* Enhanced 3D Canvas */}
        {canvasLoaded && (
            <div className="absolute inset-0">
              <Canvas
                  camera={{ position: [0, 0, 1], fov: 85 }}
                  dpr={[1, 2]}
                  performance={{ min: 0.5 }}
                  gl={{
                    antialias: window.devicePixelRatio === 1,
                    alpha: true,
                    powerPreference: "high-performance",
                    stencil: false,
                    depth: false,
                  }}
              >
                {/* Enhanced lighting */}
                <ambientLight intensity={0.15} />
                <pointLight position={[20, 20, 20]} intensity={0.4} color="#8b5cf6" />
                <pointLight position={[-20, -20, 20]} intensity={0.4} color="#ec4899" />
                <pointLight position={[0, 0, 30]} intensity={0.3} color="#3b82f6" />

                {/* Atmospheric fog */}
                <fog attach="fog" args={['#1a1a2e', 40, 80]} />

                {/* Particle systems */}
                <EnhancedParticleSystem count={3000} />

                {/* 3D floating objects */}
                <Enhanced3DObjects />

                {/* Particle constellations */}
                <ParticleConstellations />
              </Canvas>
            </div>
        )}

        {/* Enhanced noise texture overlay */}
        <div
            className="absolute inset-0 opacity-[0.02] mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 600 600' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              backgroundSize: '300px 300px',
            }}
        />

        {/* Content readability overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/5 pointer-events-none" />
      </div>
  );
};

export default ParallaxBackground;