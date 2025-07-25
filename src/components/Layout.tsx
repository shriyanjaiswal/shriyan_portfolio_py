import { ReactNode, useEffect, useState, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Navigation from "./Navigation";
import ParallaxBackground from "./ParallaxBackground";
import Footer from "@/components/Footer.tsx";

interface LayoutProps {
    children: ReactNode;
}

// Enhanced Loading Component with DotLottie
const LoadingScreen = ({ message = "Loading your portfolio..." }) => {
    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900"
        >
            <div className="text-center">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <DotLottieReact
                        src="https://lottie.host/206cf556-6aab-4cc8-aa2d-7598ec0fbedc/jvDXSqpSNx.lottie"
                        loop
                        autoplay
                        className="w-64 h-64 mx-auto mb-4"
                    />
                </motion.div>
                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-white text-lg font-medium"
                >
                    {message}
                </motion.p>

                {/* Loading progress indicator */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 2, delay: 0.6, ease: "easeInOut" }}
                    className="w-64 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mt-6 origin-left"
                />
            </div>
        </motion.div>
    );
};

// Enhanced Page Transition Component
const PageTransition = ({ children }: { children: ReactNode }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.02, y: -20 }}
            transition={{
                duration: 0.4,
                ease: [0.25, 0.1, 0.25, 1],
            }}
            className="transform-gpu will-change-transform"
        >
            {children}
        </motion.div>
    );
};

