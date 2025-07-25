import {AnimatePresence, motion, useScroll, useSpring, useTransform} from "framer-motion";
import {
    Calendar,
    ChevronDown,
    Download,
    ExternalLink,
    GitFork,
    Github,
    Linkedin,
    Mail,
    MapPin,
    Quote,
    Star,
    Tag,
    Users,
    ArrowUp,
    Sparkles,
    Code,
    Zap,
    Heart
} from "lucide-react";
import {useInView} from "react-intersection-observer";
import {useEffect, useState, useCallback, useMemo} from "react";
import GlassCard from "../components/GlassCard";
import {usePersonalInfo} from "../hooks/usePersonalInfo";
import {DotLottieReact} from '@lottiefiles/dotlottie-react';
import {useProjects} from "@/hooks/useProjects.ts";

// Enhanced Typewriter Effect Component
const TypewriterEffect = ({ text, className = "" }) => {
    const [displayText, setDisplayText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (isPaused) {
                setIsPaused(false);
                setIsDeleting(!isDeleting);
                return;
            }

            if (isDeleting) {
                if (currentIndex > 0) {
                    setDisplayText(text.substring(0, currentIndex - 1));
                    setCurrentIndex(currentIndex - 1);
                } else {
                    setIsPaused(true);
                }
            } else {
                if (currentIndex < text.length) {
                    setDisplayText(text.substring(0, currentIndex + 1));
                    setCurrentIndex(currentIndex + 1);
                } else {
                    setIsPaused(true);
                }
            }
        }, isPaused ? 2000 : isDeleting ? 50 : 120);

        return () => clearTimeout(timeout);
    }, [currentIndex, isDeleting, isPaused, text]);

    return (
        <span className={className}>
            {displayText}
            <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                className="inline-block w-0.5 h-6 bg-current ml-1"
            />
        </span>
    );
};

// Optimized animation variants
const optimizedVariants = {
    hidden: {
        opacity: 0,
        y: 40,
        scale: 0.9,
        transition: { duration: 0.3 }
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1]
        }
    }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.3
        }
    }
};

// Enhanced Scroll to top button component
const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0, rotate: -180 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0, rotate: 180 }}
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 z-50 p-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 group"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <ArrowUp size={24} className="group-hover:animate-bounce" />

                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
                </motion.button>
            )}
        </AnimatePresence>
    );
};

// Enhanced Progress bar component
const ScrollProgress = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 z-50 transform-gpu shadow-lg shadow-purple-500/50"
            style={{ scaleX, transformOrigin: "0%" }}
        />
    );
};

