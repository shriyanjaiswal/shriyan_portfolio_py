import {motion, useScroll, useSpring, useTransform} from "framer-motion";
import {useState, useEffect} from "react";
import {useInView} from "react-intersection-observer";
import {Calendar, ExternalLink, Github, Tag, ArrowUp, Filter} from "lucide-react";
import GlassCard from "../components/GlassCard";
import ProjectModal from "../components/ProjectModal";
import Footer from "../components/Footer";
import {useProjects} from "../hooks/useProjects";
import {usePersonalInfo} from "../hooks/usePersonalInfo";
import {DotLottieReact} from "@lottiefiles/dotlottie-react";

// Scroll-triggered animation component
const ScrollReveal = ({ children, direction = "up", delay = 0, threshold = 0.1 }) => {
    const [ref, inView] = useInView({
        triggerOnce: false,
        threshold,
    });

    const variants = {
        hidden: {
            opacity: 0,
            y: direction === "up" ? 50 : direction === "down" ? -50 : 0,
            x: direction === "left" ? 50 : direction === "right" ? -50 : 0,
            scale: 0.95
        },
        visible: {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            transition: {
                duration: 0.6,
                delay,
                ease: [0.25, 0.1, 0.25, 1]
            }
        }
    };

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={variants}
        >
            {children}
        </motion.div>
    );
};

// Scroll to top button component
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
        <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{
                opacity: isVisible ? 1 : 0,
                scale: isVisible ? 1 : 0
            }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 p-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
        >
            <ArrowUp size={24} />
        </motion.button>
    );
};

// Progress bar component
const ScrollProgress = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 z-50 transform-gpu"
            style={{ scaleX, transformOrigin: "0%" }}
        />
    );
};

// Enhanced Project Card Component
const ProjectCard = ({ project, index, isVisible, onClick }) => {
    const defaultProjectImage = 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400&h=300&fit=crop&crop=center';

    return (
        <ScrollReveal direction="up" delay={index * 0.1} threshold={0.1}>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: [0.25, 0.1, 0.25, 1]
                }}
                onClick={onClick}
                className="transform-gpu"
            >
                <GlassCard
                    className="cursor-pointer group bg-gradient-to-br from-[#1a1a3a]/50 to-[#2a2a4a]/30 backdrop-blur-xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 overflow-hidden"
                    hover={true}
                >
                    <div className="relative overflow-hidden">
                        <div className="relative h-48 overflow-hidden">
                            <img
                                src={project.image_url || defaultProjectImage}
                                alt={project.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                onError={(e) => {
                                    e.target.src = defaultProjectImage;
                                }}
                            />

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"/>

                            {/* Category Badge */}
                            <div className="absolute top-4 left-4">
                                <span className="px-3 py-1 bg-purple-500/80 backdrop-blur-sm text-white text-xs font-medium rounded-full border border-purple-400/30">
                                    {project.category || 'Project'}
                                </span>
                            </div>

                            {/* Action Buttons */}
                            <div className="absolute inset-0 flex items-center justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                {project.live_demo_url && (
                                    <motion.a
                                        href={project.live_demo_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.1, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={(e) => e.stopPropagation()}
                                        className="p-3 bg-green-500/90 backdrop-blur-sm text-white rounded-full shadow-lg hover:bg-green-600 transition-colors border border-green-400/30"
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
                                        whileTap={{ scale: 0.95 }}
                                        onClick={(e) => e.stopPropagation()}
                                        className="p-3 bg-gray-800/90 backdrop-blur-sm text-white rounded-full shadow-lg hover:bg-gray-700 transition-colors border border-gray-600/30"
                                        aria-label="View Source Code"
                                    >
                                        <Github size={20}/>
                                    </motion.a>
                                )}
                            </div>
                        </div>

                        <div className="p-6 space-y-4">
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors line-clamp-1">
                                    {project.name}
                                </h3>
                                <p className="text-gray-300 text-sm leading-relaxed line-clamp-2">
                                    {project.short_description || project.description || "An innovative project showcasing modern development techniques."}
                                </p>
                            </div>

                            {(project.start_date || project.end_date) && (
                                <div className="flex items-center text-gray-400 text-sm">
                                    <Calendar size={14} className="mr-2 text-purple-400"/>
                                    <span>{project.start_date || 'Started'} - {project.end_date || 'Present'}</span>
                                </div>
                            )}

                            <div>
                                <div className="flex items-center text-gray-400 text-sm mb-3">
                                    <Tag size={14} className="mr-2 text-purple-400"/>
                                    <span>Technologies</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {(project.technologies || ['React', 'JavaScript']).slice(0, 3).map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs border border-purple-500/30 hover:bg-purple-500/30 transition-colors font-medium"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                    {(project.technologies || []).length > 3 && (
                                        <span className="px-3 py-1 bg-gray-500/20 text-gray-300 rounded-full text-xs border border-gray-500/30 font-medium">
                                            +{(project.technologies || []).length - 3} more
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Status Indicator */}
                            <div className="flex items-center justify-between pt-2 border-t border-gray-700/30">
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                    <span className="text-xs text-gray-400">Active Project</span>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="text-xs text-purple-400 hover:text-purple-300 font-medium transition-colors"
                                >
                                    View Details →
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </GlassCard>
            </motion.div>
        </ScrollReveal>
    );
};

