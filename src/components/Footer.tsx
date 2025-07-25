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
    Globe
} from "lucide-react";
import {usePersonalInfo} from "@/hooks/usePersonalInfo.ts";
import {DotLottieReact} from "@lottiefiles/dotlottie-react";

// Enhanced Professional Footer Component
const Footer = () => {
    const currentYear = new Date().getFullYear();

    const {data: personalInfo, isLoading: loadingInfo} = usePersonalInfo();

    const footerNavigation = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Projects', href: '#projects' },
        { name: 'Services', href: '#services' },
        { name: 'Contact', href: '#contact' }
    ];

    const services = [
        { name: 'Web Development', href: '#' },
        { name: 'Mobile Apps', href: '#' },
        { name: 'UI/UX Design', href: '#' },
        { name: 'Consulting', href: '#' }
    ];

    const socialLinks = [
        { icon: Github, href: personalInfo?.github_url, label: 'GitHub', color: 'hover:text-gray-300' },
        { icon: Linkedin, href: personalInfo?.linkedin_url, label: 'LinkedIn', color: 'hover:text-blue-400' },
        { icon: Mail, href: `mailto:${personalInfo?.email}`, label: 'Email', color: 'hover:text-green-400' },
        { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:text-blue-400' },
        { icon: Instagram, href: '#', label: 'Instagram', color: 'hover:text-pink-400' }
    ].filter(social => social.href && social.href !== '#');

    const achievements = [
        { icon: Award, text: "15+ Projects Completed" },
        { icon: Code, text: "25+ Technologies" },
        { icon: Briefcase, text: "2+ Years Experience" },
        { icon: Coffee, text: "100+ Cups of Coffee" }
    ];

    if (loadingInfo) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
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
        <footer className="relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.3),transparent_50%)]"></div>
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        backgroundSize: '60px 60px'
                    }}
                ></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 py-16">
                {/* Top Section */}
                <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mb-12">
                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <h3 className="text-3xl font-bold text-white mb-4">
                                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                    {personalInfo?.name || 'Praveen Yadav'}
                                </span>
                            </h3>
                            <p className="text-gray-400 mb-6 max-w-md leading-relaxed text-lg">
                                Crafting exceptional digital experiences with cutting-edge technologies.
                                Let's build something amazing together.
                            </p>

                            {/* Achievement Stats */}
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                {achievements.map((achievement, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                        className="flex items-center space-x-2 text-gray-300 text-sm"
                                    >
                                        <achievement.icon size={16} className="text-purple-400" />
                                        <span>{achievement.text}</span>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Social Links */}
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
                                        whileHover={{ scale: 1.1, y: -2 }}
                                        className={`p-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 text-gray-400 ${social.color} transition-all duration-300 hover:bg-white/10 hover:border-white/20`}
                                        aria-label={social.label}
                                    >
                                        <social.icon size={20} />
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            viewport={{ once: true }}
                        >
                            <h4 className="text-xl font-semibold text-white mb-6">Quick Links</h4>
                            <ul className="space-y-3">
                                {footerNavigation.map((item, index) => (
                                    <motion.li
                                        key={item.name}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                    >
                                        <a
                                            href={item.href}
                                            className="text-gray-400 hover:text-purple-400 transition-colors duration-200 text-sm flex items-center group"
                                        >
                                            <span className="w-2 h-2 bg-purple-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                                            {item.name}
                                        </a>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>

                    {/* Services */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <h4 className="text-xl font-semibold text-white mb-6">Services</h4>
                            <ul className="space-y-3">
                                {services.map((service, index) => (
                                    <motion.li
                                        key={service.name}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                    >
                                        <a
                                            href={service.href}
                                            className="text-gray-400 hover:text-purple-400 transition-colors duration-200 text-sm flex items-center group"
                                        >
                                            <span className="w-2 h-2 bg-purple-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                                            {service.name}
                                        </a>
                                    </motion.li>
                                ))}
                            </ul>

                            {/* Contact Info */}
                            <div className="mt-8 space-y-3">
                                <h5 className="text-lg font-medium text-white mb-4">Get In Touch</h5>
                                <div className="flex items-center space-x-2 text-gray-400 text-sm">
                                    <Mail size={16} className="text-purple-400" />
                                    <span>{personalInfo?.email}</span>
                                </div>
                                <div className="flex items-center space-x-2 text-gray-400 text-sm">
                                    <MapPin size={16} className="text-purple-400" />
                                    <span>Sarnath, India</span>
                                </div>
                                <div className="flex items-center space-x-2 text-gray-400 text-sm">
                                    <Globe size={16} className="text-purple-400" />
                                    <span>Available Worldwide</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Newsletter Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8 mb-12"
                >
                    <div className="max-w-2xl mx-auto text-center">
                        <h4 className="text-2xl font-bold text-white mb-4">Stay Updated</h4>
                        <p className="text-gray-400 mb-6">Get notified about new projects and tech insights</p>
                        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors duration-200"
                            />
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2"
                            >
                                <Send size={18} />
                                <span>Subscribe</span>
                            </motion.button>
                        </div>
                    </div>
                </motion.div>

                {/* Bottom Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="pt-8 border-t border-gray-700/50"
                >
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-gray-400 text-sm">
                            © {currentYear} {personalInfo?.name || 'Praveen Yadav'}. All rights reserved.
                        </p>
                        <div className="flex items-center space-x-2 text-gray-400 text-sm">
                            <span>Crafted with</span>
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 1, repeat: Infinity }}
                            >
                                <Heart size={16} className="text-red-400 fill-current" />
                            </motion.div>
                            <span>using React & Framer Motion</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;