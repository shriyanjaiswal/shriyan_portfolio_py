import { motion } from "framer-motion";
import {
    Github,
    Linkedin,
    Mail,
    MapPin,
    Heart,
    Send,
    Award,
    Code,
    Briefcase,
    Coffee,
    Twitter,
    Instagram,
    Globe,
    Sparkles,
    Star,
    Zap
} from "lucide-react";
import {usePersonalInfo} from "@/hooks/usePersonalInfo.ts";
import {DotLottieReact} from "@lottiefiles/dotlottie-react";

// Enhanced Professional Footer Component with Dark Theme
const Footer = () => {
    const currentYear = new Date().getFullYear();

    const {data: personalInfo, isLoading: loadingInfo} = usePersonalInfo();

    const footerNavigation = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Projects', href: '#projects' },
        { name: 'Skills', href: '#skills' },
        { name: 'Contact', href: '#contact' }
    ];

    const services = [
        { name: 'Web Development', href: '#', icon: Code },
        { name: 'Mobile Apps', href: '#', icon: Sparkles },
        { name: 'UI/UX Design', href: '#', icon: Star },
        { name: 'Consulting', href: '#', icon: Zap }
    ];

    const socialLinks = [
        { icon: Github, href: personalInfo?.github_url, label: 'GitHub', color: 'hover:text-purple-400', bgColor: 'hover:bg-purple-500/20' },
        { icon: Linkedin, href: personalInfo?.linkedin_url, label: 'LinkedIn', color: 'hover:text-blue-400', bgColor: 'hover:bg-blue-500/20' },
        { icon: Mail, href: `mailto:${personalInfo?.email}`, label: 'Email', color: 'hover:text-green-400', bgColor: 'hover:bg-green-500/20' },
        { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:text-sky-400', bgColor: 'hover:bg-sky-500/20' },
        { icon: Instagram, href: '#', label: 'Instagram', color: 'hover:text-pink-400', bgColor: 'hover:bg-pink-500/20' }
    ].filter(social => social.href && social.href !== '#');

    const achievements = [
        { icon: Award, text: "15+ Projects Completed", color: "text-yellow-400" },
        { icon: Code, text: "25+ Technologies", color: "text-blue-400" },
        { icon: Briefcase, text: "2+ Years Experience", color: "text-green-400" },
        { icon: Coffee, text: "100+ Cups of Coffee", color: "text-orange-400" }
    ];

    if (loadingInfo) {
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

    return (
        <footer className="relative overflow-hidden bg-gradient-to-br from-gray-950 via-purple-950/50 to-gray-950">
            {/* Enhanced Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.3),transparent_70%)]"></div>
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        backgroundSize: '60px 60px'
                    }}
                ></div>
            </div>

            {/* Animated border gradient */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

            <div className="relative max-w-7xl mx-auto px-4 py-20">
                {/* Top Section */}
                <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12 mb-16">
                    {/* Enhanced Brand Section */}
                    <div className="lg:col-span-2">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            {/* Logo with animation */}
                            <div className="flex items-center space-x-3 mb-6">
                                <motion.div
                                    animate={{
                                        rotate: [0, 360],
                                        scale: [1, 1.1, 1]
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }}
                                    className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-xl"
                                >
                                    <Sparkles size={24} className="text-white" />
                                </motion.div>

                                <h3 className="text-3xl font-bold text-white">
                                    <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                                        {personalInfo?.name || 'Praveen Yadav'}
                                    </span>
                                </h3>
                            </div>

                            <p className="text-gray-300 mb-8 max-w-md leading-relaxed text-lg">
                                Crafting exceptional digital experiences with cutting-edge technologies.
                                Let's build something amazing together.
                            </p>

                            {/* Enhanced Achievement Stats */}
                            <div className="grid grid-cols-2 gap-6 mb-8">
                                {achievements.map((achievement, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        className="flex items-center space-x-3 p-3 rounded-xl bg-gray-900/30 backdrop-blur-sm border border-gray-700/30 hover:border-purple-500/30 transition-all duration-300 group"
                                    >
                                        <achievement.icon size={20} className={`${achievement.color} group-hover:scale-110 transition-transform duration-300`} />
                                        <span className="text-gray-300 text-sm group-hover:text-white transition-colors duration-300">{achievement.text}</span>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Enhanced Social Links */}
                            <div className="flex space-x-4">
                                {socialLinks.map((social, index) => (
                                    <motion.a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        initial={{ opacity: 0, scale: 0 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                        whileHover={{ scale: 1.1, y: -3 }}
                                        className={`p-4 bg-gray-900/40 backdrop-blur-sm rounded-xl border border-gray-700/30 text-gray-400 ${social.color} ${social.bgColor} transition-all duration-300 group relative overflow-hidden`}
                                        aria-label={social.label}
                                    >
                                        <social.icon size={20} className="relative z-10" />

                                        {/* Hover glow effect */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Enhanced Quick Links */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            viewport={{ once: true }}
                        >
                            <h4 className="text-xl font-semibold text-white mb-6 flex items-center">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mr-3">
                                    <Globe size={16} className="text-white" />
                                </div>
                                Quick Links
                            </h4>
                            <ul className="space-y-3">
                                {footerNavigation.map((item, index) => (
                                    <motion.li
                                        key={item.name}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                    >
                                        <motion.a
                                            href={item.href}
                                            whileHover={{ x: 8, scale: 1.02 }}
                                            className="text-gray-400 hover:text-purple-400 transition-all duration-200 text-sm flex items-center group py-2 px-3 rounded-lg hover:bg-gray-800/30"
                                        >
                                            <motion.span
                                                className="w-2 h-2 bg-purple-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                                whileHover={{ scale: 1.5 }}
                                            />
                                            <span className="group-hover:font-medium transition-all duration-200">{item.name}</span>
                                        </motion.a>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>

                    {/* Enhanced Services */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <h4 className="text-xl font-semibold text-white mb-6 flex items-center">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mr-3">
                                    <Briefcase size={16} className="text-white" />
                                </div>
                                Services
                            </h4>
                            <ul className="space-y-3">
                                {services.map((service, index) => (
                                    <motion.li
                                        key={service.name}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                    >
                                        <motion.a
                                            href={service.href}
                                            whileHover={{ x: 8, scale: 1.02 }}
                                            className="text-gray-400 hover:text-blue-400 transition-all duration-200 text-sm flex items-center group py-2 px-3 rounded-lg hover:bg-gray-800/30"
                                        >
                                            <service.icon size={16} className="mr-3 text-gray-500 group-hover:text-blue-400 transition-colors duration-200" />
                                            <span className="group-hover:font-medium transition-all duration-200">{service.name}</span>
                                        </motion.a>
                                    </motion.li>
                                ))}
                            </ul>

                            {/* Enhanced Contact Info */}
                            <div className="mt-8 space-y-4">
                                <h5 className="text-lg font-medium text-white mb-4 flex items-center">
                                    <Mail size={18} className="mr-2 text-green-400" />
                                    Get In Touch
                                </h5>
                                <motion.div
                                    className="flex items-center space-x-3 text-gray-400 text-sm p-3 rounded-lg bg-gray-900/20 backdrop-blur-sm border border-gray-700/30"
                                    whileHover={{ scale: 1.02, borderColor: "rgba(139, 92, 246, 0.3)" }}
                                >
                                    <Mail size={16} className="text-green-400" />
                                    <span className="font-mono">{personalInfo?.email}</span>
                                </motion.div>
                                <motion.div
                                    className="flex items-center space-x-3 text-gray-400 text-sm p-3 rounded-lg bg-gray-900/20 backdrop-blur-sm border border-gray-700/30"
                                    whileHover={{ scale: 1.02, borderColor: "rgba(139, 92, 246, 0.3)" }}
                                >
                                    <MapPin size={16} className="text-blue-400" />
                                    <span>Sarnath, India</span>
                                </motion.div>
                                <motion.div
                                    className="flex items-center space-x-3 text-gray-400 text-sm p-3 rounded-lg bg-gray-900/20 backdrop-blur-sm border border-gray-700/30"
                                    whileHover={{ scale: 1.02, borderColor: "rgba(139, 92, 246, 0.3)" }}
                                >
                                    <Globe size={16} className="text-purple-400" />
                                    <span>Available Worldwide</span>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Enhanced Newsletter Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="relative bg-gradient-to-r from-purple-900/30 via-gray-900/50 to-pink-900/30 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-12 mb-16 overflow-hidden"
                >
                    {/* Background animation */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-pink-600/5 animate-pulse" />

                    <div className="relative max-w-2xl mx-auto text-center">
                        <motion.div
                            animate={{
                                rotate: [0, 360],
                                scale: [1, 1.1, 1]
                            }}
                            transition={{
                                duration: 6,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                            className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-6 shadow-2xl"
                        >
                            <Send size={24} className="text-white" />
                        </motion.div>

                        <h4 className="text-3xl font-bold text-white mb-4">Stay Updated</h4>
                        <p className="text-gray-300 mb-8 text-lg">Get notified about new projects and tech insights</p>

                        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-6 py-4 bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
                            />
                            <motion.button
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-xl hover:shadow-xl hover:shadow-purple-500/25 transition-all duration-200 flex items-center justify-center space-x-2"
                            >
                                <Send size={18} />
                                <span>Subscribe</span>
                            </motion.button>
                        </div>

                        <p className="text-gray-500 text-sm mt-4">No spam, unsubscribe at any time</p>
                    </div>
                </motion.div>

                {/* Enhanced Bottom Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="pt-8 border-t border-gray-800/50"
                >
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <motion.p
                            className="text-gray-400 text-sm"
                            whileHover={{ scale: 1.02 }}
                        >
                            © {currentYear} <span className="text-purple-400 font-medium">{personalInfo?.name || 'Praveen Yadav'}</span>. All rights reserved.
                        </motion.p>

                        <div className="flex items-center space-x-2 text-gray-400 text-sm">
                            <span>Crafted with</span>
                            <motion.div
                                animate={{
                                    scale: [1, 1.3, 1],
                                    rotate: [0, 5, -5, 0]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            >
                                <Heart size={16} className="text-red-400 fill-current" />
                            </motion.div>
                            <span>using</span>
                            <span className="text-purple-400 font-medium">React & Framer Motion</span>
                        </div>
                    </div>

                    {/* Tech stack badges */}
                    <motion.div
                        className="flex flex-wrap justify-center gap-3 mt-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        viewport={{ once: true }}
                    >
                        {['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Three.js'].map((tech, index) => (
                            <motion.span
                                key={tech}
                                whileHover={{ scale: 1.1, y: -2 }}
                                className="px-3 py-1 bg-gray-800/50 backdrop-blur-sm border border-gray-700/30 rounded-full text-xs text-gray-400 hover:text-purple-400 hover:border-purple-500/30 transition-all duration-200"
                            >
                                {tech}
                            </motion.span>
                        ))}
                    </motion.div>
                </motion.div>
            </div>

            {/* Enhanced floating elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-purple-400/30 rounded-full"
                        animate={{
                            x: [0, 100, 0],
                            y: [0, -100, 0],
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0],
                        }}
                        transition={{
                            duration: 8 + i * 2,
                            repeat: Infinity,
                            delay: i * 1.5,
                            ease: "easeInOut",
                        }}
                        style={{
                            left: `${10 + i * 15}%`,
                            top: `${80 - i * 10}%`,
                        }}
                    />
                ))}
            </div>
        </footer>
    );
};

export default Footer;