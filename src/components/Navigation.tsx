import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, Home, FolderOpen, Wrench, User, MessageCircle, Sparkles } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const location = useLocation();

  // Track scroll direction and hide/show navbar
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }

    // Add backdrop blur when scrolled
    setScrolled(latest > 50);
  });

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Projects", path: "/projects", icon: FolderOpen },
    { name: "Skills", path: "/skills", icon: Wrench },
    { name: "About", path: "/about", icon: User },
    { name: "Contact", path: "/contact", icon: MessageCircle },
  ];

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
      <motion.nav
          variants={{
            visible: { y: 0 },
            hidden: { y: "-100%" },
          }}
          animate={hidden ? "hidden" : "visible"}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
              scrolled ?
                  "backdrop-blur-2xl bg-gray-950/80 border-b border-purple-500/20 shadow-2xl shadow-purple-500/10" :
                  "backdrop-blur-xl bg-gray-950/40 border-b border-white/5"
          }`}
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-transparent to-pink-900/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Navigation glow effect */}
        {scrolled && (
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Enhanced Logo */}
            <Link to="/" className="text-2xl font-bold text-white group relative">
              <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative flex items-center space-x-2"
              >
                <motion.div
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center"
                >
                  <Sparkles size={16} className="text-white" />
                </motion.div>

                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent font-extrabold tracking-wider">
                  Shriyan Jaiswal
                </span>

                {/* Logo glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              </motion.div>
            </Link>

            {/* Enhanced Desktop Navigation */}
            <div className="hidden md:flex space-x-2">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                    <Link key={item.name} to={item.path}>
                      <motion.div
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          className={`relative flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 group ${
                              isActive
                                  ? "bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-white border border-purple-400/30 shadow-lg shadow-purple-500/20"
                                  : "text-gray-300 hover:text-white hover:bg-gray-800/50 hover:shadow-md hover:border hover:border-white/10"
                          }`}
                      >
                        <Icon size={18} className={`transition-all duration-300 ${
                            isActive ? "text-purple-300" : "group-hover:text-purple-400"
                        }`} />
                        <span className="font-medium">{item.name}</span>

                        {/* Active indicator */}
                        {isActive && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-500/30"
                                transition={{ type: "spring", duration: 0.6 }}
                            />
                        )}

                        {/* Hover glow effect */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                            whileHover={{
                              scale: 1.1,
                              transition: { duration: 0.2 }
                            }}
                        />

                        {/* Active pulse effect */}
                        {isActive && (
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl"
                                animate={{
                                  scale: [1, 1.05, 1],
                                  opacity: [0.5, 0.8, 0.5]
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  ease: "easeInOut"
                                }}
                            />
                        )}
                      </motion.div>
                    </Link>
                );
              })}
            </div>

            {/* Enhanced Mobile Menu Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden relative p-3 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-white/10 text-white hover:bg-gray-700/50 transition-all duration-200 group"
            >
              <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative z-10"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.div>

              {/* Button glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
            </motion.button>
          </div>

          {/* Enhanced Mobile Navigation */}
          <motion.div
              initial={false}
              animate={{
                height: isOpen ? "auto" : 0,
                opacity: isOpen ? 1 : 0,
                scale: isOpen ? 1 : 0.95
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden overflow-hidden"
          >
            <motion.div
                className="py-4 space-y-2 backdrop-blur-2xl bg-gray-950/90 rounded-2xl border border-purple-500/20 mb-4 shadow-2xl shadow-purple-500/10 mx-2"
                initial={{ y: -20 }}
                animate={{ y: isOpen ? 0 : -20 }}
                transition={{ duration: 0.3 }}
            >
              {/* Mobile menu header */}
              <div className="px-6 py-2 border-b border-gray-700/30 mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <Sparkles size={12} className="text-white" />
                  </div>
                  <span className="text-white font-semibold">Navigation Menu</span>
                </div>
              </div>

              {navItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                    <Link key={item.name} to={item.path} onClick={() => setIsOpen(false)}>
                      <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -20 }}
                          transition={{ delay: isOpen ? index * 0.1 : 0 }}
                          whileHover={{ scale: 1.02, x: 4 }}
                          whileTap={{ scale: 0.98 }}
                          className={`relative flex items-center space-x-3 px-6 py-4 mx-2 rounded-xl transition-all duration-300 group ${
                              isActive
                                  ? "bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-white border border-purple-400/30 shadow-lg"
                                  : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                          }`}
                      >
                        <Icon size={20} className={`transition-colors duration-300 ${
                            isActive ? "text-purple-300" : "group-hover:text-purple-400"
                        }`} />
                        <span className="font-medium">{item.name}</span>

                        {/* Active indicator for mobile */}
                        {isActive && (
                            <motion.div
                                className="absolute right-4 w-2 h-2 bg-purple-400 rounded-full"
                                animate={{
                                  scale: [1, 1.2, 1],
                                  opacity: [0.7, 1, 0.7]
                                }}
                                transition={{
                                  duration: 1.5,
                                  repeat: Infinity,
                                  ease: "easeInOut"
                                }}
                            />
                        )}

                        {/* Mobile hover effect */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            whileHover={{
                              scale: 1.02,
                              transition: { duration: 0.2 }
                            }}
                        />
                      </motion.div>
                    </Link>
                );
              })}

              {/* Mobile menu footer */}
              <div className="px-6 py-3 border-t border-gray-700/30 mt-4">
                <div className="text-center">
                  <span className="text-gray-500 text-sm">© 2024 Shriyan Jaiswal</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Navigation border gradient */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
      </motion.nav>
  );
};

export default Navigation;