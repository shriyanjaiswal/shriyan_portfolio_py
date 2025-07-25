import { useEffect, useRef, useMemo, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial, Sphere, Box, Octahedron, Torus, Cone, Icosahedron } from "@react-three/drei";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import * as THREE from "three";

// Enhanced Particle System with Performance Optimizations
const EnhancedParticleSystem = ({ count = 3000 }) => {
    const mesh = useRef<THREE.Points>(null);
    const { viewport } = useThree();

    const particles = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const sizes = new Float32Array(count);
        const velocities = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            // Create layered particle distribution for better depth
            const layer = Math.floor(i / (count / 4));
            const radius = (layer + 1) * 12 + Math.random() * 15;

            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(Math.random() * 2 - 1);

            positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = radius * Math.cos(phi);

            // Enhanced color system with darker theme colors
            const colorVariant = Math.random();
            if (colorVariant < 0.25) {
                // Deep purple particles
                colors[i * 3] = 0.4 + Math.random() * 0.3;     // R
                colors[i * 3 + 1] = 0.1 + Math.random() * 0.2; // G
                colors[i * 3 + 2] = 0.7 + Math.random() * 0.3; // B
            } else if (colorVariant < 0.5) {
                // Deep pink particles
                colors[i * 3] = 0.6 + Math.random() * 0.3;     // R
                colors[i * 3 + 1] = 0.1 + Math.random() * 0.2; // G
                colors[i * 3 + 2] = 0.5 + Math.random() * 0.3; // B
            } else if (colorVariant < 0.75) {
                // Deep blue particles
                colors[i * 3] = 0.1 + Math.random() * 0.2;     // R
                colors[i * 3 + 1] = 0.2 + Math.random() * 0.3; // G
                colors[i * 3 + 2] = 0.8 + Math.random() * 0.2; // B
            } else {
                // Deep cyan particles
                colors[i * 3] = 0.05 + Math.random() * 0.15;   // R
                colors[i * 3 + 1] = 0.6 + Math.random() * 0.3; // G
                colors[i * 3 + 2] = 0.8 + Math.random() * 0.2; // B
            }

            sizes[i] = Math.random() * 0.6 + 0.2;

            // Individual particle velocities
            velocities[i * 3] = (Math.random() - 0.5) * 0.0008;
            velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.0008;
            velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.0008;
        }

        return { positions, colors, sizes, velocities };
    }, [count]);

    useFrame((state) => {
        if (mesh.current) {
            const time = state.clock.elapsedTime;

            // Slower, more elegant rotation
            mesh.current.rotation.x = Math.sin(time * 0.05) * 0.02;
            mesh.current.rotation.y = time * 0.01;
            mesh.current.rotation.z = Math.sin(time * 0.04) * 0.015;

            // Subtle particle movement
            const positions = mesh.current.geometry.attributes.position.array as Float32Array;
            const sizes = mesh.current.geometry.attributes.size.array as Float32Array;

            for (let i = 0; i < count; i++) {
                const i3 = i * 3;

                // Gentle floating motion
                positions[i3] += Math.sin(time * 0.3 + i * 0.008) * 0.001;
                positions[i3 + 1] += Math.cos(time * 0.2 + i * 0.01) * 0.0015;
                positions[i3 + 2] += Math.sin(time * 0.25 + i * 0.006) * 0.0008;

                // Subtle pulsing effect
                sizes[i] = (0.6 + Math.sin(time * 1.5 + i * 0.08) * 0.2) * particles.sizes[i];
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
                size={0.008}
                vertexColors
                transparent
                opacity={0.8}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </points>
    );
};

// Enhanced 3D Floating Objects with Dark Theme Colors
const Enhanced3DObjects = () => {
    const groupRef = useRef<THREE.Group>(null);

    const objects = useMemo(() => [
        { type: 'octahedron', position: [15, 6, -20], color: '#6d28d9', baseScale: 1.0 },
        { type: 'box', position: [-12, -8, -18], color: '#be185d', baseScale: 0.7 },
        { type: 'sphere', position: [10, -12, -25], color: '#1e40af', baseScale: 0.8 },
        { type: 'torus', position: [-16, 10, -30], color: '#0e7490', baseScale: 1.2 },
        { type: 'cone', position: [20, -6, -18], color: '#7c3aed', baseScale: 0.9 },
        { type: 'icosahedron', position: [-10, 15, -22], color: '#c2410c', baseScale: 0.6 },
        { type: 'octahedron', position: [6, 9, -35], color: '#1d4ed8', baseScale: 0.5 },
        { type: 'sphere', position: [-20, -4, -15], color: '#0891b2', baseScale: 1.1 },
        { type: 'box', position: [12, 16, -28], color: '#7c2d12', baseScale: 0.4 },
        { type: 'torus', position: [-6, -16, -12], color: '#be123c', baseScale: 0.8 },
    ], []);

    useFrame((state) => {
        if (groupRef.current) {
            const time = state.clock.elapsedTime;

            // Gentle group movement
            groupRef.current.rotation.y = time * 0.02;
            groupRef.current.rotation.x = Math.sin(time * 0.015) * 0.05;
            groupRef.current.position.y = Math.sin(time * 0.2) * 2;
            groupRef.current.position.z = Math.cos(time * 0.1) * 1;

            // Individual object animations
            groupRef.current.children.forEach((child, index) => {
                const mesh = child as THREE.Mesh;
                const obj = objects[index];
                const offset = index * 0.25;

                // Gentle scale animation
                const scaleBase = obj.baseScale;
                const scalePrimary = 1 + Math.sin(time * 0.6 + offset) * 0.2;
                const scaleSecondary = 1 + Math.cos(time * 0.8 + offset * 1.2) * 0.1;
                const finalScale = scaleBase * scalePrimary * scaleSecondary;
                mesh.scale.setScalar(finalScale);

                // Slower rotation
                mesh.rotation.x = time * (0.2 + index * 0.03);
                mesh.rotation.y = time * (0.15 + index * 0.04);
                mesh.rotation.z = time * (0.1 + index * 0.03);

                // Gentle floating motion
                const originalPos = obj.position;
                mesh.position.set(
                    originalPos[0] + Math.sin(time * 0.3 + offset) * 1.5,
                    originalPos[1] + Math.cos(time * 0.4 + offset * 1.1) * 2,
                    originalPos[2] + Math.sin(time * 0.2 + offset * 0.6) * 1
                );

                // Subtle opacity changes
                if (mesh.material instanceof THREE.MeshBasicMaterial) {
                    mesh.material.opacity = 0.15 + Math.sin(time * 1.2 + offset) * 0.1;
                }
            });
        }
    });

    return (
        <group ref={groupRef}>
            {objects.map((obj, index) => {
                let GeometryComponent;
                let args: any = [0.8];

                switch (obj.type) {
                    case 'octahedron':
                        GeometryComponent = Octahedron;
                        break;
                    case 'box':
                        GeometryComponent = Box;
                        args = [0.8, 0.8, 0.8];
                        break;
                    case 'sphere':
                        GeometryComponent = Sphere;
                        args = [0.8, 24, 24];
                        break;
                    case 'torus':
                        GeometryComponent = Torus;
                        args = [0.8, 0.3, 12, 24];
                        break;
                    case 'cone':
                        GeometryComponent = Cone;
                        args = [0.8, 1.6, 6];
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
                            opacity={0.25}
                        />
                    </GeometryComponent>
                );
            })}
        </group>
    );
};

// Enhanced CSS Floating Particles with Dark Theme
const FloatingCSSParticles = () => {
    const particles = useMemo(() => {
        return Array.from({ length: 60 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 4 + 1,
            duration: Math.random() * 20 + 12,
            delay: Math.random() * 6,
            color: i % 4 === 0 ? 'from-purple-600/30 to-purple-800/30' :
                i % 4 === 1 ? 'from-blue-600/30 to-blue-800/30' :
                    i % 4 === 2 ? 'from-pink-600/30 to-pink-800/30' :
                        'from-cyan-600/30 to-cyan-800/30',
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
                        y: [-20, -80],
                        x: [0, Math.sin(particle.id) * 30],
                        opacity: [0, 0.8, 0.8, 0],
                        scale: [0.2, 1, 1.1, 0.2],
                        rotate: [0, 180],
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
    const [isLowPerformance, setIsLowPerformance] = useState(false);

    // Performance detection
    useEffect(() => {
        const checkPerformance = () => {
            const userAgent = navigator.userAgent.toLowerCase();
            const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
            const isSlowDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;

            setIsLowPerformance(isMobile || isSlowDevice);
        };

        checkPerformance();
    }, []);

    // Enhanced parallax transforms with spring animations
    const y1 = useSpring(useTransform(scrollYProgress, [0, 1], [0, -60]), {
        stiffness: 100,
        damping: 30,
    });
    const y2 = useSpring(useTransform(scrollYProgress, [0, 1], [0, -90]), {
        stiffness: 100,
        damping: 30,
    });
    const y3 = useSpring(useTransform(scrollYProgress, [0, 1], [0, -120]), {
        stiffness: 100,
        damping: 30,
    });
    const y4 = useSpring(useTransform(scrollYProgress, [0, 1], [0, -150]), {
        stiffness: 100,
        damping: 30,
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            setCanvasLoaded(true);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="fixed inset-0 z-0">
            {/* Enhanced Dark Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-purple-950 to-gray-950" />

            {/* Enhanced Animated Gradient Layers */}
            <motion.div
                style={{ y: y1 }}
                className="absolute inset-0 bg-gradient-to-t from-transparent via-purple-900/12 to-purple-800/8"
            />

            <motion.div
                style={{ y: y2 }}
                className="absolute inset-0 bg-gradient-to-br from-blue-900/8 via-transparent to-purple-900/8"
            />

            <motion.div
                style={{ y: y3 }}
                className="absolute inset-0 bg-gradient-to-tl from-pink-900/6 via-transparent to-cyan-900/6"
            />

            {/* Enhanced Parallax Shapes with Darker Colors */}
            <motion.div
                style={{ y: y4 }}
                className="absolute inset-0 opacity-20"
            >
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 6, 0],
                        x: [0, 15, 0],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-purple-800/25 to-purple-600/25 rounded-full blur-2xl"
                />

                <motion.div
                    animate={{
                        scale: [1.1, 1, 1.1],
                        rotate: [0, -4, 0],
                        y: [0, 20, 0],
                    }}
                    transition={{
                        duration: 18,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute top-60 right-32 w-44 h-44 bg-gradient-to-r from-blue-800/20 to-purple-800/20 rounded-full blur-3xl"
                />

                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        rotate: [0, 2, 0],
                        x: [0, -20, 0],
                    }}
                    transition={{
                        duration: 22,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute bottom-32 left-1/3 w-56 h-56 bg-gradient-to-r from-pink-800/15 to-purple-800/15 rounded-full blur-3xl"
                />

                <motion.div
                    animate={{
                        scale: [1.05, 1, 1.05],
                        rotate: [0, -5, 0],
                        y: [0, -30, 0],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute top-1/2 right-16 w-36 h-36 bg-gradient-to-r from-cyan-800/25 to-blue-800/25 rounded-full blur-2xl"
                />
            </motion.div>

            {/* CSS Floating Particles */}
            <FloatingCSSParticles />

            {/* Enhanced 3D Canvas with Performance Optimizations */}
            {canvasLoaded && !isLowPerformance && (
                <div className="absolute inset-0">
                    <Canvas
                        camera={{ position: [0, 0, 1], fov: 75 }}
                        dpr={[1, Math.min(window.devicePixelRatio, 2)]}
                        performance={{ min: 0.5 }}
                        gl={{
                            antialias: false,
                            alpha: true,
                            powerPreference: "high-performance",
                            stencil: false,
                            depth: false,
                        }}
                    >
                        {/* Enhanced lighting for dark theme */}
                        <ambientLight intensity={0.1} />
                        <pointLight position={[15, 15, 15]} intensity={0.3} color="#6d28d9" />
                        <pointLight position={[-15, -15, 15]} intensity={0.3} color="#be185d" />
                        <pointLight position={[0, 0, 25]} intensity={0.2} color="#1e40af" />

                        {/* Atmospheric fog for depth */}
                        <fog attach="fog" args={['#0a0a0f', 35, 70]} />

                        {/* Particle systems */}
                        <EnhancedParticleSystem count={isLowPerformance ? 1500 : 2500} />

                        {/* 3D floating objects */}
                        <Enhanced3DObjects />
                    </Canvas>
                </div>
            )}

            {/* Fallback for low performance devices */}
            {isLowPerformance && (
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-pink-900/20" />
                </div>
            )}

            {/* Enhanced noise texture overlay */}
            <div
                className="absolute inset-0 opacity-[0.015] mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 600 600' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    backgroundSize: '250px 250px',
                }}
            />

            {/* Content readability overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10 pointer-events-none" />
        </div>
    );
};

export default ParallaxBackground;