// Performance Monitor (Development Only)
const PerformanceMonitor = () => {
    const [fps, setFps] = useState(60);
    const [showStats, setShowStats] = useState(false);
    const [memoryUsage, setMemoryUsage] = useState(0);

    useEffect(() => {
        if (process.env.NODE_ENV !== 'development') return;

        let frame = 0;
        let lastTime = performance.now();
        let frameCount = 0;

        const measurePerformance = () => {
            frameCount++;
            const currentTime = performance.now();

            if (currentTime > lastTime + 1000) {
                setFps(Math.round((frameCount * 1000) / (currentTime - lastTime)));
                frameCount = 0;
                lastTime = currentTime;

                // Memory usage (if available)
                if ('memory' in performance) {
                    const memory = (performance as any).memory;
                    setMemoryUsage(Math.round(memory.usedJSHeapSize / 1048576));
                }
            }

            frame = requestAnimationFrame(measurePerformance);
        };

        frame = requestAnimationFrame(measurePerformance);

        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.key === '`' && e.ctrlKey) {
                setShowStats(prev => !prev);
            }
        };

        window.addEventListener('keydown', handleKeyPress);

        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    if (!showStats || process.env.NODE_ENV !== 'development') return null;

    return (
        <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            className="fixed top-4 right-4 z-50 bg-black/90 text-white text-xs font-mono p-3 rounded-lg border border-purple-500/30 backdrop-blur-sm"
        >
            <div className="space-y-1">
                <div className={`flex items-center justify-between ${fps < 30 ? 'text-red-400' : fps < 50 ? 'text-yellow-400' : 'text-green-400'}`}>
                    <span>FPS:</span>
                    <span className="font-bold">{fps}</span>
                </div>
                {memoryUsage > 0 && (
                    <div className="flex items-center justify-between text-blue-400">
                        <span>Memory:</span>
                        <span className="font-bold">{memoryUsage}MB</span>
                    </div>
                )}
                <div className="text-gray-400 text-[10px] mt-2">
                    Ctrl + ` to toggle
                </div>
            </div>
        </motion.div>
    );
};

// Error Boundary Component
const ErrorFallback = ({ error, resetError }: { error: Error; resetError: () => void }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
            <div className="text-center max-w-md mx-auto p-8">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="mb-6"
                >
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center">
                        <span className="text-white text-2xl">⚠️</span>
                    </div>
                </motion.div>

                <h2 className="text-2xl font-bold text-white mb-4">Something went wrong</h2>
                <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                    We encountered an unexpected error. Please try refreshing the page.
                </p>

                <div className="space-y-3">
                    <motion.button
                        onClick={resetError}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg"
                    >
                        Try Again
                    </motion.button>

                    <motion.button
                        onClick={() => window.location.reload()}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full px-6 py-3 bg-white/10 text-white rounded-lg font-medium transition-all duration-300 hover:bg-white/20"
                    >
                        Refresh Page
                    </motion.button>
                </div>

                {process.env.NODE_ENV === 'development' && (
                    <details className="mt-6 text-left">
                        <summary className="text-gray-400 text-xs cursor-pointer">Error Details</summary>
                        <pre className="mt-2 text-xs text-red-300 bg-black/50 p-2 rounded overflow-auto max-h-32">
              {error.message}
            </pre>
                    </details>
                )}
            </div>
        </div>
    );
};

// Preloader for critical resources
const PreloadManager = () => {
    useEffect(() => {
        // Preload critical resources
        const preloadResources = [
            '/api/personal-info',
            '/api/projects',
            '/api/skills',
        ];

        if ('requestIdleCallback' in window) {
            window.requestIdleCallback(() => {
                preloadResources.forEach(url => {
                    const link = document.createElement('link');
                    link.rel = 'prefetch';
                    link.href = url;
                    document.head.appendChild(link);
                });
            });
        }

        // Optimize for performance
        if ('connection' in navigator) {
            const connection = (navigator as any).connection;
            if (connection && connection.effectiveType === '4g') {
                // Enable high-quality features for fast connections
                document.documentElement.classList.add('high-performance');
            }
        }
    }, []);

    return null;
};

const Layout = ({ children }: LayoutProps) => {
    const [mounted, setMounted] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        // Initialize layout
        const initializeLayout = async () => {
            try {
                // Set mounted state
                setMounted(true);

                // Optimize document settings
                document.documentElement.style.scrollBehavior = 'smooth';
                document.documentElement.style.fontDisplay = 'swap';

                // Add performance classes
                document.body.classList.add('antialiased', 'overflow-x-hidden');

                // Minimum loading time for smooth UX
                await new Promise(resolve => setTimeout(resolve, 1200));

                setIsLoading(false);
            } catch (err) {
                setError(err as Error);
                setIsLoading(false);
            }
        };

        initializeLayout();

        return () => {
            document.documentElement.style.scrollBehavior = 'auto';
        };
    }, []);

    // Error boundary
    if (error) {
        return <ErrorFallback error={error} resetError={() => setError(null)} />;
    }

    // Initial mount loading
    if (!mounted) {
        return <LoadingScreen message="Initializing..." />;
    }

    return (
        <div className="min-h-screen relative overflow-x-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
            {/* Preload Manager */}
            <PreloadManager />

            {/* Performance Monitor */}
            <PerformanceMonitor />

            {/* Loading Screen */}
            <AnimatePresence mode="wait">
                {isLoading && (
                    <LoadingScreen message="Loading your portfolio..." />
                )}
            </AnimatePresence>

            {/* Parallax Background */}
            <Suspense fallback={null}>
                <ParallaxBackground />
            </Suspense>

            {/* Navigation */}
            <div className="relative z-40">
                <Navigation />
            </div>

            {/* Main Content with Page Transitions */}
            <AnimatePresence mode="wait">
                {!isLoading && (
                    <motion.main className="relative z-30 min-h-screen">
                        <PageTransition>
                            <Suspense
                                fallback={
                                    <div className="min-h-screen flex items-center justify-center">
                                        <div className="text-center">
                                            <DotLottieReact
                                                src="https://lottie.host/206cf556-6aab-4cc8-aa2d-7598ec0fbedc/jvDXSqpSNx.lottie"
                                                loop
                                                autoplay
                                                className="w-32 h-32 mx-auto mb-4"
                                            />
                                            <p className="text-white text-sm">Loading content...</p>
                                        </div>
                                    </div>
                                }
                            >
                                {children}
                            </Suspense>
                        </PageTransition>
                    </motion.main>
                )}
            </AnimatePresence>

            <Footer />

            {/* Content Enhancement Overlays */}
            <div className="fixed inset-0 z-20 pointer-events-none">
                {/* Subtle vignette for better content focus */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/3" />

                {/* Edge glow effects */}
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-purple-500/5 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-purple-500/5 to-transparent" />
            </div>

            {/* Accessibility skip link */}
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-purple-600 focus:text-white focus:rounded-lg focus:font-medium"
            >
                Skip to main content
            </a>
        </div>
    );
};

export default Layout;