const Projects = () => {
    const { scrollY } = useScroll();
    const [heroRef, heroInView] = useInView({threshold: 0.3, triggerOnce: false});
    const [projectsRef, projectsInView] = useInView({threshold: 0.1, triggerOnce: false});
    const [selectedProject, setSelectedProject] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("All Projects");

    const {data: projectsData, isLoading} = useProjects();
    const {data: personalInfo} = usePersonalInfo();

    // Parallax effect for hero
    const heroY = useTransform(scrollY, [0, 500], [0, 150]);
    const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.8]);

    const tabs = ["All Projects", "Mobile App", "Website", "Desktop"];

    const filteredProjects = projectsData?.filter(project =>
        activeTab === "All Projects" || project.category === activeTab
    ) || [];

    const handleProjectClick = (project) => {
        const defaultProjectImage = 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400&h=300&fit=crop&crop=center';

        const transformedProject = {
            id: project.id,
            name: project.name,
            description: project.description,
            shortDescription: project.short_description || project.description,
            startDate: project.start_date || 'Unknown',
            endDate: project.end_date || 'Present',
            technologies: project.technologies || [],
            category: project.category,
            image: project.image_url || defaultProjectImage,
            liveUrl: project.live_demo_url,
            sourceUrl: project.source_code_url,
            features: project.features || [],
            stats: typeof project.stats === 'object' ?
                Object.entries(project.stats).map(([key, value]) => ({label: key, value: String(value)})) :
                [
                    {label: "Duration", value: "3 months"},
                    {label: "Team Size", value: "1"},
                    {label: "Status", value: "Completed"}
                ]
        };

        setSelectedProject(transformedProject);
        setIsModalOpen(true);
    };

    // Add smooth scrolling effect
    useEffect(() => {
        document.documentElement.style.scrollBehavior = 'smooth';
        return () => {
            document.documentElement.style.scrollBehavior = 'auto';
        };
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-900 via-purple-900 to-gray-900">
                <div className="text-center">
                    <DotLottieReact
                        src="https://lottie.host/206cf556-6aab-4cc8-aa2d-7598ec0fbedc/jvDXSqpSNx.lottie"
                        loop
                        autoplay
                        className="w-64 h-64 mx-auto mb-4"
                    />
                    <p className="text-white text-lg">Loading projects...</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <ScrollProgress />
            <ScrollToTop />

            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                className="min-h-screen"
            >
                {/* Hero Section */}
                <section ref={heroRef} className="min-h-screen flex items-center justify-center px-4 pt-20 relative overflow-hidden">
                    <motion.div
                        style={{ y: heroY, opacity: heroOpacity }}
                        className="text-center max-w-4xl mx-auto relative z-10"
                    >
                        <ScrollReveal direction="down">
                            <motion.div
                                initial={{opacity: 0, y: 50}}
                                animate={heroInView ? {opacity: 1, y: 0} : {}}
                                transition={{duration: 0.8}}
                            >
                                <h1 className="text-6xl md:text-8xl font-bold mb-6">
                                    <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                        My Projects
                                    </span>
                                </h1>
                                <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
                                    Explore my portfolio of innovative applications and websites built with cutting-edge
                                    technologies and modern development practices.
                                </p>

                                {/* Stats */}
                                <div className="flex flex-wrap justify-center gap-8 mt-12">
                                    <ScrollReveal direction="up" delay={0.2}>
                                        <div className="text-center">
                                            <div className="text-3xl font-bold text-purple-400">{projectsData?.length || 0}+</div>
                                            <div className="text-sm text-gray-400">Projects Completed</div>
                                        </div>
                                    </ScrollReveal>
                                    <ScrollReveal direction="up" delay={0.3}>
                                        <div className="text-center">
                                            <div className="text-3xl font-bold text-blue-400">25+</div>
                                            <div className="text-sm text-gray-400">Technologies Used</div>
                                        </div>
                                    </ScrollReveal>
                                    <ScrollReveal direction="up" delay={0.4}>
                                        <div className="text-center">
                                            <div className="text-3xl font-bold text-pink-400">100%</div>
                                            <div className="text-sm text-gray-400">Client Satisfaction</div>
                                        </div>
                                    </ScrollReveal>
                                </div>
                            </motion.div>
                        </ScrollReveal>
                    </motion.div>
                </section>

                {/* Projects Section */}
                <section ref={projectsRef} className="py-20 px-4">
                    <div className="max-w-7xl mx-auto">
                        {/* Filter Tabs */}
                        <ScrollReveal direction="up">
                            <motion.div
                                initial={{opacity: 0, y: 30}}
                                animate={projectsInView ? {opacity: 1, y: 0} : {}}
                                transition={{duration: 0.6}}
                                className="mb-16"
                            >
                                <div className="flex items-center justify-center mb-8">
                                    <div className="flex items-center space-x-2 text-gray-400">
                                        <Filter size={20} />
                                        <span className="font-medium">Filter by category</span>
                                    </div>
                                </div>

                                <div className="flex flex-wrap justify-center gap-4">
                                    {tabs.map((tab, index) => (
                                        <motion.button
                                            key={tab}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: index * 0.1 }}
                                            whileHover={{ scale: 1.05, y: -2 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setActiveTab(tab)}
                                            className={`relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                                                activeTab === tab
                                                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25"
                                                    : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/20 hover:border-white/30"
                                            }`}
                                        >
                                            {tab}
                                            {activeTab === tab && (
                                                <motion.div
                                                    layoutId="activeTab"
                                                    className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl"
                                                    style={{ zIndex: -1 }}
                                                    transition={{ type: "spring", duration: 0.6 }}
                                                />
                                            )}
                                        </motion.button>
                                    ))}
                                </div>
                            </motion.div>
                        </ScrollReveal>

                        {/* Projects Grid */}
                        <ScrollReveal direction="up" delay={0.3}>
                            <motion.div
                                initial={{opacity: 0}}
                                animate={projectsInView ? {opacity: 1} : {}}
                                transition={{duration: 0.8, delay: 0.3}}
                                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                            >
                                {filteredProjects.map((project, index) => (
                                    <ProjectCard
                                        key={project.id}
                                        project={project}
                                        index={index}
                                        isVisible={projectsInView}
                                        onClick={() => handleProjectClick(project)}
                                    />
                                ))}
                            </motion.div>
                        </ScrollReveal>

                        {filteredProjects.length === 0 && (
                            <ScrollReveal direction="up">
                                <motion.div
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    className="text-center py-16"
                                >
                                    <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                                        <Filter size={32} className="text-purple-400" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-white mb-2">No projects found</h3>
                                    <p className="text-gray-400">Try selecting a different category or check back later for updates.</p>
                                </motion.div>
                            </ScrollReveal>
                        )}
                    </div>
                </section>

                {/* Project Modal */}
                <ProjectModal
                    project={selectedProject}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />
            </motion.div>
        </>
    );
};

export default Projects;