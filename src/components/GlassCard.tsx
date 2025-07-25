import { ReactNode, forwardRef } from "react";
import { motion, MotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps extends MotionProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  variant?: 'default' | 'gradient' | 'minimal' | 'premium' | 'neon';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  glow?: boolean;
  interactive?: boolean;
  disabled?: boolean;
  loading?: boolean;
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
                                                                ...motionProps
                                                              }, ref) => {

  // Size variants
  const sizeVariants = {
    sm: "p-3 rounded-lg",
    md: "p-4 rounded-xl",
    lg: "p-6 rounded-2xl",
    xl: "p-8 rounded-3xl"
  };

  // Card style variants
  const styleVariants = {
    default: "backdrop-blur-xl bg-white/10 border border-white/20",
    gradient: "backdrop-blur-xl bg-gradient-to-br from-white/15 to-white/5 border border-white/25",
    minimal: "backdrop-blur-lg bg-white/5 border border-white/10",
    premium: "backdrop-blur-2xl bg-gradient-to-br from-purple-500/10 via-white/10 to-pink-500/10 border border-purple-500/20",
    neon: "backdrop-blur-xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/30"
  };

  // Glow effects
  const glowVariants = {
    default: "shadow-xl shadow-black/20",
    gradient: "shadow-2xl shadow-purple-500/10",
    minimal: "shadow-lg shadow-black/10",
    premium: "shadow-2xl shadow-purple-500/25",
    neon: "shadow-2xl shadow-cyan-500/20"
  };

  // Hover effects
  const hoverVariants = {
    default: "hover:border-white/30 hover:bg-white/15",
    gradient: "hover:border-white/35 hover:from-white/20 hover:to-white/10",
    minimal: "hover:border-white/20 hover:bg-white/10",
    premium: "hover:border-purple-500/40 hover:shadow-purple-500/30",
    neon: "hover:border-cyan-500/50 hover:shadow-cyan-500/30"
  };

  // Animation variants
  const animationVariants = {
    initial: {
      opacity: 0,
      scale: 0.95,
      y: 20
    },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.1, 0.25, 1]
      }
    },
    hover: interactive && hover ? {
      scale: 1.02,
      y: -4,
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
      // Base styles
      styleVariants[variant],
      sizeVariants[size],

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

      // Custom classes
      className
  );

  // Loading overlay
  const LoadingOverlay = () => (
      <div className="absolute inset-0 backdrop-blur-sm bg-black/20 rounded-inherit flex items-center justify-center z-10">
        <div className="flex space-x-1">
          {[0, 1, 2].map((i) => (
              <motion.div
                  key={i}
                  className="w-2 h-2 bg-purple-400 rounded-full"
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

  // Shimmer effect for loading
  const ShimmerEffect = () => (
      <div className="absolute inset-0 rounded-inherit overflow-hidden">
        <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            animate={{
              x: [-100, 100],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              width: "100%",
              height: "100%",
            }}
        />
      </div>
  );

  const cardContent = (
      <div className={cn(baseClasses, "relative overflow-hidden")} ref={ref}>
        {/* Background pattern for premium variant */}
        {variant === 'premium' && (
            <div className="absolute inset-0 opacity-30">
              <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 70%)`,
                  }}
              />
            </div>
        )}

        {/* Neon glow effect */}
        {variant === 'neon' && glow && (
            <div className="absolute inset-0 rounded-inherit">
              <div className="absolute inset-0 rounded-inherit bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-xl" />
            </div>
        )}

        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>

        {/* Loading states */}
        {loading && <LoadingOverlay />}
        {loading && variant === 'premium' && <ShimmerEffect />}

        {/* Hover shine effect */}
        {hover && interactive && !disabled && (
            <div className="absolute inset-0 rounded-inherit overflow-hidden pointer-events-none">
              <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0"
                  whileHover={{
                    opacity: 1,
                    x: [-100, 100],
                    transition: {
                      duration: 0.6,
                      ease: "easeInOut"
                    }
                  }}
              />
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

// Basic usage
// <GlassCard>Content here</GlassCard>

// Premium variant with glow
// <GlassCard variant="premium" glow hover>Premium content</GlassCard>

// Neon style for special elements
// <GlassCard variant="neon" size="lg" glow>Neon card</GlassCard>

// Loading state
// <GlassCard loading>Loading content...</GlassCard>

// Disabled state
// <GlassCard disabled>Disabled content</GlassCard>

// Custom styling
// <GlassCard 
//   variant="gradient" 
//   size="xl" 
//   className="border-purple-500/30"
//   whileHover={{ scale: 1.05 }}
// >
//   Custom card
// </GlassCard>