import {motion, useScroll, useSpring, useTransform} from "framer-motion";
import {useState, useEffect} from "react";
import {useInView} from "react-intersection-observer";
import {Mail, Github, Linkedin, Phone, MapPin, Send, ArrowUp, MessageCircle, Clock, CheckCircle, Star} from "lucide-react";
import GlassCard from "../components/GlassCard";
import Footer from "../components/Footer";
import {usePersonalInfo} from "../hooks/usePersonalInfo";
import {supabase} from "@/integrations/supabase/client";
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
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 z-50 transform-gpu"
          style={{ scaleX, transformOrigin: "0%" }}
      />
  );
};

// Enhanced Contact Info Card Component
const ContactInfoCard = ({ icon: Icon, title, value, href, gradient, delay }) => {
  return (
      <ScrollReveal direction="up" delay={delay}>
        <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="transform-gpu"
        >
          <motion.a
              href={href}
              className="block"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
          >
            <GlassCard
                variant="gradient"
                className="text-center cursor-pointer p-6 group hover:border-pink-500/40 transition-all duration-300"
                glow={true}
                hover={true}
            >
              <motion.div
                  className="flex justify-center mb-4"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
              >
                <div className={`p-4 bg-gradient-to-r ${gradient} rounded-full shadow-lg`}>
                  <Icon size={28} className="text-white" />
                </div>
              </motion.div>
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-pink-300 transition-colors">
                {title}
              </h3>
              <p className="text-gray-300 text-sm group-hover:text-white transition-colors">
                {value}
              </p>

              {/* Hover indicator */}
              <motion.div
                  className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ y: 10 }}
                  whileHover={{ y: 0 }}
              >
                <span className="text-xs text-pink-400 font-medium">Click to {title.toLowerCase()}</span>
              </motion.div>
            </GlassCard>
          </motion.a>
        </motion.div>
      </ScrollReveal>
  );
};

// Enhanced Social Link Component
const SocialLink = ({ icon: Icon, href, label, delay }) => {
  return (
      <ScrollReveal direction="up" delay={delay}>
        <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 text-white hover:bg-white/20 transition-all duration-300 group"
        >
          <Icon size={28} />

          {/* Tooltip */}
          <motion.div
              className="absolute -top-12 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-black/80 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              initial={{ y: 10 }}
              whileHover={{ y: 0 }}
          >
            {label}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/80"></div>
          </motion.div>
        </motion.a>
      </ScrollReveal>
  );
};

// Enhanced Form Field Component
const FormField = ({ type = "text", name, label, placeholder, value, onChange, required = false, rows, delay = 0 }) => {
  const [isFocused, setIsFocused] = useState(false);

  const inputProps = {
    id: name,
    name,
    value,
    onChange,
    required,
    placeholder,
    onFocus: () => setIsFocused(true),
    onBlur: () => setIsFocused(false),
    className: `w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-300 ${
        isFocused ? 'border-pink-500/50 bg-white/15' : ''
    }`
  };

  return (
      <ScrollReveal direction="up" delay={delay}>
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            className="space-y-2"
        >
          <motion.label
              htmlFor={name}
              className={`block font-medium transition-colors duration-300 ${
                  isFocused ? 'text-pink-300' : 'text-white'
              }`}
              animate={{ scale: isFocused ? 1.02 : 1 }}
          >
            {label} {required && <span className="text-pink-400">*</span>}
          </motion.label>

          {type === 'textarea' ? (
              <motion.textarea
                  {...inputProps}
                  rows={rows}
                  className={`${inputProps.className} resize-none`}
                  whileFocus={{ scale: 1.01 }}
              />
          ) : (
              <motion.input
                  type={type}
                  {...inputProps}
                  whileFocus={{ scale: 1.01 }}
              />
          )}

          {/* Character counter for message */}
          {type === 'textarea' && value && (
              <motion.div
                  className="text-right text-xs text-gray-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
              >
                {value.length} characters
              </motion.div>
          )}
        </motion.div>
      </ScrollReveal>
  );
};

