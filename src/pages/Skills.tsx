import {motion, useScroll, useSpring, useTransform} from "framer-motion";
import {useState, useEffect} from "react";
import {useInView} from "react-intersection-observer";
import {Award, ArrowUp, TrendingUp, Code, Database, Cloud, Palette, Star, CheckCircle} from "lucide-react";
import GlassCard from "../components/GlassCard";
import Footer from "../components/Footer";
import {useSkills} from "../hooks/useSkills";
import {useCertifications} from "../hooks/useCertifications";
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

// Enhanced Skill Card Component
const SkillCard = ({ skill, index, isVisible }) => {
    const categoryIcons = {
        "Programming Languages": Code,
        "Frontend Development": Palette,
        "Backend Development": Database,
        "Database": Database,
        "Cloud & Deployment": Cloud,
        "Development Tools": Star,
        "Data Analysis": TrendingUp,
        "Design & Other": Palette
    };

    const CategoryIcon = categoryIcons[skill.category] || Code;

    return (
        <ScrollReveal direction="up" delay={index * 0.05} threshold={0.1}>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{
                    duration: 0.5,
                    delay: index * 0.05,
                    ease: [0.25, 0.1, 0.25, 1]
                }}
                className="transform-gpu h-full"
            >
                <GlassCard
                    variant="gradient"
                    className="text-center h-full p-6 group hover:border-green-500/40 transition-all duration-300"
                    hover={true}
                >
                    <div className="relative">
                        {/* Skill Icon/Emoji */}
                        <motion.div
                            className="text-5xl mb-4 filter drop-shadow-lg"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ duration: 0.3 }}
                        >
                            {skill.icon}
                        </motion.div>

                        {/* Category Badge */}
                        <div className="absolute top-0 right-0">
                            <div className="p-2 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-full border border-green-500/30">
                                <CategoryIcon size={16} className="text-green-400" />
                            </div>
                        </div>

                        {/* Skill Name */}
                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-green-300 transition-colors">
                            {skill.name}
                        </h3>

                        {/* Description */}
                        <p className="text-gray-300 text-sm mb-6 leading-relaxed line-clamp-3">
                            {skill.description}
                        </p>

                        {/* Proficiency Section */}
                        <div className="space-y-3">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-400 font-medium">Proficiency</span>
                                <span className="text-green-400 font-bold text-lg">{skill.proficiency}%</span>
                            </div>

                            {/* Progress Bar */}
                            <div className="relative">
                                <div className="w-full bg-gray-700/50 rounded-full h-3 overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={isVisible ? { width: `${skill.proficiency}%` } : {}}
                                        transition={{
                                            duration: 1.2,
                                            delay: index * 0.1,
                                            ease: [0.25, 0.1, 0.25, 1]
                                        }}
                                        className="bg-gradient-to-r from-green-400 via-blue-400 to-green-500 h-full rounded-full relative overflow-hidden"
                                    >
                                        {/* Shimmer effect */}
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                            animate={{
                                                x: [-100, 100],
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                ease: "linear",
                                            }}
                                        />
                                    </motion.div>
                                </div>
                            </div>

                            {/* Skill Level Text */}
                            <div className="text-xs text-center">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    skill.proficiency >= 90 ? 'bg-green-500/20 text-green-300' :
                                        skill.proficiency >= 75 ? 'bg-blue-500/20 text-blue-300' :
                                            skill.proficiency >= 50 ? 'bg-yellow-500/20 text-yellow-300' :
                                                'bg-orange-500/20 text-orange-300'
                                }`}>
                                    {skill.proficiency >= 90 ? 'Expert' :
                                        skill.proficiency >= 75 ? 'Advanced' :
                                            skill.proficiency >= 50 ? 'Intermediate' : 'Beginner'}
                                </span>
                            </div>
                        </div>
                    </div>
                </GlassCard>
            </motion.div>
        </ScrollReveal>
    );
};

// Enhanced Certification Card Component
const CertificationCard = ({ cert, index, isVisible }) => {
    return (
        <ScrollReveal direction="up" delay={index * 0.1} threshold={0.1}>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: [0.25, 0.1, 0.25, 1]
                }}
                className="transform-gpu h-full"
            >
                <GlassCard
                    variant="premium"
                    className="text-center h-full p-6 group hover:border-yellow-500/40 transition-all duration-300"
                    glow={true}
                    hover={true}
                >
                    <div className="relative">
                        {/* Certificate Icon */}
                        <motion.div
                            className="flex justify-center mb-6"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="relative">
                                <div className="p-4 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 rounded-full shadow-xl">
                                    <Award size={36} className="text-white"/>
                                </div>
                                {/* Verification badge */}
                                <div className="absolute -top-1 -right-1 p-1 bg-green-500 rounded-full border-2 border-white">
                                    <CheckCircle size={16} className="text-white" />
                                </div>
                            </div>
                        </motion.div>

                        {/* Certificate Details */}
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-300 transition-colors">
                            {cert.name}
                        </h3>

                        <p className="text-purple-300 font-semibold mb-2 text-lg">
                            {cert.organization}
                        </p>

                        <p className="text-gray-400 text-sm mb-4 font-medium">
                            Issued: {cert.date}
                        </p>

                        {/* Certificate ID if available */}
                        {cert.id && (
                            <p className="text-xs text-gray-500 mb-4 font-mono">
                                ID: {cert.id}
                            </p>
                        )}

                        {/* Action Button */}
                        {cert.link && (
                            <motion.a
                                href={cert.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25"
                            >
                                <Award size={16} />
                                <span>View Certificate</span>
                            </motion.a>
                        )}

                        {/* Decorative elements */}
                        <div className="absolute top-4 right-4 w-2 h-2 bg-yellow-400 rounded-full opacity-60"></div>
                        <div className="absolute bottom-4 left-4 w-1 h-1 bg-orange-400 rounded-full opacity-40"></div>
                    </div>
                </GlassCard>
            </motion.div>
        </ScrollReveal>
    );
};

const Skills = () => {
    const { scrollY } = useScroll();
    const [heroRef, heroInView] = useInView({threshold: 0.3, triggerOnce: false});
    const [skillsRef, skillsInView] = useInView({threshold: 0.1, triggerOnce: false});
    const [certsRef, certsInView] = useInView({threshold: 0.1, triggerOnce: false});
    const [activeTab, setActiveTab] = useState("All Skills");

    const {data: skillsData, isLoading: skillsLoading} = useSkills();
    const {data: certificationsData, isLoading: certsLoading} = useCertifications();
    const {data: personalInfo} = usePersonalInfo();

    // Parallax effect for hero
    const heroY = useTransform(scrollY, [0, 500], [0, 150]);
    const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.8]);

    const skillCategories = [
        "All Skills",
        "Programming Languages",
        "Frontend Development",
        "Backend Development",
        "Development Tools",
        "Database",
        "Cloud & Deployment",
        "Data Analysis",
        "Design & Other"
    ];

    const filteredSkills = skillsData?.filter(skill =>
        activeTab === "All Skills" || skill.category === activeTab
    ) || [];

    const groupedSkills = {};

    skillCategories.forEach(category => {
        if (category === "All Skills") return;

        const skillsInCategory = skillsData?.filter(skill => skill.category === category) || [];
        if (skillsInCategory.length > 0) {
            groupedSkills[category] = skillsInCategory;
        }
    });

    // Calculate skill statistics
    const skillStats = {
        totalSkills: skillsData?.length || 0,
        averageProficiency: skillsData ? Math.round(skillsData.reduce((acc, skill) => acc + skill.proficiency, 0) / skillsData.length) : 0,
        expertSkills: skillsData?.filter(skill => skill.proficiency >= 90).length || 0,
        categories: Object.keys(groupedSkills).length
    };

    // Add smooth scrolling effect
    useEffect(() => {
        document.documentElement.style.scrollBehavior = 'smooth';
        return () => {
            document.documentElement.style.scrollBehavior = 'auto';
        };
    }, []);

    if (skillsLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-pink-900 to-gray-900">
                <div className="text-center">
                    <DotLottieReact
                        src="https://lottie.host/206cf556-6aab-4cc8-aa2d-7598ec0fbedc/jvDXSqpSNx.lottie"
                        loop
                        autoplay
                        className="w-64 h-64 mx-auto mb-4"
                    />
                    <p className="text-white text-lg">Loading skills...</p>
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
                                    <span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                                        My Skills
                                    </span>
                                </h1>
                                <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-12">
                                    A comprehensive overview of my technical expertise, professional capabilities, and continuous learning journey.
                                </p>

                                {/* Skills Stats */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                                    <ScrollReveal direction="up" delay={0.2}>
                                        <div className="text-center">
                                            <div className="text-4xl font-bold text-green-400">{skillStats.totalSkills}+</div>
                                            <div className="text-sm text-gray-400">Technical Skills</div>
                                        </div>
                                    </ScrollReveal>
                                    <ScrollReveal direction="up" delay={0.3}>
                                        <div className="text-center">
                                            <div className="text-4xl font-bold text-blue-400">{skillStats.categories}</div>
                                            <div className="text-sm text-gray-400">Categories</div>
                                        </div>
                                    </ScrollReveal>
                                    <ScrollReveal direction="up" delay={0.4}>
                                        <div className="text-center">
                                            <div className="text-4xl font-bold text-purple-400">{skillStats.averageProficiency}%</div>
                                            <div className="text-sm text-gray-400">Avg Proficiency</div>
                                        </div>
                                    </ScrollReveal>
                                    <ScrollReveal direction="up" delay={0.5}>
                                        <div className="text-center">
                                            <div className="text-4xl font-bold text-yellow-400">{skillStats.expertSkills}</div>
                                            <div className="text-sm text-gray-400">Expert Level</div>
                                        </div>
                                    </ScrollReveal>
                                </div>
                            </motion.div>
                        </ScrollReveal>
                    </motion.div>
                </section>

                {/* Skills Section */}
                <section ref={skillsRef} className="py-20 px-4">
                    <div className="max-w-7xl mx-auto">
                        {/* Filter Tabs */}
                        <ScrollReveal direction="up">
                            <motion.div
                                initial={{opacity: 0, y: 30}}
                                animate={skillsInView ? {opacity: 1, y: 0} : {}}
                                transition={{duration: 0.6}}
                                className="mb-16"
                            >
                                <div className="flex items-center justify-center mb-8">
                                    <div className="flex items-center space-x-2 text-gray-400">
                                        <Code size={20} />
                                        <span className="font-medium">Filter by category</span>
                                    </div>
                                </div>

                                <div className="flex flex-wrap justify-center gap-3">
                                    {skillCategories.map((category, index) => (
                                        <motion.button
                                            key={category}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: index * 0.05 }}
                                            whileHover={{ scale: 1.05, y: -2 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setActiveTab(category)}
                                            className={`relative px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300 ${
                                                activeTab === category
                                                    ? "bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg shadow-green-500/25"
                                                    : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/20 hover:border-white/30"
                                            }`}
                                        >
                                            {category}
                                            {activeTab === category && (
                                                <motion.div
                                                    layoutId="activeSkillTab"
                                                    className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl"
                                                    style={{ zIndex: -1 }}
                                                    transition={{ type: "spring", duration: 0.6 }}
                                                />
                                            )}
                                        </motion.button>
                                    ))}
                                </div>
                            </motion.div>
                        </ScrollReveal>

                        {/* Skills Grid */}
                        {activeTab === "All Skills" ? (
                            Object.entries(groupedSkills).map(([category, skills], categoryIndex) => (
                                <ScrollReveal key={category} direction="up" delay={categoryIndex * 0.1}>
                                    <motion.div
                                        initial={{opacity: 0, y: 50}}
                                        animate={skillsInView ? {opacity: 1, y: 0} : {}}
                                        transition={{duration: 0.6, delay: categoryIndex * 0.1}}
                                        className="mb-16"
                                    >
                                        <h2 className="text-3xl font-bold text-white mb-8 text-center">
                                            <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                                                {category}
                                            </span>
                                        </h2>
                                        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                            {skills.map((skill, index) => (
                                                <SkillCard
                                                    key={skill.id}
                                                    skill={skill}
                                                    index={index}
                                                    isVisible={skillsInView}
                                                />
                                            ))}
                                        </div>
                                    </motion.div>
                                </ScrollReveal>
                            ))
                        ) : (
                            <ScrollReveal direction="up">
                                <motion.div
                                    initial={{opacity: 0}}
                                    animate={skillsInView ? {opacity: 1} : {}}
                                    transition={{duration: 0.6}}
                                    className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                                >
                                    {filteredSkills.map((skill, index) => (
                                        <SkillCard
                                            key={skill.id}
                                            skill={skill}
                                            index={index}
                                            isVisible={skillsInView}
                                        />
                                    ))}
                                </motion.div>
                            </ScrollReveal>
                        )}
                    </div>
                </section>

                {/* Certifications Section */}
                {!certsLoading && certificationsData && certificationsData.length > 0 && (
                    <section ref={certsRef} className="py-20 px-4">
                        <div className="max-w-7xl mx-auto">
                            <ScrollReveal direction="up">
                                <motion.div
                                    initial={{opacity: 0, y: 50}}
                                    animate={certsInView ? {opacity: 1, y: 0} : {}}
                                    transition={{duration: 0.8}}
                                    className="text-center mb-16"
                                >
                                    <h2 className="text-4xl md:text-6xl font-bold mb-6">
                                        <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                                            Certifications
                                        </span>
                                    </h2>
                                    <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                                        Professional certifications and achievements that validate my expertise and commitment to continuous learning.
                                    </p>

                                    {/* Certification Stats */}
                                    <div className="flex justify-center items-center space-x-8 mt-8">
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-yellow-400">{certificationsData.length}</div>
                                            <div className="text-xs text-gray-400">Certificates</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-orange-400">100%</div>
                                            <div className="text-xs text-gray-400">Verified</div>
                                        </div>
                                    </div>
                                </motion.div>
                            </ScrollReveal>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {certificationsData.map((cert, index) => (
                                    <CertificationCard
                                        key={cert.id}
                                        cert={cert}
                                        index={index}
                                        isVisible={certsInView}
                                    />
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </motion.div>
        </>
    );
};

export default Skills;