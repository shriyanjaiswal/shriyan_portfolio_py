import { ReactNode, forwardRef } from "react";
import { motion, MotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps extends MotionProps {
    children: ReactNode;
    className?: string;
    hover?: boolean;
    variant?: 'default' | 'gradient' | 'minimal' | 'premium' | 'neon' | 'dark' | 'cosmic';
    size?: 'sm' | 'md' | 'lg' | 'xl';
    glow?: boolean;
    interactive?: boolean;
    disabled?: boolean;
    loading?: boolean;
    intensity?: 'light' | 'medium' | 'heavy';
}

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(({
                                                                  children,
                                                                  className,
                                                                  hover = true,
                                                                  variant = 'default',
                                                                  size = 'md',
                                                                  glow = false,
                                                                  interactive = true,
                                                                  disabled = false,
                                                                  loading = false,
                                                                  intensity = 'medium',
                                                                  ...motionProps
                                                              }, ref) => {

    // Size variants
    const sizeVariants = {
        sm: "p-3 rounded-lg",
        md: "p-4 rounded-xl",
        lg: "p-6 rounded-2xl",
        xl: "p-8 rounded-3xl"
    };

    // Enhanced card style variants for dark theme
    const styleVariants = {
        default: "backdrop-blur-xl bg-gray-900/40 border border-white/10",
        gradient: "backdrop-blur-xl bg-gradient-to-br from-gray-900/50 via-purple-900/30 to-gray-900/50 border border-purple-500/20",
        minimal: "backdrop-blur-lg bg-gray-900/20 border border-white/5",
        premium: "backdrop-blur-2xl bg-gradient-to-br from-purple-900/40 via-gray-900/60 to-pink-900/40 border border-purple-500/30",
        neon: "backdrop-blur-xl bg-gradient-to-br from-cyan-900/30 to-purple-900/30 border border-cyan-400/40",
        dark: "backdrop-blur-2xl bg-gray-950/60 border border-gray-700/50",
        cosmic: "backdrop-blur-2xl bg-gradient-to-br from-indigo-900/40 via-purple-900/50 to-pink-900/40 border border-purple-400/30"
    };

    // Enhanced glow effects for dark theme
    const glowVariants = {
        default: "shadow-2xl shadow-purple-500/10",
        gradient: "shadow-2xl shadow-purple-500/20",
        minimal: "shadow-lg shadow-gray-900/20",
        premium: "shadow-2xl shadow-purple-500/30",
        neon: "shadow-2xl shadow-cyan-400/25",
        dark: "shadow-2xl shadow-black/40",
        cosmic: "shadow-2xl shadow-purple-400/25"
    };

    // Enhanced hover effects
    const hoverVariants = {
        default: "hover:border-white/20 hover:bg-gray-900/60",
        gradient: "hover:border-purple-500/40 hover:from-gray-900/70 hover:to-gray-900/70",
        minimal: "hover:border-white/10 hover:bg-gray-900/30",
        premium: "hover:border-purple-500/50 hover:shadow-purple-500/40",
        neon: "hover:border-cyan-400/60 hover:shadow-cyan-400/40",
        dark: "hover:border-gray-600/60 hover:bg-gray-950/80",
        cosmic: "hover:border-purple-400/50 hover:shadow-purple-400/30"
    };

    // Intensity modifiers
    const intensityModifiers = {
        light: "backdrop-blur-sm",
        medium: "backdrop-blur-xl",
        heavy: "backdrop-blur-3xl"
    };

    // Animation variants
    const animationVariants = {
        initial: {
            opacity: 0,
            scale: 0.95,
            y: 20,
            rotateX: 5
        },
        animate: {
            opacity: 1,
            scale: 1,
            y: 0,
            rotateX: 0,
            transition: {
                duration: 0.4,
                ease: [0.25, 0.1, 0.25, 1]
            }
        },
        hover: interactive && hover ? {
            scale: 1.02,
            y: -8,
            rotateX: 2,
            transition: {
                duration: 0.3,
                ease: "easeOut"
            }
        } : {},
        tap: interactive ? {
            scale: 0.98,
            transition: {
                duration: 0.1
            }
        } : {}
    };

    const baseClasses = cn(
        // Base styles with intensity
        styleVariants[variant],
        sizeVariants[size],
        intensityModifiers[intensity],

        // Shadows and glow
        glow ? glowVariants[variant] : "shadow-xl shadow-black/20",

        // Hover effects
        hover && interactive && !disabled && hoverVariants[variant],

        // Interactive states
        interactive && !disabled && "cursor-pointer",
        disabled && "opacity-50 cursor-not-allowed",

        // Transitions
        "transition-all duration-300 ease-out",

        // Transform optimizations
        "transform-gpu will-change-transform",

        // Enhanced dark theme specific styles
        "relative overflow-hidden",

        // Custom classes
        className
    );

    // Loading overlay
    const LoadingOverlay = () => (
        <div className="absolute inset-0 backdrop-blur-sm bg-black/40 rounded-inherit flex items-center justify-center z-10">
            <div className="flex space-x-1">
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        className="w-3 h-3 bg-purple-400 rounded-full"
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.7, 1, 0.7],
                        }}
                        transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            delay: i * 0.2,
                        }}
                    />
                ))}
            </div>
        </div>
    );

    // Enhanced shimmer effect
    const ShimmerEffect = () => (
        <div className="absolute inset-0 rounded-inherit overflow-hidden">
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400/20 to-transparent"
                animate={{
                    x: [-100, 100],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                }}
                style={{
                    width: "200%",
                    height: "100%",
                }}
            />
        </div>
    );

    // Cosmic animation for cosmic variant
    const CosmicAnimation = () => (
        <div className="absolute inset-0 rounded-inherit overflow-hidden pointer-events-none">
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400/10 to-transparent"
                animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />
        </div>
    );

    const cardContent = (
        <div className={cn(baseClasses, "relative overflow-hidden group")} ref={ref}>
            {/* Background patterns for different variants */}
            {variant === 'premium' && (
                <div className="absolute inset-0 opacity-20">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 70%)`,
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5" />
                </div>
            )}

            {variant === 'cosmic' && (
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-400/20 via-transparent to-pink-400/20" />
                    <CosmicAnimation />
                </div>
            )}

            {/* Enhanced neon glow effect */}
            {variant === 'neon' && glow && (
                <div className="absolute inset-0 rounded-inherit">
                    <div className="absolute inset-0 rounded-inherit bg-gradient-to-r from-cyan-400/20 to-purple-400/20 blur-xl animate-pulse" />
                    <div className="absolute inset-0 rounded-inherit bg-gradient-to-r from-cyan-400/10 to-purple-400/10 blur-2xl" />
                </div>
            )}

            {/* Inner glow border */}
            <div className="absolute inset-0 rounded-inherit border border-white/5 pointer-events-none" />

            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>

            {/* Loading states */}
            {loading && <LoadingOverlay />}
            {loading && (variant === 'premium' || variant === 'cosmic') && <ShimmerEffect />}

            {/* Enhanced hover shine effect */}
            {hover && interactive && !disabled && (
                <div className="absolute inset-0 rounded-inherit overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                        initial={{ x: "-100%" }}
                        whileHover={{
                            x: "100%",
                            transition: {
                                duration: 0.8,
                                ease: "easeInOut"
                            }
                        }}
                    />
                </div>
            )}

            {/* Floating particles for cosmic variant */}
            {variant === 'cosmic' && (
                <div className="absolute inset-0 rounded-inherit overflow-hidden pointer-events-none">
                    {[...Array(3)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-purple-400/60 rounded-full"
                            animate={{
                                x: [0, 100, 0],
                                y: [0, -100, 0],
                                opacity: [0, 1, 0],
                            }}
                            transition={{
                                duration: 4 + i,
                                repeat: Infinity,
                                delay: i * 1.5,
                                ease: "easeInOut",
                            }}
                            style={{
                                left: `${20 + i * 30}%`,
                                top: `${80 - i * 20}%`,
                            }}
                        />
                    ))}
                </div>
            )}

            {/* Enhanced border gradient for premium */}
            {variant === 'premium' && (
                <div className="absolute inset-0 rounded-inherit p-[1px] bg-gradient-to-br from-purple-500/30 via-transparent to-pink-500/30 pointer-events-none">
                    <div className="w-full h-full rounded-inherit bg-transparent" />
                </div>
            )}
        </div>
    );

    if (interactive && hover && !disabled) {
        return (
            <motion.div
                initial="initial"
                animate="animate"
                whileHover="hover"
                whileTap="tap"
                variants={animationVariants}
                {...motionProps}
            >
                {cardContent}
            </motion.div>
        );
    }

    return (
        <motion.div
            initial="initial"
            animate="animate"
            variants={animationVariants}
            {...motionProps}
        >
            {cardContent}
        </motion.div>
    );
});

GlassCard.displayName = "GlassCard";

export default GlassCard;

// Usage Examples:

// Basic dark usage
// <GlassCard variant="dark">Dark themed content</GlassCard>

// Premium variant with cosmic effects
// <GlassCard variant="cosmic" glow hover intensity="heavy">Cosmic content</GlassCard>

// Neon style for special elements
// <GlassCard variant="neon" size="lg" glow>Neon styled card</GlassCard>

// Loading state with shimmer
// <GlassCard variant="premium" loading intensity="heavy">Loading content...</GlassCard>

// Minimal dark theme
// <GlassCard variant="minimal" intensity="light">Subtle content</GlassCard>