import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, Home, FolderOpen, Wrench, User, MessageCircle } from "lucide-react";

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

  return (
      <motion.nav
          variants={{
            visible: { y: 0 },
            hidden: { y: "-100%" },
          }}
          animate={hidden ? "hidden" : "visible"}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
              scrolled ? "backdrop-blur-xl bg-white/10 border-b border-white/20 shadow-lg shadow-purple-500/10" : ""
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link to="/" className="text-2xl font-bold text-white">
              <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
              >
                Praveen Yadav
              </motion.span>
            </Link>

            {/* Desktop Navigation */}
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
                          className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 relative ${
                              isActive
                                  ? "bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-white border border-white/20 shadow-lg shadow-purple-500/20"
                                  : "text-gray-300 hover:text-white hover:bg-white/10 hover:shadow-md"
                          }`}
                      >
                        <Icon size={18} />
                        <span className="font-medium">{item.name}</span>
                        {isActive && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-500/30"
                                transition={{ type: "spring", duration: 0.6 }}
                            />
                        )}
                      </motion.div>
                    </Link>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
            >
              <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.div>
            </motion.button>
          </div>

          {/* Mobile Navigation */}
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
                className="py-4 space-y-2 backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 mb-4 shadow-xl shadow-purple-500/10"
                initial={{ y: -20 }}
                animate={{ y: isOpen ? 0 : -20 }}
                transition={{ duration: 0.3 }}
            >
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
                          className={`flex items-center space-x-3 px-6 py-3 mx-2 rounded-xl transition-all duration-300 ${
                              isActive
                                  ? "bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-white border border-white/20"
                                  : "text-gray-300 hover:text-white hover:bg-white/10"
                          }`}
                      >
                        <Icon size={20} />
                        <span className="font-medium">{item.name}</span>
                      </motion.div>
                    </Link>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </motion.nav>
  );
};

export default Navigation;