// Enhanced Scroll-triggered animation component
const ScrollReveal = ({ children, direction = "up", delay = 0 }) => {
    const { scrollY } = useScroll();
    const [ref, inView] = useInView({
        triggerOnce: false,
        threshold: 0.1,
    });

    const y = useTransform(scrollY,
        (value) => inView ? 0 : direction === "up" ? 50 : -50
    );
    const opacity = useTransform(scrollY,
        (value) => inView ? 1 : 0
    );

    return (
        <motion.div
            ref={ref}
            style={{ y, opacity }}
            transition={{ delay, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
            {children}
        </motion.div>
    );
};

// Enhanced GitHub Hover Card Component
const GitHubCard = ({personalInfo, isVisible}) => {
    const [githubData, setGithubData] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchGitHubData = useCallback(async () => {
        if (githubData || loading) return;

        setLoading(true);
        try {
            const username = personalInfo.github_url?.split('/').pop();
            if (username) {
                const response = await fetch(`https://api.github.com/users/${username}`);
                const data = await response.json();
                setGithubData(data);
            }
        } catch (error) {
            console.error('Error fetching GitHub data:', error);
        } finally {
            setLoading(false);
        }
    }, [githubData, loading, personalInfo.github_url]);

    useEffect(() => {
        if (isVisible) {
            fetchGitHubData();
        }
    }, [isVisible, fetchGitHubData]);

    if (!isVisible) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 z-50"
        >
            <GlassCard
                variant="dark"
                intensity="heavy"
                className="min-w-[350px] p-6 border-purple-500/30"
                glow={true}
            >
                {loading ? (
                    <div className="flex items-center justify-center py-8">
                        <div className="spinner-large"></div>
                    </div>
                ) : githubData ? (
                    <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                            <img
                                src={githubData.avatar_url}
                                alt={githubData.login}
                                className="w-16 h-16 rounded-full border-2 border-purple-400/30 shadow-lg"
                            />
                            <div className="flex-1">
                                <h3 className="text-white font-semibold text-lg">{githubData.name || githubData.login}</h3>
                                <p className="text-purple-300">@{githubData.login}</p>
                            </div>
                        </div>

                        {githubData.bio && (
                            <p className="text-gray-300 text-sm leading-relaxed">{githubData.bio}</p>
                        )}

                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                            <div className="flex items-center space-x-1">
                                <MapPin size={14}/>
                                <span>{githubData.location || 'Unknown'}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <Calendar size={14}/>
                                <span>Since {new Date(githubData.created_at).getFullYear()}</span>
                            </div>
                        </div>

                        <div className="flex items-center space-x-6 text-sm">
                            <div className="flex items-center space-x-1 text-blue-400">
                                <Users size={16}/>
                                <span>{githubData.followers} followers</span>
                            </div>
                            <div className="flex items-center space-x-1 text-green-400">
                                <GitFork size={16}/>
                                <span>{githubData.public_repos} repos</span>
                            </div>
                        </div>

                        <motion.button
                            onClick={() => window.open(githubData.html_url, '_blank')}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-200"
                        >
                            <Github size={16}/>
                            <span>View Profile</span>
                            <ExternalLink size={14}/>
                        </motion.button>
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <Github size={48} className="mx-auto text-gray-500 mb-4"/>
                        <p className="text-gray-400">Unable to load GitHub data</p>
                    </div>
                )}
            </GlassCard>
        </motion.div>
    );
};

// Enhanced LinkedIn Hover Card Component
const LinkedInCard = ({personalInfo, isVisible}) => {
    if (!isVisible) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 z-50"
        >
            <GlassCard
                variant="dark"
                intensity="heavy"
                className="min-w-[320px] p-6 border-blue-500/30"
                glow={true}
            >
                <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-xl">
                            <Linkedin size={32} className="text-white"/>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-white font-semibold text-lg">{personalInfo.name}</h3>
                            <p className="text-blue-300">{personalInfo.role}</p>
                        </div>
                    </div>

                    <div className="text-gray-300 text-sm space-y-2">
                        <p className="flex items-center space-x-2">
                            <span>🎯</span>
                            <span>Professional Network & Opportunities</span>
                        </p>
                        <p className="flex items-center space-x-2">
                            <span>📍</span>
                            <span>Based in Sarnath, India</span>
                        </p>
                        <p className="flex items-center space-x-2">
                            <span>🚀</span>
                            <span>Open to exciting projects and collaborations</span>
                        </p>
                    </div>

                    <motion.button
                        onClick={() => window.open(personalInfo.linkedin_url, '_blank')}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200"
                    >
                        <Linkedin size={16}/>
                        <span>Let's Connect</span>
                        <ExternalLink size={14}/>
                    </motion.button>
                </div>
            </GlassCard>
        </motion.div>
    );
};

// Enhanced Email Hover Card Component
const EmailCard = ({personalInfo, isVisible}) => {
    if (!isVisible) return null;

    const handleEmailClick = () => {
        window.open(`mailto:${personalInfo.email}?subject=Hello%20from%20your%20portfolio!&body=Hi%20${personalInfo.name},%0D%0A%0D%0AI%20found%20your%20portfolio%20and%20would%20like%20to%20get%20in%20touch.%0D%0A%0D%0ABest%20regards`, '_blank');
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 z-50"
        >
            <GlassCard
                variant="dark"
                intensity="heavy"
                className="min-w-[320px] p-6 border-green-500/30"
                glow={true}
            >
                <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-700 rounded-full flex items-center justify-center shadow-xl">
                            <Mail size={32} className="text-white"/>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-white font-semibold text-lg">Get In Touch</h3>
                            <p className="text-green-400">Let's discuss your project</p>
                        </div>
                    </div>

                    <div className="text-gray-300 text-sm space-y-2">
                        <p className="flex items-center space-x-2">
                            <span>📧</span>
                            <span className="font-mono text-green-400">{personalInfo.email}</span>
                        </p>
                        <p className="flex items-center space-x-2">
                            <span>💬</span>
                            <span>Quick response guaranteed</span>
                        </p>
                        <p className="flex items-center space-x-2">
                            <span>🎯</span>
                            <span>Available for freelance & full-time</span>
                        </p>
                    </div>

                    <motion.button
                        onClick={handleEmailClick}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-green-600 to-emerald-700 text-white px-4 py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-green-500/25 transition-all duration-200"
                    >
                        <Mail size={16}/>
                        <span>Send Email</span>
                        <ExternalLink size={14}/>
                    </motion.button>
                </div>
            </GlassCard>
        </motion.div>
    );
};