const Contact = () => {
  const { scrollY } = useScroll();
  const [heroRef, heroInView] = useInView({ threshold: 0.3, triggerOnce: false });
  const [formRef, formInView] = useInView({ threshold: 0.2, triggerOnce: false });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null

  const { data: personalInfo, isLoading } = usePersonalInfo();

  // Parallax effect for hero
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.8]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      console.log("Submitting contact form:", formData);

      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: formData
      });

      if (error) {
        console.error("Error sending email:", error);
        setSubmitStatus('error');
      } else {
        console.log("Email sent successfully:", data);
        setSubmitStatus('success');
        setFormData({ name: "", email: "", message: "" });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-pink-900 to-purple-900">
          <div className="text-center">
            <DotLottieReact
                src="https://lottie.host/206cf556-6aab-4cc8-aa2d-7598ec0fbedc/jvDXSqpSNx.lottie"
                loop
                autoplay
                className="w-64 h-64 mx-auto mb-4"
            />
            <p className="text-white text-lg">Loading contact information...</p>
          </div>
        </div>
    );
  }

  if (!personalInfo) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-pink-900 to-purple-900">
          <div className="text-center">
            <div className="text-white text-xl mb-4">Failed to load contact information</div>
            <button
                onClick={() => window.location.reload()}
                className="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
    );
  }

  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
      gradient: "from-pink-500 to-purple-500"
    },
    {
      icon: Phone,
      title: "Phone",
      value: personalInfo.phone || "+1 (555) 123-4567",
      href: `tel:${personalInfo.phone || "+15551234567"}`,
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: MapPin,
      title: "Location",
      value: personalInfo.location,
      href: `https://maps.google.com/?q=${encodeURIComponent(personalInfo.location || "Your Location")}`,
      gradient: "from-green-500 to-emerald-500"
    }
  ].filter(method => method.value);

  const socialLinks = [
    {
      icon: Github,
      href: personalInfo.github_url,
      label: "GitHub Profile"
    },
    {
      icon: Linkedin,
      href: personalInfo.linkedin_url,
      label: "LinkedIn Profile"
    },
    {
      icon: Mail,
      href: `mailto:${personalInfo.email}`,
      label: "Send Email"
    }
  ].filter(social => social.href);

  return (
      <>
        <ScrollProgress />
        <ScrollToTop />

        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
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
                    initial={{ opacity: 0, y: 50 }}
                    animate={heroInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                  <h1 className="text-6xl md:text-8xl font-bold mb-6">
                                    <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                                        Get In Touch
                                    </span>
                  </h1>
                  <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
                    Ready to collaborate on your next project? Let's discuss how we can bring your innovative ideas to life with cutting-edge technology.
                  </p>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                    <ScrollReveal direction="up" delay={0.2}>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-pink-400">24h</div>
                        <div className="text-sm text-gray-400">Response Time</div>
                      </div>
                    </ScrollReveal>
                    <ScrollReveal direction="up" delay={0.3}>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-purple-400">100%</div>
                        <div className="text-sm text-gray-400">Client Satisfaction</div>
                      </div>
                    </ScrollReveal>
                    <ScrollReveal direction="up" delay={0.4}>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-400">15+</div>
                        <div className="text-sm text-gray-400">Projects Delivered</div>
                      </div>
                    </ScrollReveal>
                    <ScrollReveal direction="up" delay={0.5}>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-400">∞</div>
                        <div className="text-sm text-gray-400">Possibilities</div>
                      </div>
                    </ScrollReveal>
                  </div>
                </motion.div>
              </ScrollReveal>

              {/* Contact Info Cards */}
              <div className="grid md:grid-cols-3 gap-6 mb-16">
                {contactMethods.map((method, index) => (
                    <ContactInfoCard
                        key={method.title}
                        icon={method.icon}
                        title={method.title}
                        value={method.value}
                        href={method.href}
                        gradient={method.gradient}
                        delay={0.1 + index * 0.1}
                    />
                ))}
              </div>

              {/* Social Links */}
              <ScrollReveal direction="up" delay={0.4}>
                <div className="flex justify-center space-x-6">
                  {socialLinks.map((social, index) => (
                      <SocialLink
                          key={social.label}
                          icon={social.icon}
                          href={social.href}
                          label={social.label}
                          delay={0.1 + index * 0.1}
                      />
                  ))}
                </div>
              </ScrollReveal>
            </motion.div>
          </section>

          {/* Contact Form Section */}
          <section ref={formRef} className="py-20 px-4">
            <div className="max-w-2xl mx-auto">
              <ScrollReveal direction="up">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={formInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                  <h2 className="text-4xl font-bold text-white mb-4">
                                    <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                                        Send Me a Message
                                    </span>
                  </h2>
                  <p className="text-gray-300 leading-relaxed">
                    Have a project in mind? I'd love to hear about it. Drop me a message and let's create something amazing together.
                  </p>
                </motion.div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.2}>
                <GlassCard
                    variant="premium"
                    className="p-8"
                    glow={true}
                >
                  {/* Status Messages */}
                  {submitStatus === 'success' && (
                      <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-xl flex items-center space-x-3"
                      >
                        <CheckCircle size={20} className="text-green-400" />
                        <span className="text-green-300">Message sent successfully! I'll get back to you soon.</span>
                      </motion.div>
                  )}

                  {submitStatus === 'error' && (
                      <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="mb-6 p-4 border border-red-500/30 rounded-xl flex items-center space-x-3"
                      >
                        <MessageCircle size={20} className="text-red-400" />
                        <span className="text-red-300">Failed to send message. Please try again or contact me directly.</span>
                      </motion.div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <FormField
                        name="name"
                        label="Your Name"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        delay={0.1}
                    />

                    <FormField
                        type="email"
                        name="email"
                        label="Email Address"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        delay={0.2}
                    />

                    <FormField
                        type="textarea"
                        name="message"
                        label="Message"
                        placeholder="Tell me about your project, collaboration ideas, or just say hello! I'm always excited to discuss innovative solutions and new opportunities."
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        delay={0.3}
                    />

                    <ScrollReveal direction="up" delay={0.4}>
                      <motion.button
                          type="submit"
                          disabled={isSubmitting}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full flex items-center justify-center space-x-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                            <>
                              <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                              />
                              <span>Sending...</span>
                            </>
                        ) : (
                            <>
                              <Send size={20} />
                              <span>Send Message</span>
                            </>
                        )}
                      </motion.button>
                    </ScrollReveal>
                  </form>

                  {/* Additional Information */}
                  <ScrollReveal direction="up" delay={0.5}>
                    <motion.div
                        className="mt-8 pt-6 border-t border-gray-700/30 text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                      <div className="flex items-center justify-center space-x-6 text-sm text-gray-400">
                        <div className="flex items-center space-x-2">
                          <Clock size={16} className="text-pink-400" />
                          <span>24h response</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Star size={16} className="text-purple-400" />
                          <span>Free consultation</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle size={16} className="text-green-400" />
                          <span>No spam guaranteed</span>
                        </div>
                      </div>
                    </motion.div>
                  </ScrollReveal>
                </GlassCard>
              </ScrollReveal>
            </div>
          </section>
        </motion.div>
      </>
  );
};

export default Contact;