// Enhanced Featured Project Card Component
const FeaturedProjectCard = ({project, index, isVisible}) => {
    const defaultProjectImage = 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=500&h=300&fit=crop&crop=center';

    const handleProjectClick = (project) => {
        console.log('Navigate to project:', project.name);
    };

    return (
        <ScrollReveal direction="up" delay={index * 0.1}>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: [0.25, 0.1, 0.25, 1]
                }}
                onClick={() => handleProjectClick(project)}
                className="transform-gpu h-full"
            >
                <GlassCard
                    className="cursor-pointer group h-full"
                    variant="dark"
                    intensity="heavy"
                    hover={true}
                    glow={true}
                >
                    <div className="relative mb-6 overflow-hidden rounded-xl">
                        <img
                            src={project.image_url || defaultProjectImage}
                            alt={project.name}
                            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                            onError={(e) => {
                                e.target.src = defaultProjectImage;
                            }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>

                        <div className="absolute inset-0 flex items-center justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {project.live_demo_url && (
                                <motion.a
                                    href={project.live_demo_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    onClick={(e) => e.stopPropagation()}
                                    className="p-3 bg-green-600/90 backdrop-blur-sm text-white rounded-full shadow-xl hover:bg-green-700 transition-colors border border-green-400/30"
                                    aria-label="View Live Demo"
                                >
                                    <ExternalLink size={20}/>
                                </motion.a>
                            )}
                            {project.source_code_url && (
                                <motion.a
                                    href={project.source_code_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    onClick={(e) => e.stopPropagation()}
                                    className="p-3 bg-gray-800/90 backdrop-blur-sm text-white rounded-full shadow-xl hover:bg-gray-700 transition-colors border border-gray-600/30"
                                    aria-label="View Source Code"
                                >
                                    <Github size={20}/>
                                </motion.a>
                            )}
                        </div>

                        {/* Project category badge */}
                        <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 bg-purple-600/80 backdrop-blur-sm text-white text-xs font-medium rounded-full border border-purple-400/30">
                                {project.category || 'Featured'}
                            </span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                                {project.name}
                            </h3>
                            <p className="text-gray-300 text-sm mb-3 line-clamp-3 leading-relaxed">
                                {project.short_description || project.description || "An innovative project showcasing modern web development techniques and best practices."}
                            </p>
                        </div>

                        {(project.start_date || project.end_date) && (
                            <div className="flex items-center text-gray-400 text-sm mb-3">
                                <Calendar size={14} className="mr-2 text-purple-400"/>
                                <span>
                                    {project.start_date || 'Started'} - {project.end_date || 'Present'}
                                </span>
                            </div>
                        )}

                        <div>
                            <div className="flex items-center text-gray-400 text-sm mb-3">
                                <Tag size={14} className="mr-2 text-purple-400"/>
                                <span>Technologies</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {(project.technologies || ['React', 'JavaScript', 'CSS']).slice(0, 3).map((tech) => (
                                    <span
                                        key={tech}
                                        className="px-3 py-1 bg-purple-600/20 text-purple-300 rounded-full text-xs border border-purple-500/30 hover:bg-purple-600/30 transition-colors font-medium"
                                    >
                                        {tech}
                                    </span>
                                ))}
                                {(project.technologies || []).length > 3 && (
                                    <span className="px-3 py-1 bg-gray-600/20 text-gray-300 rounded-full text-xs border border-gray-500/30 font-medium">
                                        +{(project.technologies || []).length - 3} more
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </GlassCard>
            </motion.div>
        </ScrollReveal>
    );
};

// Enhanced Testimonial Card Component
const TestimonialCard = ({testimonial, index, sectionsInView}) => {
    const getInitials = (name) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    return (
        <ScrollReveal direction="up" delay={index * 0.15}>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={sectionsInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                    duration: 0.6,
                    delay: index * 0.15,
                    ease: [0.25, 0.1, 0.25, 1]
                }}
                className="transform-gpu h-full"
            >
                <GlassCard
                    className="h-full p-6 relative"
                    variant="dark"
                    intensity="heavy"
                    hover={true}
                    glow={true}
                >
                    <div className="absolute top-4 right-4 opacity-20">
                        <Quote size={32} className="text-purple-400"/>
                    </div>

                    <div className="flex items-center mb-4">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                size={16}
                                className="text-yellow-400 fill-current"
                            />
                        ))}
                    </div>

                    <blockquote className="text-gray-300 text-sm leading-relaxed mb-6 italic">
                        "{testimonial.feedback}"
                    </blockquote>

                    <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-sm bg-gradient-to-r ${testimonial.color} shadow-lg`}>
                            {testimonial.image ? (
                                <img
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    className="w-full h-full rounded-full object-cover"
                                />
                            ) : (
                                getInitials(testimonial.name)
                            )}
                        </div>
                        <div className="flex-1">
                            <h4 className="text-white font-semibold text-sm">{testimonial.name}</h4>
                            <p className="text-gray-400 text-xs">{testimonial.position}</p>
                            <p className="text-purple-400 text-xs font-medium">{testimonial.company}</p>
                        </div>
                    </div>

                    {testimonial.project && (
                        <div className="mt-3 pt-3 border-t border-gray-700/50">
                            <span className="text-xs text-gray-500">
                                Project: <span className="text-purple-400">{testimonial.project}</span>
                            </span>
                        </div>
                    )}
                </GlassCard>
            </motion.div>
        </ScrollReveal>
    );
};

const Home = () => {
    const { scrollY } = useScroll();
    const [heroRef, heroInView] = useInView({ threshold: 0.3, triggerOnce: true });
    const [sectionsRef, sectionsInView] = useInView({ threshold: 0.2, triggerOnce: false });
    const [projectsRef, projectsInView] = useInView({ threshold: 0.2, triggerOnce: false });
    const [testimonialRef, testimonialInView] = useInView({ threshold: 0.2, triggerOnce: false });
    const [hoveredCard, setHoveredCard] = useState(null);

    const {data: personalInfo, isLoading: loadingInfo} = usePersonalInfo();
    const {data: projectsData, isLoading: loadingProjects} = useProjects();

    // Enhanced parallax effects
    const heroY = useTransform(scrollY, [0, 500], [0, 150]);
    const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.8]);

    // Optimized project filtering
    const featuredProjects = useMemo(() => {
        const filtered = projectsData?.filter(project => {
            const featuredNames = ["Travel/Tourism Website", "Gaming Website", "E-Commerce system"];
            return featuredNames.some(name => project.name?.toLowerCase().includes(name.toLowerCase()));
        }).slice(0, 3) || [];

        return filtered.length > 0 ? filtered : (projectsData?.slice(0, 3) || []);
    }, [projectsData]);

    // Enhanced Professional Statistics Data
    const statistics = useMemo(() => [
        {
            title: "Projects Delivered",
            count: "15+",
            description: "Successfully delivered full-stack applications with modern architecture, focusing on scalability, performance optimization, and maintainable code structure.",
            color: "from-purple-600 to-pink-600",
            icon: Code
        },
        {
            title: "Technologies Mastered",
            count: "25+",
            description: "Proficient across frontend, backend, and DevOps technologies including React, Node.js, Python, AWS, and modern development frameworks.",
            color: "from-blue-600 to-purple-600",
            icon: Zap
        },
        {
            title: "Years Experience",
            count: "2+",
            description: "Hands-on experience in software development, from concept to deployment, with expertise in agile methodologies and client collaboration.",
            color: "from-green-600 to-blue-600",
            icon: Star
        },
        {
            title: "Client Satisfaction",
            count: "100%",
            description: "Committed to delivering exceptional results on time and within budget. Available for new projects, collaborations, and full-time opportunities.",
            color: "from-pink-600 to-purple-600",
            icon: Heart
        }
    ], []);

    // Enhanced Professional Client Testimonials
    const testimonials = useMemo(() => [
        {
            name: "Utkarsh Sinha",
            position: "Chief Executive Officer",
            company: "KryptoAD",
            image: "",
            feedback: "Working with this developer was exceptional. They delivered our blockchain advertising platform ahead of schedule with clean, scalable code. Their technical expertise and problem-solving skills are outstanding. They consistently went above and beyond to ensure the platform met our evolving needs.",
            project: "Blockchain Ad Platform",
            color: "from-purple-600 to-pink-600"
        },
        {
            name: "Shriyan Jaiswal",
            position: "Lead Developer",
            company: "KryptoAD",
            image: "",
            feedback: "An incredibly talented developer who brings both technical excellence and creative solutions. Their full-stack expertise helped us build a robust, user-friendly application that exceeded our expectations. Communication was seamless throughout, and their proactive approach made collaboration effortless.",
            project: "Full-Stack Development",
            color: "from-blue-600 to-purple-600"
        },
        {
            name: "Lucky Singh",
            position: "Design Director",
            company: "KryptoAD",
            image: "",
            feedback: "Rare to find a developer who truly understands both technical implementation and design principles so well. They perfectly translated our designs into responsive, interactive interfaces. Their attention to detail and unwavering commitment to user experience elevated the final product beyond our expectations.",
            project: "UI/UX Implementation",
            color: "from-green-600 to-blue-600"
        }
    ], []);

    const handleDownloadResume = useCallback(() => {
        if (personalInfo?.resume_url) {
            const link = document.createElement('a');
            link.href = personalInfo.resume_url;
            link.download = `${personalInfo.name.replace(' ', '_')}_Resume.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            const link = document.createElement('a');
            link.href = '/resume/praveenyadavresume.png';
            link.download = 'Praveen_Yadav_Resume.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }, [personalInfo]);

    // Add a smooth scrolling effect
    useEffect(() => {
        document.documentElement.style.scrollBehavior = 'smooth';
        return () => {
            document.documentElement.style.scrollBehavior = 'auto';
        };
    }, []);

    if (loadingInfo || loadingProjects) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-purple-950 to-gray-950">
                <div className="text-center">
                    <DotLottieReact
                        src="https://lottie.host/206cf556-6aab-4cc8-aa2d-7598ec0fbedc/jvDXSqpSNx.lottie"
                        loop
                        autoplay
                        className="w-64 h-64 mx-auto mb-4"
                    />
                    <p className="text-white text-lg">Loading your portfolio...</p>
                </div>
            </div>
        );
    }

    if (!personalInfo) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-purple-950 to-gray-950">
                <div className="text-center">
                    <div className="text-white text-xl mb-4">Failed to load personal information</div>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    const socialLinks = [
        {
            icon: Github,
            href: personalInfo.github_url,
            label: "GitHub",
            key: "github"
        },
        {
            icon: Linkedin,
            href: personalInfo.linkedin_url,
            label: "LinkedIn",
            key: "linkedin"
        },
        {
            icon: Mail,
            href: `mailto:${personalInfo.email}`,
            label: "Email",
            key: "email"
        }
    ].filter(social => social.href);

    return (
        <>
            <ScrollProgress />
            <ScrollToTop />

            <motion.div
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0 }}
                className="min-h-screen"
            >
                {/* Enhanced Hero Section */}
                <section
                    id="home"
                    ref={heroRef}
                    className="min-h-screen flex items-center justify-center px-4 pt-20 relative overflow-hidden"
                >
                    <motion.div
                        style={{ y: heroY, opacity: heroOpacity }}
                        variants={staggerContainer}
                        className="text-center max-w-4xl mx-auto relative z-10"
                    >
                        {/* Enhanced Hero Image */}
                        <motion.div variants={optimizedVariants} className="mb-8">
                            {personalInfo.image_url ? (
                                <motion.div
                                    whileHover={{ scale: 1.05, rotateY: 15 }}
                                    transition={{ duration: 0.3 }}
                                    className="w-56 h-56 mx-auto mb-8 rounded-full overflow-hidden border-4 border-purple-500/40 shadow-2xl shadow-purple-500/30 relative group"
                                >
                                    <img
                                        src={personalInfo.image_url}
                                        alt={personalInfo.name}
                                        className="w-full h-full object-cover"
                                    />

                                    {/* Glow effect on hover */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </motion.div>
                            ) : (
                                <motion.div
                                    whileHover={{ scale: 1.05, rotateY: 15 }}
                                    transition={{ duration: 0.3 }}
                                    className="w-56 h-56 mx-auto mb-8 rounded-full overflow-hidden border-4 border-purple-500/40 shadow-2xl shadow-purple-500/30 bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center group relative"
                                >
                                    <div className="text-6xl font-bold text-white">
                                        {personalInfo.name.split(' ').map(n => n[0]).join('')}
                                    </div>

                                    {/* Animated sparkles */}
                                    <Sparkles className="absolute top-4 right-4 text-white/60 animate-pulse" size={20} />
                                    <Sparkles className="absolute bottom-4 left-4 text-white/40 animate-pulse" size={16} />
                                </motion.div>
                            )}
                        </motion.div>

                        <motion.div variants={optimizedVariants}>
                            <h1 className="text-6xl md:text-8xl font-bold mb-6">
                                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                                    {personalInfo.name}
                                </span>
                            </h1>
                        </motion.div>

                        <motion.div variants={optimizedVariants}>
                            <p className="text-2xl md:text-3xl text-gray-300 mb-8 font-light">
                                <TypewriterEffect
                                    text={personalInfo.role}
                                    className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 font-medium"
                                />
                            </p>
                        </motion.div>

                        <motion.div variants={optimizedVariants}>
                            <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                                {personalInfo.bio}
                            </p>
                        </motion.div>

                        <motion.div variants={optimizedVariants} className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: "0 25px 50px rgba(139, 92, 246, 0.4)" }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleDownloadResume}
                                className="flex items-center space-x-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-2xl relative overflow-hidden group"
                            >
                                <Download size={24}/>
                                <span>Download Resume</span>

                                {/* Shimmer effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer" />
                            </motion.button>

                            <div className="flex space-x-4 relative">
                                {socialLinks.map((social) => (
                                    <div key={social.label} className="relative">
                                        <motion.a
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onMouseEnter={() => setHoveredCard(social.key)}
                                            onMouseLeave={() => setHoveredCard(null)}
                                            whileHover={{ scale: 1.1, y: -2 }}
                                            whileTap={{ scale: 0.95 }}
                                            transition={{ duration: 0.2 }}
                                            className="p-4 bg-gray-900/40 backdrop-blur-sm rounded-xl border border-gray-700/30 text-white hover:bg-gray-800/50 transition-all duration-300 block relative group"
                                            aria-label={social.label}
                                        >
                                            <social.icon size={24}/>

                                            {/* Glow effect */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
                                        </motion.a>

                                        <AnimatePresence>
                                            {hoveredCard === social.key && (
                                                <>
                                                    {social.key === 'github' && (
                                                        <GitHubCard
                                                            personalInfo={personalInfo}
                                                            isVisible={true}
                                                        />
                                                    )}
                                                    {social.key === 'linkedin' && (
                                                        <LinkedInCard
                                                            personalInfo={personalInfo}
                                                            isVisible={true}
                                                        />
                                                    )}
                                                    {social.key === 'email' && (
                                                        <EmailCard
                                                            personalInfo={personalInfo}
                                                            isVisible={true}
                                                        />
                                                    )}
                                                </>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div variants={optimizedVariants}>
                            <motion.div
                                animate={{ y: [0, 10, 0] }}
                                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                                className="inline-block"
                            >
                                <ChevronDown size={32} className="text-purple-400"/>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </section>

                {/* Enhanced Professional Overview Section */}
                <section id="about" ref={sectionsRef} className="py-20 px-4">
                    <ScrollReveal direction="up">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={sectionsInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8 }}
                            className="max-w-6xl mx-auto"
                        >
                            <div className="text-center mb-16">
                                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                    Professional Excellence
                                </h2>
                                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                                    Delivering innovative solutions with technical expertise and creative problem-solving
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                                {statistics.map((item, index) => (
                                    <ScrollReveal key={item.title} direction="up" delay={index * 0.15}>
                                        <motion.div
                                            initial={{ opacity: 0, y: 50 }}
                                            animate={sectionsInView ? { opacity: 1, y: 0 } : {}}
                                            transition={{
                                                duration: 0.6,
                                                delay: index * 0.15,
                                                ease: [0.25, 0.1, 0.25, 1]
                                            }}
                                            className="transform-gpu h-full"
                                        >
                                            <GlassCard
                                                className="text-center h-full p-6 group"
                                                variant="dark"
                                                intensity="heavy"
                                                hover={true}
                                                glow={true}
                                            >
                                                <div className="flex justify-center mb-4">
                                                    <div className={`p-3 rounded-full bg-gradient-to-r ${item.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                                        <item.icon size={24} className="text-white" />
                                                    </div>
                                                </div>

                                                <div className={`text-4xl font-bold mb-4 bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                                                    {item.count}
                                                </div>
                                                <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                                                <p className="text-gray-300 text-sm leading-relaxed">{item.description}</p>
                                            </GlassCard>
                                        </motion.div>
                                    </ScrollReveal>
                                ))}
                            </div>
                        </motion.div>
                    </ScrollReveal>
                </section>

                {/* Enhanced Featured Projects Section */}
                <section id="projects" ref={projectsRef} className="py-20 px-4">
                    <ScrollReveal direction="up">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={projectsInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8 }}
                            className="max-w-6xl mx-auto"
                        >
                            <div className="text-center mb-16">
                                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                    Featured Projects
                                </h2>
                                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                                    Showcasing my latest work and technical achievements
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {featuredProjects.map((project, index) => (
                                    <FeaturedProjectCard
                                        key={project.id || index}
                                        project={project}
                                        index={index}
                                        isVisible={projectsInView}
                                    />
                                ))}
                            </div>

                            {featuredProjects.length === 0 && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-center py-16"
                                >
                                    <p className="text-gray-400 text-lg mb-4">No projects available at the moment.</p>
                                    <p className="text-gray-500 text-sm">Check back soon for updates!</p>
                                </motion.div>
                            )}

                            {featuredProjects.length > 0 && (
                                <ScrollReveal direction="up" delay={0.4}>
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={projectsInView ? { opacity: 1, y: 0 } : {}}
                                        transition={{ duration: 0.8, delay: 0.4 }}
                                        className="text-center mt-12"
                                    >
                                        <motion.button
                                            whileHover={{ scale: 1.05, y: -2 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300"
                                        >
                                            View All Projects
                                        </motion.button>
                                    </motion.div>
                                </ScrollReveal>
                            )}
                        </motion.div>
                    </ScrollReveal>
                </section>

                {/* Enhanced Client Testimonials Section */}
                <section ref={testimonialRef} className="py-20 px-4">
                    <ScrollReveal direction="up">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={testimonialInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8 }}
                            className="max-w-6xl mx-auto"
                        >
                            <div className="text-center mb-16">
                                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                    Client Testimonials
                                </h2>
                                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                                    What clients say about working with me
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {testimonials.map((testimonial, index) => (
                                    <TestimonialCard
                                        key={testimonial.name}
                                        testimonial={testimonial}
                                        index={index}
                                        sectionsInView={testimonialInView}
                                    />
                                ))}
                            </div>

                            <ScrollReveal direction="up" delay={0.6}>
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={testimonialInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.8, delay: 0.6 }}
                                    className="text-center mt-16"
                                >
                                    <p className="text-gray-300 mb-6 text-lg">Ready to start your next project?</p>
                                    <motion.button
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => window.open(`mailto:${personalInfo.email}`, '_blank')}
                                        className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300"
                                    >
                                        Let's Work Together
                                    </motion.button>
                                </motion.div>
                            </ScrollReveal>
                        </motion.div>
                    </ScrollReveal>
                </section>
            </motion.div>
        </>
    );
};

export default Home;